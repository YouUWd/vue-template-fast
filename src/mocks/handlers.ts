import { http, HttpResponse } from 'msw'
import type { LoginForm, RegisterForm } from '@/types/auth'
import type { CreateMessageForm } from '@/types/message'

const VITE_API_BASE_URL = 'http://localhost:3000/api'
const secret = 'your-secret-key'
const users: Record<string, string> = {}

export const handlers = [
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

  // 获取留言列表
  http.get(`${VITE_API_BASE_URL}/messages`, () => {
    return HttpResponse.json({
      data: [
        { id: 1, content: 'Hello, world!', author: 'user1', createdAt: new Date() },
        { id: 2, content: 'This is a test message.', author: 'user2', createdAt: new Date() },
      ],
      total: 2,
    })
  }),

  // 创建留言
  http.post<never, CreateMessageForm>(`${VITE_API_BASE_URL}/messages`, async ({ request }) => {
    const { content } = await request.json()
    return HttpResponse.json({
      id: Math.random(),
      content,
      author: 'current_user',
      createdAt: new Date(),
    })
  }),

  // 删除留言
  http.delete(`${VITE_API_BASE_URL}/messages/:id`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
]