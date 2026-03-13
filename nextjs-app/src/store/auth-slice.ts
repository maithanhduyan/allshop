'use client'

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
}

function loadState(): AuthState {
  if (typeof window === 'undefined') return { token: null, user: null }
  try {
    const token = localStorage.getItem('allshop-token')
    const user = localStorage.getItem('allshop-user')
    return { token, user: user ? JSON.parse(user) : null }
  } catch {
    return { token: null, user: null }
  }
}

const initialState: AuthState = { token: null, user: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth(state) {
      const saved = loadState()
      state.token = saved.token
      state.user = saved.user
    },
    setCredentials(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('allshop-token', action.payload.token)
      localStorage.setItem('allshop-user', JSON.stringify(action.payload.user))
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      localStorage.setItem('allshop-user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('allshop-token')
      localStorage.removeItem('allshop-user')
    },
  },
})

export const { initAuth, setCredentials, updateUser, logout } = authSlice.actions
export const authReducer = authSlice.reducer
