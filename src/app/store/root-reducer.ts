import { combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from '@/entities/cart/model/cart.slice'
import { filterReducer } from '@/features/product-filter/model/slice'

export const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
})
