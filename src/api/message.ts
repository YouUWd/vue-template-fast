import request from '@/utils/request'
import type { Message, CreateMessageForm, MessageResponse } from '@/types/message'

export const messageAPI = {
  // Get message list
  getMessages(page = 1, limit = 10): Promise<MessageResponse> {
    // The original implementation returned Promise<Message[]>, the docs say Promise<MessageResponse>
    // We follow the docs.
    return request.get('/messages', { params: { page, limit } })
  },

  // Create a message
  createMessage(data: CreateMessageForm): Promise<Message> {
    return request.post('/messages', data)
  },

  // Delete a message
  deleteMessage(id: number): Promise<void> {
    return request.delete(`/messages/${id}`)
  }
}