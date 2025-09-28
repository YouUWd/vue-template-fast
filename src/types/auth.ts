export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  createdAt: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  token: string
  user: User
}