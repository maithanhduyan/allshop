import { useEffect, useCallback } from 'react'
import { useLocalStorage } from './use-local-storage'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('allshop-theme', 'system')

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme, applyTheme])

  return { theme, setTheme } as const
}
