import request from '@/utils/request'
import type { LoginForm, RegisterForm, AuthResponse, User } from '@/types/auth'

export const authAPI = {
  login(data: LoginForm): Promise<AuthResponse> {
    return request.post('/auth/login', data)
  },

  register(data: RegisterForm): Promise<AuthResponse> {
    return request.post('/auth/register', data)
  },

  getUserInfo(): Promise<User> {
    return request.get('/auth/profile')
  },

  refreshToken(): Promise<{ token: string }> {
    return request.post('/auth/refresh')
  }
}