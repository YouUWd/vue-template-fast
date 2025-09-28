export interface Message {
  id: number
  content: string
  authorId: number
  authorName: string
  authorAvatar?: string
  createdAt: string
  updatedAt: string
}

export interface CreateMessageForm {
  content: string
}

export interface MessageResponse {
  messages: Message[]
  total: number
  page: number
  limit: number
}