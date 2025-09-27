import type { User, Message, LoginResponse } from '@/types'
import { useUserStore } from '@/stores/user'

// In a real application, this would be in a .env file
const API_BASE_URL = 'https://your-api-url.com/api' // Replace with your actual API endpoint

/**
 * A helper function for making API requests.
 * It automatically handles JSON parsing, error handling, and adding the auth token.
 * @param endpoint - The API endpoint to call (e.g., '/login').
 * @param options - The options for the fetch call (method, body, etc.).
 */
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

// --- User API ---

export const login = (credentials: Omit<User, 'id'>): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export const register = (credentials: Omit<User, 'id'>): Promise<void> => {
  return apiRequest<void>('/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

// --- Message API ---

export const fetchMessages = (): Promise<Message[]> => {
  return apiRequest<Message[]>('/messages', {
    method: 'GET',
  })
}

export const postMessage = (content: string): Promise<Message> => {
  // The user information (author, userId) should be handled by the backend
  // based on the provided auth token. We only need to send the content.
  return apiRequest<Message>('/messages', {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}

export const deleteMessage = (messageId: number): Promise<void> => {
  return apiRequest<void>(`/messages/${messageId}`, {
    method: 'DELETE',
  })
}