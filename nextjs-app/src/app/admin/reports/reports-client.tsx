'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/format-price'
import type { RevenueReport, TaxReport, AccountBalanceReport } from '@/types'

type Tab = 'revenue' | 'tax' | 'account-balance'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'revenue', label: 'Doanh thu', icon: '💰' },
  { key: 'tax', label: 'Thuế GTGT', icon: '🧾' },
  { key: 'account-balance', label: 'Cân đối tài khoản', icon: '📊' },
]

interface Props {
  revenue: RevenueReport
  tax: TaxReport
  accountBalance: AccountBalanceReport
}

export function ReportsClient({ revenue, tax, accountBalance }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('revenue')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Báo cáo</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Báo cáo doanh thu, thuế GTGT & cân đối tài khoản
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng doanh thu</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{formatPrice(revenue.totalRevenue)}</p>
          <p className="mt-0.5 text-xs text-gray-400">{revenue.totalInvoices} hóa đơn</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Thuế đầu ra</p>
          <p className="mt-1 text-2xl font-bold text-orange-600">{formatPrice(tax.outputTax)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Thuế phải nộp</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{formatPrice(tax.netTaxPayable)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tài khoản theo dõi</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{accountBalance.accounts.length}</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'revenue' && <RevenueTab data={revenue} />}
      {activeTab === 'tax' && <TaxTab data={tax} />}
      {activeTab === 'account-balance' && <AccountBalanceTab data={accountBalance} />}
    </div>
  )
}

/* ─────────── Tab: Doanh thu ─────────── */

function RevenueTab({ data }: { data: RevenueReport }) {
  const maxTotal = Math.max(...data.days.map((d) => d.total), 1)

  return (
    <div className="space-y-4">
      {/* Date range */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Từ {new Date(data.from + 'T00:00:00').toLocaleDateString('vi-VN')} đến{' '}
        {new Date(data.to + 'T00:00:00').toLocaleDateString('vi-VN')}
      </div>

      {/* Bar chart */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Doanh thu theo ngày</h3>
        <div className="space-y-3">
          {data.days.map((day) => {
            const pct = (day.total / maxTotal) * 100
            return (
              <div key={day.date} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-xs text-gray-500">
                  {new Date(day.date + 'T00:00:00').toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </span>
                <div className="flex-1">
                  <div className="h-6 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="flex h-full items-center rounded-full bg-gradient-to-r from-green-400 to-green-600 px-2 text-[10px] font-semibold text-white transition-all"
                      style={{ width: `${Math.max(pct, 8)}%` }}
                    >
                      {day.invoiceCount} HĐ
                    </div>
                  </div>
                </div>
                <span className="w-28 shrink-0 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {formatPrice(day.total)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Revenue table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Ngày</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-400">Số HĐ</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Doanh thu chưa thuế</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Thuế GTGT</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Tổng cộng</th>
              </tr>
            </thead>
            <tbody>
              {data.days.map((day) => (
                <tr key={day.date} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-800/50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium dark:text-white">
                    {new Date(day.date + 'T00:00:00').toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{day.invoiceCount}</td>
                  <td className="px-4 py-3 text-right font-mono dark:text-gray-300">{formatPrice(day.subtotal)}</td>
                  <td className="px-4 py-3 text-right font-mono text-orange-600">{formatPrice(day.tax)}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-green-600">{formatPrice(day.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <td className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Tổng cộng</td>
                <td className="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300">{data.totalInvoices}</td>
                <td className="px-4 py-3 text-right font-mono font-bold dark:text-gray-200">{formatPrice(data.totalSubtotal)}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-orange-600">{formatPrice(data.totalTax)}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-green-600">{formatPrice(data.totalRevenue)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Tab: Thuế GTGT ─────────── */

function TaxTab({ data }: { data: TaxReport }) {
  return (
    <div className="space-y-4">
      {/* Date range */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Từ {new Date(data.from + 'T00:00:00').toLocaleDateString('vi-VN')} đến{' '}
        {new Date(data.to + 'T00:00:00').toLocaleDateString('vi-VN')}
      </div>

      {/* Tax summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl dark:bg-orange-900/30">
              📤
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thuế GTGT đầu ra</p>
              <p className="text-2xl font-bold text-orange-600">{formatPrice(data.outputTax)}</p>
              <p className="text-xs text-gray-400">Thuế thu từ bán hàng</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl dark:bg-blue-900/30">
              📥
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thuế GTGT đầu vào</p>
              <p className="text-2xl font-bold text-blue-600">{formatPrice(data.inputTax)}</p>
              <p className="text-xs text-gray-400">Thuế đã nộp khi mua hàng</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-gray-800">
              🚫
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thuế HĐ đã hủy</p>
              <p className="text-2xl font-bold text-gray-500">{formatPrice(data.cancelledTax)}</p>
              <p className="text-xs text-gray-400">Thuế từ hóa đơn bị hủy bỏ</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-200 text-2xl dark:bg-red-800">
              💳
            </div>
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">Thuế GTGT phải nộp</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{formatPrice(data.netTaxPayable)}</p>
              <p className="text-xs text-red-500 dark:text-red-400">= Đầu ra − Đầu vào − Đã hủy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax calculation breakdown */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/50">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Chi tiết tính thuế</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-gray-600 dark:text-gray-400">Thuế GTGT đầu ra (a)</span>
            <span className="font-mono font-semibold text-orange-600">{formatPrice(data.outputTax)}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-gray-600 dark:text-gray-400">Thuế GTGT đầu vào được khấu trừ (b)</span>
            <span className="font-mono font-semibold text-blue-600">− {formatPrice(data.inputTax)}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-gray-600 dark:text-gray-400">Thuế từ hóa đơn đã hủy (c)</span>
            <span className="font-mono font-semibold text-gray-500">− {formatPrice(data.cancelledTax)}</span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 px-6 py-4 dark:bg-gray-800/50">
            <span className="font-bold text-gray-800 dark:text-gray-200">Thuế phải nộp = (a) − (b) − (c)</span>
            <span className="font-mono text-lg font-bold text-red-600">{formatPrice(data.netTaxPayable)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Tab: Cân đối tài khoản ─────────── */

function AccountBalanceTab({ data }: { data: AccountBalanceReport }) {
  const totals = data.accounts.reduce(
    (acc, row) => ({
      openingDebit: acc.openingDebit + row.openingDebit,
      openingCredit: acc.openingCredit + row.openingCredit,
      periodDebit: acc.periodDebit + row.periodDebit,
      periodCredit: acc.periodCredit + row.periodCredit,
      closingDebit: acc.closingDebit + row.closingDebit,
      closingCredit: acc.closingCredit + row.closingCredit,
    }),
    { openingDebit: 0, openingCredit: 0, periodDebit: 0, periodCredit: 0, closingDebit: 0, closingCredit: 0 }
  )

  return (
    <div className="space-y-4">
      {/* Date range */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Từ {new Date(data.from + 'T00:00:00').toLocaleDateString('vi-VN')} đến{' '}
        {new Date(data.to + 'T00:00:00').toLocaleDateString('vi-VN')}
      </div>

      {/* Account balance table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th rowSpan={2} className="border-r border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-400">Mã TK</th>
                <th rowSpan={2} className="border-r border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-400">Tên tài khoản</th>
                <th colSpan={2} className="border-b border-r border-gray-200 px-3 py-2 text-center font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-400">Số dư đầu kỳ</th>
                <th colSpan={2} className="border-b border-r border-gray-200 px-3 py-2 text-center font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-400">Phát sinh trong kỳ</th>
                <th colSpan={2} className="border-b border-gray-200 px-3 py-2 text-center font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-400">Số dư cuối kỳ</th>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th className="border-r border-gray-200 px-3 py-2 text-right font-semibold text-blue-600 dark:border-gray-700">Nợ</th>
                <th className="border-r border-gray-200 px-3 py-2 text-right font-semibold text-orange-600 dark:border-gray-700">Có</th>
                <th className="border-r border-gray-200 px-3 py-2 text-right font-semibold text-blue-600 dark:border-gray-700">Nợ</th>
                <th className="border-r border-gray-200 px-3 py-2 text-right font-semibold text-orange-600 dark:border-gray-700">Có</th>
                <th className="px-3 py-2 text-right font-semibold text-blue-600">Nợ</th>
                <th className="px-3 py-2 text-right font-semibold text-orange-600">Có</th>
              </tr>
            </thead>
            <tbody>
              {data.accounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    Chưa có dữ liệu phát sinh
                  </td>
                </tr>
              ) : (
                data.accounts.map((row) => (
                  <tr key={row.accountCode} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-800/50 dark:hover:bg-gray-800/30">
                    <td className="border-r border-gray-100 px-3 py-2.5 font-mono font-semibold text-primary-600 dark:border-gray-800 dark:text-primary-400">{row.accountCode}</td>
                    <td className="border-r border-gray-100 px-3 py-2.5 font-medium dark:border-gray-800 dark:text-white">{row.accountName}</td>
                    <td className="border-r border-gray-100 px-3 py-2.5 text-right font-mono dark:border-gray-800 dark:text-gray-300">{row.openingDebit > 0 ? formatPrice(row.openingDebit) : ''}</td>
                    <td className="border-r border-gray-100 px-3 py-2.5 text-right font-mono dark:border-gray-800 dark:text-gray-300">{row.openingCredit > 0 ? formatPrice(row.openingCredit) : ''}</td>
                    <td className="border-r border-gray-100 px-3 py-2.5 text-right font-mono dark:border-gray-800 dark:text-gray-300">{row.periodDebit > 0 ? formatPrice(row.periodDebit) : ''}</td>
                    <td className="border-r border-gray-100 px-3 py-2.5 text-right font-mono dark:border-gray-800 dark:text-gray-300">{row.periodCredit > 0 ? formatPrice(row.periodCredit) : ''}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-semibold text-blue-600">{row.closingDebit > 0 ? formatPrice(row.closingDebit) : ''}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-semibold text-orange-600">{row.closingCredit > 0 ? formatPrice(row.closingCredit) : ''}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <td colSpan={2} className="border-r border-gray-200 px-3 py-3 text-right font-bold text-gray-700 dark:border-gray-700 dark:text-gray-300">Tổng cộng</td>
                <td className="border-r border-gray-200 px-3 py-3 text-right font-mono font-bold text-blue-600 dark:border-gray-700">{formatPrice(totals.openingDebit)}</td>
                <td className="border-r border-gray-200 px-3 py-3 text-right font-mono font-bold text-orange-600 dark:border-gray-700">{formatPrice(totals.openingCredit)}</td>
                <td className="border-r border-gray-200 px-3 py-3 text-right font-mono font-bold text-blue-600 dark:border-gray-700">{formatPrice(totals.periodDebit)}</td>
                <td className="border-r border-gray-200 px-3 py-3 text-right font-mono font-bold text-orange-600 dark:border-gray-700">{formatPrice(totals.periodCredit)}</td>
                <td className="px-3 py-3 text-right font-mono font-bold text-blue-600">{formatPrice(totals.closingDebit)}</td>
                <td className="px-3 py-3 text-right font-mono font-bold text-orange-600">{formatPrice(totals.closingCredit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
