import request from '@/utils/request'
import type { LoginForm, RegisterForm, AuthResponse, User } from '@/types/auth'

export const authAPI = {
  // 登录
  login(data: LoginForm): Promise<AuthResponse> {
    return request.post('/auth/login', data)
  },

  // 注册
  register(data: RegisterForm): Promise<AuthResponse> {
    return request.post('/auth/register', data)
  },

  // 获取用户信息
  getUserInfo(): Promise<User> {
    return request.get('/auth/profile')
  },

  // 刷新token
  refreshToken(): Promise<{ token: string }> {
    return request.post('/auth/refresh')
  },
}
