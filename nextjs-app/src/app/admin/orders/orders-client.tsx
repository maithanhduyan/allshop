'use client'

import { useState, useMemo } from 'react'
import { formatPrice } from '@/lib/format-price'

interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: string
  name: string
  phone: string
  address: string
  note?: string
  createdAt: string
}

interface Props {
  orders: Order[]
}

const STATUS_MAP: Record<string, { label: string; color: string; dotColor: string }> = {
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', dotColor: 'bg-yellow-400' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', dotColor: 'bg-blue-400' },
  shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', dotColor: 'bg-purple-400' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', dotColor: 'bg-green-400' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', dotColor: 'bg-red-400' },
}

const STATUSES = ['all', 'pending', 'confirmed', 'shipping', 'delivered', 'cancelled'] as const

export function OrdersClient({ orders }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter
      const matchesSearch =
        !search ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search)
      return matchesStatus && matchesSearch
    })
  }, [orders, statusFilter, search])

  const statusTabs = STATUSES.map((s) => ({
    key: s,
    label: s === 'all' ? 'Tất cả' : STATUS_MAP[s]?.label || s,
    count: s === 'all' ? orders.length : orders.filter((o) => o.status === s).length,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Đơn hàng</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Theo dõi và quản lý {orders.length} đơn hàng
        </p>
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
          placeholder="Tìm theo mã đơn, tên, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
                <th className="px-6 py-3">Mã đơn</th>
                <th className="px-6 py-3">Khách hàng</th>
                <th className="px-6 py-3">Sản phẩm</th>
                <th className="px-6 py-3">Tổng tiền</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Ngày đặt</th>
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy đơn hàng
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const info = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{order.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{order.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {order.items.length} sản phẩm
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${info.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${info.dotColor}`} />
                          {info.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                          title="Xem chi tiết"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filtered.length} / {orders.length} đơn hàng
          </p>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const info = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Chi tiết đơn hàng {order.id}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Trạng thái</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${info.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${info.dotColor}`} />
              {info.label}
            </span>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Thông tin khách hàng</h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p><span className="font-medium text-gray-700 dark:text-gray-300">Tên:</span> {order.name}</p>
              <p><span className="font-medium text-gray-700 dark:text-gray-300">SĐT:</span> {order.phone}</p>
              <p><span className="font-medium text-gray-700 dark:text-gray-300">Địa chỉ:</span> {order.address}</p>
              {order.note && <p><span className="font-medium text-gray-700 dark:text-gray-300">Ghi chú:</span> {order.note}</p>}
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Sản phẩm ({order.items.length})</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
            <span className="text-base font-semibold text-gray-900 dark:text-white">Tổng cộng</span>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{formatPrice(order.total)}</span>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-400">
            Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
          </p>

          {/* Actions */}
          {order.status === 'pending' && (
            <div className="flex gap-3 pt-2">
              <button className="flex-1 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
                Hủy đơn
              </button>
              <button className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:from-primary-600 hover:to-primary-700">
                Xác nhận
              </button>
            </div>
          )}
          {order.status === 'confirmed' && (
            <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:from-purple-600 hover:to-purple-700">
              Giao hàng
            </button>
          )}
          {order.status === 'shipping' && (
            <button className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 text-sm font-medium text-white hover:from-green-600 hover:to-green-700">
              Đã giao thành công
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
