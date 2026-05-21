export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
  error?: string;
}
