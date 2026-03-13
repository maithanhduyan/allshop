'use client'

import { useState, useMemo } from 'react'
import { formatPrice } from '@/lib/format-price'

interface InvoiceItem {
  id: string
  productName: string
  unit: string
  quantity: number
  unitPrice: number
  taxAmount: number
  totalAmount: number
}

interface Invoice {
  id: string
  invoiceNumber: string
  orderId: string
  userId: string
  sellerName: string
  sellerTaxCode: string
  sellerAddress: string
  buyerName: string
  buyerTaxCode?: string
  buyerAddress: string
  buyerEmail: string
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  status: string
  items: InvoiceItem[]
  issuedAt?: string
  cancelledAt?: string
  createdAt: string
}

interface Props {
  invoices: Invoice[]
}

const STATUS_MAP: Record<string, { label: string; color: string; dotColor: string }> = {
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', dotColor: 'bg-gray-400' },
  issued: { label: 'Đã phát hành', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', dotColor: 'bg-green-400' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', dotColor: 'bg-red-400' },
}

const STATUSES = ['all', 'draft', 'issued', 'cancelled'] as const

export function InvoicesClient({ invoices }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
      const matchesSearch =
        !search ||
        inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        inv.buyerName.toLowerCase().includes(search.toLowerCase()) ||
        inv.buyerEmail.toLowerCase().includes(search.toLowerCase()) ||
        inv.orderId.includes(search)
      return matchesStatus && matchesSearch
    })
  }, [invoices, statusFilter, search])

  const statusTabs = STATUSES.map((s) => ({
    key: s,
    label: s === 'all' ? 'Tất cả' : STATUS_MAP[s]?.label || s,
    count: s === 'all' ? invoices.length : invoices.filter((i) => i.status === s).length,
  }))

  const totalRevenue = invoices
    .filter((i) => i.status === 'issued')
    .reduce((sum, i) => sum + i.totalAmount, 0)
  const totalTax = invoices
    .filter((i) => i.status === 'issued')
    .reduce((sum, i) => sum + i.taxAmount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hóa đơn</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Quản lý {invoices.length} hóa đơn điện tử
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng doanh thu (đã phát hành)</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng thuế VAT</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(totalTax)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Hóa đơn đã phát hành</p>
          <p className="mt-1 text-2xl font-bold text-green-600">
            {invoices.filter((i) => i.status === 'issued').length}/{invoices.length}
          </p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              statusFilter === tab.key
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

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          placeholder="Tìm theo số HĐ, khách hàng, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-900/30"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Số hóa đơn</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Khách hàng</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Đơn hàng</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Tiền hàng</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Thuế</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Tổng cộng</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Trạng thái</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Ngày tạo</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-400">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                    Không tìm thấy hóa đơn nào
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => {
                  const status = STATUS_MAP[inv.status] || { label: inv.status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }
                  return (
                    <tr
                      key={inv.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-800/50 dark:hover:bg-gray-800/30"
                    >
                      <td className="px-4 py-3">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{inv.invoiceNumber}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium dark:text-white">{inv.buyerName}</p>
                        <p className="text-xs text-gray-500">{inv.buyerEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">#{inv.orderId}</td>
                      <td className="px-4 py-3 text-right dark:text-gray-300">{formatPrice(inv.subtotal)}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{formatPrice(inv.taxAmount)}</td>
                      <td className="px-4 py-3 text-right font-semibold dark:text-white">{formatPrice(inv.totalAmount)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(inv.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20"
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedInvoice(null)} />
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            {/* Modal header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold dark:text-white">{selectedInvoice.invoiceNumber}</h2>
                <p className="mt-0.5 text-sm text-gray-500">Đơn hàng #{selectedInvoice.orderId}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Status */}
            {(() => {
              const s = STATUS_MAP[selectedInvoice.status] || { label: selectedInvoice.status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }
              return (
                <span className={`mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${s.color}`}>
                  <span className={`h-2 w-2 rounded-full ${s.dotColor}`} />
                  {s.label}
                </span>
              )
            })()}

            {/* Seller / Buyer */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Người bán</p>
                <p className="text-sm font-semibold dark:text-white">{selectedInvoice.sellerName}</p>
                <p className="text-xs text-gray-500">MST: {selectedInvoice.sellerTaxCode}</p>
                <p className="text-xs text-gray-500">{selectedInvoice.sellerAddress}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Người mua</p>
                <p className="text-sm font-semibold dark:text-white">{selectedInvoice.buyerName}</p>
                {selectedInvoice.buyerTaxCode && (
                  <p className="text-xs text-gray-500">MST: {selectedInvoice.buyerTaxCode}</p>
                )}
                <p className="text-xs text-gray-500">{selectedInvoice.buyerAddress}</p>
                <p className="text-xs text-gray-500">{selectedInvoice.buyerEmail}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Chi tiết hàng hóa</p>
              <div className="space-y-2">
                {selectedInvoice.items.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-medium dark:text-white">{idx + 1}. {item.productName}</p>
                      <p className="text-xs text-gray-500">{item.unit} × {item.quantity} @ {formatPrice(item.unitPrice)}</p>
                    </div>
                    <p className="text-sm font-semibold dark:text-white">{formatPrice(item.totalAmount)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="mt-5 space-y-1.5 border-t border-gray-100 pt-4 dark:border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cộng tiền hàng</span>
                <span className="dark:text-gray-300">{formatPrice(selectedInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Thuế GTGT ({(selectedInvoice.taxRate * 100).toFixed(0)}%)</span>
                <span className="dark:text-gray-300">{formatPrice(selectedInvoice.taxAmount)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold dark:border-gray-700">
                <span className="dark:text-white">Tổng thanh toán</span>
                <span className="text-red-600">{formatPrice(selectedInvoice.totalAmount)}</span>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400">
              <span>Tạo: {new Date(selectedInvoice.createdAt).toLocaleString('vi-VN')}</span>
              {selectedInvoice.issuedAt && (
                <span className="text-green-500">Phát hành: {new Date(selectedInvoice.issuedAt).toLocaleString('vi-VN')}</span>
              )}
              {selectedInvoice.cancelledAt && (
                <span className="text-red-500">Hủy: {new Date(selectedInvoice.cancelledAt).toLocaleString('vi-VN')}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
