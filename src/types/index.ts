export interface User {
  id: number
  username: string
  email?: string // Optional email
  avatar?: string // Optional avatar
  createdAt?: string // Optional creation timestamp
}

export interface Message {
  id: number
  content: string
  authorId: number
  authorName: string
  authorAvatar?: string
  createdAt: string
  updatedAt: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  email: string
  password: string
}