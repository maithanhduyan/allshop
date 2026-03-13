'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/auth-slice'
import { formatPrice } from '@/lib/format-price'
import { API_BASE_URL } from '@/lib/constants'
import type { Invoice } from '@/types'

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
  draft: {
    label: 'Nháp',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    icon: '📝',
  },
  issued: {
    label: 'Đã phát hành',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: '✅',
  },
  cancelled: {
    label: 'Đã hủy',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: '❌',
  },
}

export default function InvoicesPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
      return
    }
    fetch(`${API_BASE_URL}/api/invoices`, {
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
        if (data) setInvoices(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token, dispatch, router])

  if (!token) return null

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  const filtered = filter === 'all' ? invoices : invoices.filter((inv) => inv.status === filter)

  const statusTabs = [
    { key: 'all', label: 'Tất cả', count: invoices.length },
    { key: 'draft', label: 'Nháp', count: invoices.filter((i) => i.status === 'draft').length },
    { key: 'issued', label: 'Đã phát hành', count: invoices.filter((i) => i.status === 'issued').length },
    { key: 'cancelled', label: 'Đã hủy', count: invoices.filter((i) => i.status === 'cancelled').length },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Hóa đơn của tôi</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý hóa đơn điện tử
          </p>
        </div>
        <Link
          href="/orders"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          ← Đơn hàng
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs dark:bg-gray-700">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
          <span className="text-6xl">🧾</span>
          <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Chưa có hóa đơn nào
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Hóa đơn sẽ được tạo khi đơn hàng của bạn được xử lý
          </p>
          <Link
            href="/orders"
            className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Xem đơn hàng
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-900">
          <span className="text-5xl">📭</span>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Không có hóa đơn nào ở trạng thái này
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((invoice) => {
            const status = STATUS_MAP[invoice.status] || {
              label: invoice.status,
              color: 'bg-gray-100 text-gray-700',
              icon: '📄',
            }
            return (
              <Link
                key={invoice.id}
                href={`/invoices/${invoice.id}`}
                className="block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-700"
              >
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg">{status.icon}</span>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {invoice.invoiceNumber}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>Đơn hàng #{invoice.orderId}</span>
                      <span>
                        {new Date(invoice.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <span>{invoice.buyerName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">{formatPrice(invoice.totalAmount)}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        VAT {(invoice.taxRate * 100).toFixed(0)}%: {formatPrice(invoice.taxAmount)}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
