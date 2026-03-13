'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updateUser, logout } from '@/store/auth-slice'
import { API_BASE_URL } from '@/lib/constants'

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { token, user } = useAppSelector((state) => state.auth)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
      return
    }
    // Fetch latest profile
    fetch(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout())
          router.push('/auth/login')
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data) {
          dispatch(updateUser(data))
          setName(data.name || '')
          setPhone(data.phone || '')
        }
      })
      .catch(() => {})
  }, [token, dispatch, router])

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setPhone(user.phone || '')
    }
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      })
      if (res.status === 401) {
        dispatch(logout())
        router.push('/auth/login')
        return
      }
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || 'Cập nhật thất bại')
        return
      }
      dispatch(updateUser(data))
      setEditing(false)
      setMessage('Cập nhật thành công!')
    } catch {
      setMessage('Không thể kết nối đến máy chủ')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  if (!token || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold dark:text-white">Tài khoản của tôi</h1>

      {/* Profile card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-600 text-2xl font-bold text-white">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        {message && (
          <div className={`mt-4 rounded-xl px-4 py-3 text-sm ${message.includes('thành công') ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Họ và tên
            </label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
              />
            ) : (
              <p className="rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {user.name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <p className="rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Số điện thoại
            </label>
            {editing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="0901 234 567"
              />
            ) : (
              <p className="rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {user.phone || 'Chưa cập nhật'}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button
                onClick={() => {
                  setEditing(false)
                  setName(user.name || '')
                  setPhone(user.phone || '')
                  setMessage('')
                }}
                className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              onClick={() => { setEditing(true); setMessage('') }}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/orders"
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
        >
          <span className="text-2xl">📦</span>
          <div>
            <p className="font-semibold dark:text-white">Đơn hàng của tôi</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Xem lịch sử mua hàng</p>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-left transition-colors hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-red-600 dark:hover:bg-red-900/20"
        >
          <span className="text-2xl">🚪</span>
          <div>
            <p className="font-semibold dark:text-white">Đăng xuất</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Thoát khỏi tài khoản</p>
          </div>
        </button>
      </div>
    </div>
  )
}
