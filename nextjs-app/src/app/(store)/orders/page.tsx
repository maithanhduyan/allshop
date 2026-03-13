'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/auth-slice'
import { formatPrice } from '@/lib/format-price'
import { API_BASE_URL } from '@/lib/constants'

interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

interface Order {
  id: string
  total: number
  status: string
  name: string
  phone: string
  address: string
  note?: string
  items: OrderItem[]
  createdAt: string
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  shipped: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
}

export default function OrdersPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [invoiceMsg, setInvoiceMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
      return
    }
    fetch(`${API_BASE_URL}/api/orders`, {
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
        if (data) setOrders(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token, dispatch, router])

  if (!token) return null

  const handleCreateInvoice = async (orderId: string) => {
    setInvoiceMsg(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/invoice`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taxRate: 0.08 }),
      })
      if (res.ok) {
        const invoice = await res.json()
        setInvoiceMsg({ type: 'success', text: `Đã tạo hóa đơn ${invoice.invoiceNumber}` })
        setTimeout(() => router.push(`/invoices/${invoice.id}`), 1500)
      } else {
        const err = await res.json()
        setInvoiceMsg({ type: 'error', text: err.error || 'Không thể tạo hóa đơn' })
      }
    } catch {
      setInvoiceMsg({ type: 'error', text: 'Lỗi kết nối' })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Đơn hàng của tôi</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/invoices"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            🧾 Hóa đơn
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            ← Tài khoản
          </Link>
        </div>
      </div>

      {/* Invoice notification */}
      {invoiceMsg && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${
            invoiceMsg.type === 'success'
              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}
        >
          {invoiceMsg.text}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
          <span className="text-6xl">📭</span>
          <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Chưa có đơn hàng nào
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Hãy mua sắm và tạo đơn hàng đầu tiên!
          </p>
          <Link
            href="/"
            className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' }
            const expanded = expandedId === order.id
            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
              >
                {/* Order header */}
                <button
                  onClick={() => setExpandedId(expanded ? null : order.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold dark:text-white">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-red-600">{formatPrice(order.total)}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Order detail */}
                {expanded && (
                  <div className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                    {/* Items */}
                    <div className="space-y-3">
                      {order.items?.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium dark:text-white">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatPrice(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-semibold dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping info */}
                    <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Thông tin giao hàng
                      </p>
                      <p className="text-sm dark:text-gray-200">{order.name} — {order.phone}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.address}</p>
                      {order.note && (
                        <p className="mt-1 text-sm italic text-gray-500 dark:text-gray-400">
                          Ghi chú: {order.note}
                        </p>
                      )}
                    </div>

                    {/* Invoice action */}
                    {(order.status === 'confirmed' || order.status === 'shipping' || order.status === 'delivered') && (
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCreateInvoice(order.id)
                          }}
                          className="rounded-xl border border-primary-300 px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-700 dark:text-primary-400 dark:hover:bg-primary-900/20"
                        >
                          🧾 Tạo hóa đơn
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
