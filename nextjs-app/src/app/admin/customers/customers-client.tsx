'use client'

import { useState, useMemo } from 'react'
import { formatPrice } from '@/lib/format-price'

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  ordersCount: number
  totalSpent: number
  createdAt: string
}

interface Props {
  customers: Customer[]
}

export function CustomersClient({ customers }: Props) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'orders' | 'spent' | 'recent'>('recent')

  const filtered = useMemo(() => {
    let result = customers.filter((c) => {
      return (
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.phone && c.phone.includes(search))
      )
    })

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'orders':
        result.sort((a, b) => b.ordersCount - a.ordersCount)
        break
      case 'spent':
        result.sort((a, b) => b.totalSpent - a.totalSpent)
        break
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }
    return result
  }, [customers, search, sortBy])

  const totalSpent = customers.reduce((s, c) => s + c.totalSpent, 0)
  const activeCustomers = customers.filter((c) => c.ordersCount > 0).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Khách hàng</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Quản lý {customers.length} khách hàng
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng khách hàng</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{customers.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Đã mua hàng</p>
          <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">{activeCustomers}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng chi tiêu</p>
          <p className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">{formatPrice(totalSpent)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 sm:max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tên, email, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="recent">Mới nhất</option>
          <option value="name">Tên A-Z</option>
          <option value="orders">Đơn hàng nhiều nhất</option>
          <option value="spent">Chi tiêu nhiều nhất</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
                <th className="px-6 py-3">Khách hàng</th>
                <th className="px-6 py-3">Liên hệ</th>
                <th className="px-6 py-3">Đơn hàng</th>
                <th className="px-6 py-3">Tổng chi tiêu</th>
                <th className="px-6 py-3">Ngày tham gia</th>
                <th className="px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy khách hàng
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-accent-500 text-sm font-bold text-white">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">ID: {customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">{customer.email}</p>
                        {customer.phone && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{customer.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 dark:text-white">{customer.ordersCount}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(customer.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      {customer.ordersCount > 0 ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          Mới đăng ký
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filtered.length} / {customers.length} khách hàng
          </p>
        </div>
      </div>
    </div>
  )
}
