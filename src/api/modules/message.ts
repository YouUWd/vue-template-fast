import request from '../http'
import type { Message } from '@/types'

export const fetchMessages = (): Promise<Message[]> => {
  return request<Message[]>({
    url: '/messages',
    method: 'get',
  })
}

export const postMessage = (content: string): Promise<Message> => {
  return request<Message>({
    url: '/messages',
    method: 'post',
    data: { content },
  })
}

export const deleteMessage = (messageId: number): Promise<void> => {
  return request<void>({
    url: `/messages/${messageId}`,
    method: 'delete',
  })
}