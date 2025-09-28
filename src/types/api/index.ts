import type { User } from '../index'

/**
 * The unified API response structure from the backend.
 * @template T - The type of the data in the 'body' property.
 */
export interface ApiResponse<T> {
  code: number
  msg: string
  body: T
}

export interface LoginResponse {
  token: string
  user: Omit<User, 'password'>
}