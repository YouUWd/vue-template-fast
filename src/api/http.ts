import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'
import type { ApiResponse } from '@/types/api'

// In a real application, this would be in a .env file
const API_BASE_URL = 'https://your-api-url.com/api' // Replace with your actual API endpoint

// Create an axios instance with a base configuration
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Request timeout
})

// Request interceptor
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

// Response interceptor
service.interceptors.response.use(
  // The success handler: check for business error code, otherwise pass the response through.
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    const res = response.data
    if (res.code !== 200) {
      console.error('API Error:', res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return response // Pass the original response if successful
  },
  // The error handler for network errors etc.
  (error) => {
    console.error('Network Error:', error)
    return Promise.reject(error)
  },
)

/**
 * A generic request function that uses the configured axios instance.
 * It calls the service and then unwraps the response to return only the business data.
 * @template T - The type of the business data (`body`) we expect.
 * @param {AxiosRequestConfig} config - The axios request config.
 * @returns {Promise<T>} A promise that resolves to the business data (`body`).
 */
const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  // The type for the service response will be AxiosResponse<ApiResponse<T>>
  // We need to cast the response to the correct type after the interceptor.
  return service(config).then((response: AxiosResponse<ApiResponse<T>>) => {
    // After the interceptor passes, we are sure the response is successful.
    // We can now safely extract and return the `body`.
    return response.data.body
  })
}

export default request