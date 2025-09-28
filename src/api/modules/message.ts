import { apiRequest } from '../http'
import type { Message } from '@/types' // This path will be updated later

export const fetchMessages = (): Promise<Message[]> => {
  return apiRequest<Message[]>('/messages', {
    method: 'GET',
  })
}

export const postMessage = (content: string): Promise<Message> => {
  // The user information (author, userId) should be handled by the backend
  // based on the provided auth token. We only need to send the content.
  return apiRequest<Message>('/messages', {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}

export const deleteMessage = (messageId: number): Promise<void> => {
  return apiRequest<void>(`/messages/${messageId}`, {
    method: 'DELETE',
  })
}