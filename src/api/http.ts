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
  (response: AxiosResponse<ApiResponse<any>>) => {
    const res = response.data
    if (res.code !== 200) {
      // Handle business errors
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    // If successful, we replace the original response.data with the actual business data (res.body)
    // This way, the caller of the request function will receive the unwrapped data.
    response.data = res.body
    return response
  },
  (error) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  },
)

/**
 * A generic request function that uses the configured axios instance.
 * It automatically extracts the `data` from the axios response.
 * @template T - The type of the business data we expect.
 * @param {AxiosRequestConfig} config - The axios request config.
 * @returns {Promise<T>} A promise that resolves to the business data.
 */
const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return service(config).then((response: AxiosResponse<T>) => response.data)
}

export default request