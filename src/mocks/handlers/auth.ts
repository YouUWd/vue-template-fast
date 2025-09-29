import { http, HttpResponse } from 'msw'
import type { LoginForm, RegisterForm } from '@/types/auth'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const secret = 'your-secret-key'
const users: Record<string, string> = {}

export const authHandlers = [
  // 登录
  http.post<never, LoginForm>(`${VITE_API_BASE_URL}/auth/login`, async ({ request }) => {
    const { username, password } = await request.json()
    if (users[username] === password) {
      return HttpResponse.json({
        token: `${secret}&${username}`,
        user: { id: 1, username, email: `${username}@example.com` },
      })
    } else {
      return new HttpResponse(null, { status: 401 })
    }
  }),

  // 注册
  http.post<never, RegisterForm>(`${VITE_API_BASE_URL}/auth/register`, async ({ request }) => {
    const { username, password } = await request.json()
    if (users[username]) {
      return new HttpResponse(null, { status: 409 })
    } else {
      users[username] = password
      return HttpResponse.json({
        token: `${secret}&${username}`,
        user: { id: 1, username, email: `${username}@example.com` },
      })
    }
  }),

  // 获取用户信息
  http.get(`${VITE_API_BASE_URL}/auth/profile`, ({ request }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (token) {
      const [key, username] = token.split('&')
      if (key === secret && username && users[username]) {
        return HttpResponse.json({
          id: 1,
          username,
          email: `${username}@example.com`,
        })
      }
    }
    return new HttpResponse(null, { status: 401 })
  }),

  // 刷新token
  http.post(`${VITE_API_BASE_URL}/auth/refresh`, ({ request }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (token) {
      const [key, username] = token.split('&')
      if (key === secret && username && users[username]) {
        return HttpResponse.json({ token: `${secret}&${username}` })
      }
    }
    return new HttpResponse(null, { status: 401 })
  }),
]
