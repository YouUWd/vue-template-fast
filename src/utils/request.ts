import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

// Use the VITE_API_BASE_URL from environment variables, with a fallback
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
})

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // Pinia stores are available after installation in main.ts
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // As per the documentation, we return the response data directly.
    return response.data
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
    }
    return Promise.reject(error)
  }
)

export default request