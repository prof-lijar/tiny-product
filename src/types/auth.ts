export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
