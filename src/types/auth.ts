export interface User {
  id: number
  username: string
  avatar?: string
  createdAt: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
