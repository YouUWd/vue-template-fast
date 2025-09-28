import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'
import { useUserStore } from '@/store/modules/user'
import type { ApiResponse } from '@/types/api'
import pinia from '@/store' // Import pinia instance

// Use the VITE_API_BASE_URL from environment variables, with a fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // It's important to get a fresh instance of the store inside the interceptor
    const userStore = useUserStore(pinia)
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    const res = response.data
    // Assuming a successful response always has a 'body'
    if (res && typeof res === 'object' && 'body' in res) {
      return res.body // Directly return the 'body' for successful responses
    }
    return response.data // Fallback for responses that don't match the structure
  },
  (error: AxiosError) => {
    const userStore = useUserStore(pinia)
    if (error.response?.status === 401) {
      // Handle 401 Unauthorized: logout the user
      userStore.logout()
      // Optionally, redirect to login page. This is often handled by the router guard.
    }
    // Return a rejected promise with a user-friendly error message
    const apiResponse = error.response?.data as ApiResponse<null>
    const message = apiResponse?.msg || error.message || 'An unknown error occurred'
    return Promise.reject(new Error(message))
  }
)

// The generic request function is now simplified, as interceptors handle the heavy lifting.
const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return service(config) as Promise<T>
}

export default request