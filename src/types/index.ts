export interface User {
  id: number;
  username: string;
}

export interface Message {
  id: number;
  content: string;
  author: User;
  time: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}