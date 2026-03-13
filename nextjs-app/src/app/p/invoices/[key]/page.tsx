'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { formatPrice } from '@/lib/format-price'
import { API_BASE_URL } from '@/lib/constants'
import type { Invoice } from '@/types'

export default function PublicInvoicePage() {
  const params = useParams()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!params.key) return
    fetch(`${API_BASE_URL}/api/p/invoices/${params.key}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => setInvoice(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [params.key])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
        <span className="text-6xl">🔍</span>
        <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Không tìm thấy hóa đơn
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Hóa đơn không tồn tại hoặc chưa được phát hành.
        </p>
      </div>
    )
  }

  const handleDownloadPDF = () => {
    window.open(`${API_BASE_URL}/api/p/invoices/${params.key}/pdf`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            Hóa đơn điện tử
          </h1>
          <button
            onClick={handleDownloadPDF}
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            📥 Tải PDF
          </button>
        </div>

        {/* Invoice card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold dark:text-white">{invoice.invoiceNumber}</h2>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    ✅ Đã phát hành
                  </span>
                </div>
                {invoice.issuedAt && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Ngày phát hành:{' '}
                    {new Date(invoice.issuedAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seller & Buyer */}
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

          {/* Items */}
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
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(invoice.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          Hóa đơn điện tử được tạo bởi AllShop
        </p>
      </div>
    </div>
  )
}
