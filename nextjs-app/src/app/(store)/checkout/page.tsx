'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { clearCart } from '@/store/cart-slice'
import { logout } from '@/store/auth-slice'
import { formatPrice } from '@/lib/format-price'
import { API_BASE_URL } from '@/lib/constants'

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items)
  const { token, user } = useAppSelector((state) => state.auth)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span className="text-6xl">📦</span>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Không có sản phẩm để thanh toán
        </h2>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Quay về trang chủ
        </Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span className="text-6xl">🎉</span>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Đặt hàng thành công!
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Cảm ơn bạn đã mua sắm tại AllShop. Đơn hàng sẽ được xử lý trong thời gian sớm nhất.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/orders"
            className="rounded-xl border border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/20"
          >
            Xem đơn hàng
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!token) {
      router.push('/auth/login')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone, address, note }),
      })
      if (res.status === 401) {
        dispatch(logout())
        router.push('/auth/login')
        return
      }
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Đặt hàng thất bại')
        return
      }
      dispatch(clearCart())
      setSubmitted(true)
    } catch {
      setError('Không thể kết nối đến máy chủ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold dark:text-white">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!token && (
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Bạn cần{' '}
              <Link href="/auth/login" className="font-semibold underline">đăng nhập</Link>
              {' '}để đặt hàng.
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold dark:text-white">Thông tin giao hàng</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Họ và tên
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Số điện thoại
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="0901 234 567"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Địa chỉ giao hàng
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ghi chú
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="Ghi chú cho đơn hàng (tùy chọn)"
              />
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold dark:text-white">Đơn hàng ({items.length} sản phẩm)</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="flex justify-between text-lg font-bold dark:text-white">
              <span>Tổng cộng</span>
              <span className="text-red-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Đang xử lý...' : 'Đặt hàng'}
        </button>
      </form>
    </div>
  )
}
