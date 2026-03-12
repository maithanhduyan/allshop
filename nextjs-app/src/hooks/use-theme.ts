'use client'

import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('allshop-theme') as Theme | null
    if (stored) {
      setThemeState(stored)
      applyTheme(stored)
    } else {
      applyTheme('system')
    }
  }, [applyTheme])

  useEffect(() => {
    applyTheme(theme)

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme, applyTheme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem('allshop-theme', t)
  }, [])

  return { theme, setTheme } as const
}
