import { apiRequest } from '../http'
import type { User } from '@/types'
import type { LoginResponse } from '@/types/api'

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