import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from './types'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart_items') || '[]') as CartItem[],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      )
      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + action.payload.quantity,
          existing.stock
        )
      } else {
        state.items.push(action.payload)
      }
      localStorage.setItem('cart_items', JSON.stringify(state.items))
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      )
      localStorage.setItem('cart_items', JSON.stringify(state.items))
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      )
      if (item) {
        item.quantity = Math.max(1, Math.min(action.payload.quantity, item.stock))
      }
      localStorage.setItem('cart_items', JSON.stringify(state.items))
    },
    clearCart(state) {
      state.items = []
      localStorage.removeItem('cart_items')
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
