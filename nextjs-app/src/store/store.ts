import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth-slice'
import { cartReducer } from './cart-slice'

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
