import type { User } from '../index'

export interface LoginResponse {
  token: string
  user: Omit<User, 'password'>
}