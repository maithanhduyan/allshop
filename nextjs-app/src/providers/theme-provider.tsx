'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useTheme } from '@/hooks/use-theme'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
