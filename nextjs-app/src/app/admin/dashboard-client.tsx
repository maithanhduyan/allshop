'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/format-price'
import type { Product } from '@/types'

interface Props {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  lowStockProducts: Product[]
  categoryBreakdown: Record<string, number>
  statusCounts: Record<string, number>
  recentOrders: {
    id: string
    name: string
    total: number
    status: string
    createdAt: string
  }[]
  topProducts: Product[]
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
}

const CATEGORY_LABELS: Record<string, string> = {
  fashion: '👕 Thời trang',
  electronics: '📺 Điện máy',
  tools: '🔧 Công cụ',
  computers: '💻 Máy tính',
  phones: '📱 Điện thoại',
  accessories: '🎧 Phụ kiện',
}

export function DashboardClient({
  totalRevenue,
  totalOrders,
  totalProducts,
  totalCustomers,
  lowStockProducts,
  categoryBreakdown,
  statusCounts,
  recentOrders,
  topProducts,
}: Props) {
  const statCards = [
    {
      title: 'Doanh thu',
      value: formatPrice(totalRevenue),
      change: '+12.5%',
      up: true,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Đơn hàng',
      value: totalOrders.toString(),
      change: '+8.2%',
      up: true,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Sản phẩm',
      value: totalProducts.toString(),
      change: '+3',
      up: true,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-violet-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Khách hàng',
      value: totalCustomers.toString(),
      change: '+5.1%',
      up: true,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-amber-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tổng quan hoạt động kinh doanh AllShop
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                <p className={`mt-1 text-xs font-medium ${card.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {card.change} so với tháng trước
                </p>
              </div>
              <div className={`rounded-xl ${card.bg} p-3`}>
                <div className={`bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}>
                  {card.icon}
                </div>
              </div>
            </div>
            {/* Decorative gradient bar */}
            <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Status Breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
            Trạng thái đơn hàng
          </h2>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => {
              const info = STATUS_MAP[status] || { label: status, color: 'bg-gray-100 text-gray-700' }
              const pct = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0
              return (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${info.color}`}>
                      {info.label}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status === 'delivered'
                          ? 'bg-green-500'
                          : status === 'shipping'
                            ? 'bg-purple-500'
                            : status === 'confirmed'
                              ? 'bg-blue-500'
                              : status === 'pending'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
            Sản phẩm theo danh mục
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => {
                const pct = totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0
                return (
                  <div key={cat}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {CATEGORY_LABELS[cat] || cat}
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Đơn hàng gần đây
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <th className="px-6 py-3">Mã đơn</th>
                  <th className="px-6 py-3">Khách hàng</th>
                  <th className="px-6 py-3">Tổng tiền</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Ngày</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => {
                  const info = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' }
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{order.name}</td>
                      <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{formatPrice(order.total)}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${info.color}`}>
                          {info.label}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Cảnh báo tồn kho
            </h2>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {lowStockProducts.length}
            </span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {lowStockProducts.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Không có sản phẩm sắp hết hàng
              </div>
            ) : (
              lowStockProducts.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-6 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75Z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatPrice(p.price)}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${p.stock <= 3 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    còn {p.stock}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Sản phẩm nổi bật
          </h2>
          <Link
            href="/admin/products"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Quản lý sản phẩm →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="px-6 py-3">Sản phẩm</th>
                <th className="px-6 py-3">Danh mục</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Tồn kho</th>
                <th className="px-6 py-3">Đánh giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75Z" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                    {CATEGORY_LABELS[product.category] || product.category}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${product.stock > 20 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : product.stock > 5 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviewCount})</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
