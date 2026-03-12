import { api } from '@/shared/api/axios'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../model/types'

export const userApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', data)
    return res.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', data)
    return res.data
  },

  getProfile: async (): Promise<User> => {
    const res = await api.get('/auth/me')
    return res.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
    localStorage.removeItem('access_token')
  },
}
