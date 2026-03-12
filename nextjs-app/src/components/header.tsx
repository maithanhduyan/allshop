'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'
import { CATEGORIES } from '@/lib/constants'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const items = useAppSelector((state) => state.cart.items)
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-gray-200/60 shadow-lg shadow-black/5 dark:border-gray-800/60'
          : 'bg-white dark:bg-gray-950'
      }`}
    >
      {/* Promo bar */}
      <div className="overflow-hidden bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 px-4 py-1.5 text-center text-xs font-medium text-white">
        <p className="animate-fade-in">
          🚀 Miễn phí vận chuyển cho đơn hàng từ 500.000₫ &nbsp;|&nbsp; 🎁 Giảm thêm 10% cho thành viên mới
        </p>
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 md:gap-6 md:py-3">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 text-sm font-extrabold text-white transition-transform group-hover:scale-105">
            A
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">All</span>
            <span className="text-xl font-extrabold text-gray-800 dark:text-white">Shop</span>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="flex w-full rounded-xl border border-gray-200 bg-gray-50 transition-colors focus-within:border-primary-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-200 dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:border-primary-500 dark:focus-within:bg-gray-800 dark:focus-within:ring-primary-800">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 md:px-4"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center rounded-r-xl bg-primary-600 px-3 text-white transition-colors hover:bg-primary-700 md:px-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1 md:gap-2">
          <ThemeToggle />

          <Link
            href="/auth/login"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 md:flex"
            aria-label="Đăng nhập"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Giỏ hàng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-950">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            aria-label="Menu"
          >
            <div className="flex w-5 flex-col gap-1">
              <span className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Desktop categories */}
      <nav className="hidden border-t border-gray-100 dark:border-gray-800 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:bg-primary-50 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          role="presentation"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <span className="text-lg font-bold text-gray-800 dark:text-white">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Danh mục
          </p>
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}

          <div className="my-3 h-px bg-gray-100 dark:bg-gray-800" />

          <Link
            href="/auth/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
            onClick={() => setMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Đăng nhập
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30"
            onClick={() => setMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  )
}
