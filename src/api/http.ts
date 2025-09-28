import { useUserStore } from '@/store/modules/user'

// In a real application, this would be in a .env file
const API_BASE_URL = 'https://your-api-url.com/api' // Replace with your actual API endpoint

/**
 * A helper function for making API requests.
 * It automatically handles JSON parsing, error handling, and adding the auth token.
 * @param endpoint - The API endpoint to call (e.g., '/login').
 * @param options - The options for the fetch call (method, body, etc.).
 */
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // The store is imported dynamically within the function to avoid circular dependencies
  // at the module level, since API modules will be used by stores.
  const userStore = useUserStore()
  const token = userStore.token

  // Set default headers
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options.headers,
  })

  // Add authorization token if it exists
  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    // Try to parse error message from the response body
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  // If the response has no content, return an empty object or handle as needed
  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}