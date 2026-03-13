'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo — just redirect to home
    router.push('/')
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Đăng nhập</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Chào mừng bạn quay lại AllShop
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-700">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
