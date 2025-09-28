export interface User {
  id: number
  username: string
  password?: string // Password should be optional as it's not always sent
}

export interface Message {
  id: number
  content: string
  author: string
  time: string
  userId: number
}