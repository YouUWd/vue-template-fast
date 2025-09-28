export interface ApiResponse<T> {
  code: number
  msg: string
  body: T
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    username: string
  }
}