import type { User, Message } from '@/types'

// Mock user data
export const users: User[] = [
  { id: 1, username: 'admin', password: 'password123' },
  { id: 2, username: 'jules', password: 'password456' },
]

// Mock message data
export const messages: Message[] = [
  {
    id: 1,
    content: 'Hello, this is the first message!',
    author: 'admin',
    time: new Date().toISOString(),
    userId: 1,
  },
  {
    id: 2,
    content: 'Welcome to the message board!',
    author: 'jules',
    time: new Date().toISOString(),
    userId: 2,
  },
]
