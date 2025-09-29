import { http, HttpResponse } from 'msw'
import type { CreateMessageForm } from '@/types/message'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const messageHandlers = [
  // 获取留言列表
  http.get(`${VITE_API_BASE_URL}/messages`, () => {
    return HttpResponse.json({
      messages: [
        { id: 1, content: 'Hello, world!', author: 'user1', createdAt: new Date() },
        { id: 2, content: 'This is a test message.', author: 'user2', createdAt: new Date() },
      ],
      page: 1,
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
