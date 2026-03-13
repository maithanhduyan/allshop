'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

export default function InvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchInvoice = useCallback(() => {
    if (!token || !params.id) return
    fetch(`${API_BASE_URL}/api/invoices/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          dispatch(logout())
          router.push('/auth/login')
          return null
        }
        if (!res.ok) return null
        return res.json()
      })
      .then((data) => {
        if (data) setInvoice(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token, params.id, dispatch, router])

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
      return
    }
    fetchInvoice()
  }, [token, router, fetchInvoice])

  const handleIssue = async () => {
    if (!token || !invoice || actionLoading) return
    setActionLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/invoices/${invoice.id}/issue`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const updated = await res.json()
        setInvoice({ ...invoice, ...updated })
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!token || !invoice || actionLoading) return
    if (!confirm('Bạn có chắc chắn muốn hủy hóa đơn này?')) return
    setActionLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/invoices/${invoice.id}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const updated = await res.json()
        setInvoice({ ...invoice, ...updated })
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!token || !invoice) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/invoices/${invoice.id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoice.invoiceNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      // ignore
    }
  }

  const handleCopyLink = () => {
    if (!invoice?.publicKey) return
    const url = `${window.location.origin}/p/invoices/${invoice.publicKey}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!token) return null

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
          <span className="text-6xl">🔍</span>
          <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Không tìm thấy hóa đơn
          </h2>
          <Link
            href="/invoices"
            className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Về danh sách hóa đơn
          </Link>
        </div>
      </div>
    )
  }

  const status = STATUS_MAP[invoice.status] || {
    label: invoice.status,
    color: 'bg-gray-100 text-gray-700',
    icon: '📄',
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/invoices"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          ← Danh sách hóa đơn
        </Link>
        <div className="flex flex-wrap gap-2">
          {/* PDF download – available for issued invoices */}
          {invoice.status === 'issued' && (
            <>
              <button
                onClick={handleDownloadPDF}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                📥 Tải PDF
              </button>
              <button
                onClick={handleCopyLink}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {copied ? '✓ Đã sao chép!' : '🔗 Sao chép link'}
              </button>
            </>
          )}
          {invoice.status === 'draft' && (
            <>
              <button
                onClick={handleIssue}
                disabled={actionLoading}
                className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              >
                {actionLoading ? 'Đang xử lý...' : '✓ Phát hành'}
              </button>
              <button
                onClick={handleCancel}
                disabled={actionLoading}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                Hủy hóa đơn
              </button>
            </>
          )}
          {invoice.status === 'issued' && (
            <button
              onClick={handleCancel}
              disabled={actionLoading}
              className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Hủy hóa đơn
            </button>
          )}
        </div>
      </div>

      {/* Invoice card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        {/* Invoice header */}
        <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold dark:text-white">{invoice.invoiceNumber}</h1>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                  {status.icon} {status.label}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ngày tạo:{' '}
                {new Date(invoice.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              {invoice.issuedAt && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Phát hành:{' '}
                  {new Date(invoice.issuedAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
              {invoice.cancelledAt && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Đã hủy:{' '}
                  {new Date(invoice.cancelledAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
            <Link
              href={`/orders`}
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              Đơn hàng #{invoice.orderId}
            </Link>
          </div>
        </div>

        {/* Seller & Buyer info */}
        <div className="grid gap-4 border-b border-gray-100 px-6 py-5 sm:grid-cols-2 dark:border-gray-800">
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Người bán
            </p>
            <p className="text-sm font-semibold dark:text-white">{invoice.sellerName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">MST: {invoice.sellerTaxCode}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.sellerAddress}</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Người mua
            </p>
            <p className="text-sm font-semibold dark:text-white">{invoice.buyerName}</p>
            {invoice.buyerTaxCode && (
              <p className="text-sm text-gray-600 dark:text-gray-400">MST: {invoice.buyerTaxCode}</p>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.buyerAddress}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.buyerEmail}</p>
          </div>
        </div>

        {/* Items table */}
        <div className="px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Chi tiết hàng hóa
          </p>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left dark:border-gray-800">
                  <th className="pb-2 pr-3 font-semibold text-gray-500 dark:text-gray-400">#</th>
                  <th className="pb-2 pr-3 font-semibold text-gray-500 dark:text-gray-400">
                    Tên hàng hóa
                  </th>
                  <th className="pb-2 pr-3 font-semibold text-gray-500 dark:text-gray-400">ĐVT</th>
                  <th className="pb-2 pr-3 text-right font-semibold text-gray-500 dark:text-gray-400">
                    SL
                  </th>
                  <th className="pb-2 pr-3 text-right font-semibold text-gray-500 dark:text-gray-400">
                    Đơn giá
                  </th>
                  <th className="pb-2 pr-3 text-right font-semibold text-gray-500 dark:text-gray-400">
                    Thuế
                  </th>
                  <th className="pb-2 text-right font-semibold text-gray-500 dark:text-gray-400">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 dark:border-gray-800/50"
                  >
                    <td className="py-3 pr-3 text-gray-500">{idx + 1}</td>
                    <td className="py-3 pr-3 font-medium dark:text-white">{item.productName}</td>
                    <td className="py-3 pr-3 text-gray-500">{item.unit}</td>
                    <td className="py-3 pr-3 text-right dark:text-gray-300">{item.quantity}</td>
                    <td className="py-3 pr-3 text-right dark:text-gray-300">
                      {formatPrice(item.unitPrice)}
                    </td>
                    <td className="py-3 pr-3 text-right text-gray-500">
                      {formatPrice(item.taxAmount)}
                    </td>
                    <td className="py-3 text-right font-medium dark:text-white">
                      {formatPrice(item.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 sm:hidden">
            {invoice.items?.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <p className="text-sm font-medium dark:text-white">
                  {idx + 1}. {item.productName}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>ĐVT: {item.unit}</span>
                  <span className="text-right">SL: {item.quantity}</span>
                  <span>Đơn giá: {formatPrice(item.unitPrice)}</span>
                  <span className="text-right">Thuế: {formatPrice(item.taxAmount)}</span>
                </div>
                <p className="mt-1 text-right text-sm font-semibold dark:text-white">
                  {formatPrice(item.totalAmount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-gray-100 px-6 py-5 dark:border-gray-800">
          <div className="ml-auto max-w-xs space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Cộng tiền hàng</span>
              <span className="font-medium dark:text-white">{formatPrice(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Thuế GTGT ({(invoice.taxRate * 100).toFixed(0)}%)
              </span>
              <span className="font-medium dark:text-white">{formatPrice(invoice.taxAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
              <span className="text-base font-bold dark:text-white">Tổng thanh toán</span>
              <span className="text-lg font-bold text-red-600">{formatPrice(invoice.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
