export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  address?: UserAddress
}

export interface UserAddress {
  street: string
  ward: string
  district: string
  city: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}
