import { http, HttpResponse } from 'msw'
import type { LoginForm, RegisterForm } from '@/types/auth'
import type { CreateMessageForm } from '@/types/message'

const secret = 'your-secret-key'
const users: Record<string, string> = {}

export const handlers = [
  // 登录
  http.post<never, LoginForm>('/auth/login', async ({ request }) => {
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
  http.post<never, RegisterForm>('/auth/register', async ({ request }) => {
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
  http.get('/auth/profile', ({ request }) => {
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
  http.post('/auth/refresh', ({ request }) => {
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
  http.get('/messages', () => {
    return HttpResponse.json({
      data: [
        { id: 1, content: 'Hello, world!', author: 'user1', createdAt: new Date() },
        { id: 2, content: 'This is a test message.', author: 'user2', createdAt: new Date() },
      ],
      total: 2,
    })
  }),

  // 创建留言
  http.post<never, CreateMessageForm>('/messages', async ({ request }) => {
    const { content } = await request.json()
    return HttpResponse.json({
      id: Math.random(),
      content,
      author: 'current_user',
      createdAt: new Date(),
    })
  }),

  // 删除留言
  http.delete('/messages/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),
]