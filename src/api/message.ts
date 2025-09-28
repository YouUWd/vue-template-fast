import request from '@/utils/request'
import type { Message, CreateMessageForm, MessageResponse } from '@/types/message'

export const messageAPI = {
  // 获取留言列表
  getMessages(page = 1, limit = 10): Promise<MessageResponse> {
    return request.get('/messages', { params: { page, limit } })
  },

  // 创建留言
  createMessage(data: CreateMessageForm): Promise<Message> {
    return request.post('/messages', data)
  },

  // 删除留言
  deleteMessage(id: number): Promise<void> {
    return request.delete(`/messages/${id}`)
  },
}
