import type { User, Message, LoginResponse } from '@/types'
import { users, messages } from '@/api/mock'

const SIMULATED_DELAY = 500 // ms

// --- User API ---

export const login = (credentials: Omit<User, 'id'>): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.username === credentials.username && u.password === credentials.password,
      )
      if (user) {
        const { password, ...userWithoutPassword } = user
        resolve({
          token: `fake-token-for-${user.username}`,
          user: userWithoutPassword,
        })
      } else {
        reject(new Error('Invalid username or password.'))
      }
    }, SIMULATED_DELAY)
  })
}

export const register = (credentials: Omit<User, 'id'>): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some((u) => u.username === credentials.username)) {
        reject(new Error('Username already exists.'))
      } else {
        const newUser: User = {
          id: users.length + 1,
          username: credentials.username,
          password: credentials.password,
        }
        users.push(newUser)
        resolve()
      }
    }, SIMULATED_DELAY)
  })
}

// --- Message API ---

export const fetchMessages = (): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a copy to prevent direct mutation of the mock data
      resolve([...messages].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()))
    }, SIMULATED_DELAY)
  })
}

export const postMessage = (content: string, author: string, userId: number): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: messages.length + 1,
        content,
        author,
        userId,
        time: new Date().toISOString(),
      }
      messages.push(newMessage)
      resolve(newMessage)
    }, SIMULATED_DELAY)
  })
}

export const deleteMessage = (messageId: number, userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const messageIndex = messages.findIndex((m) => m.id === messageId)
      if (messageIndex === -1) {
        return reject(new Error('Message not found.'))
      }
      if (messages[messageIndex].userId !== userId) {
        return reject(new Error('You are not authorized to delete this message.'))
      }
      messages.splice(messageIndex, 1)
      resolve()
    }, SIMULATED_DELAY)
  })
}
