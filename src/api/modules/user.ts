import request from '../http'
import type { User } from '@/types'
import type { LoginResponse } from '@/types/api'

export const login = (credentials: Omit<User, 'id'>): Promise<LoginResponse> => {
  return request<LoginResponse>({
    url: '/login',
    method: 'post',
    data: credentials,
  })
}

export const register = (credentials: Omit<User, 'id'>): Promise<void> => {
  return request<void>({
    url: '/register',
    method: 'post',
    data: credentials,
  })
}