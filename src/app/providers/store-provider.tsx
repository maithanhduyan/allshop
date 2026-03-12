import { Provider } from 'react-redux'
import { store } from '@/app/store/store'
import type { ReactNode } from 'react'

export function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
