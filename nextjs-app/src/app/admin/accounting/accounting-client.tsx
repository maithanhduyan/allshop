'use client'

import { useState, useMemo } from 'react'
import { formatPrice } from '@/lib/format-price'
import type { Account, JournalEntry, TrialBalanceRow } from '@/types'

type Tab = 'accounts' | 'journal-entries' | 'trial-balance'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'accounts', label: 'Hệ thống tài khoản', icon: '📋' },
  { key: 'journal-entries', label: 'Bút toán', icon: '📝' },
  { key: 'trial-balance', label: 'Bảng cân đối thử', icon: '⚖️' },
]

const ACCOUNT_TYPE_MAP: Record<string, { label: string; color: string }> = {
  asset: { label: 'Tài sản', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  liability: { label: 'Nợ phải trả', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  equity: { label: 'Vốn CSH', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  revenue: { label: 'Doanh thu', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  expense: { label: 'Chi phí', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
}

const JE_STATUS_MAP: Record<string, { label: string; color: string; dotColor: string }> = {
  posted: { label: 'Đã ghi sổ', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', dotColor: 'bg-green-400' },
  reversed: { label: 'Đã đảo', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', dotColor: 'bg-red-400' },
}

interface Props {
  accounts: Account[]
  journalEntries: JournalEntry[]
  trialBalance: TrialBalanceRow[]
}

export function AccountingClient({ accounts, journalEntries, trialBalance }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('accounts')
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all')
  const [accountSearch, setAccountSearch] = useState('')
  const [jeStatusFilter, setJeStatusFilter] = useState<string>('all')
  const [jeSearch, setJeSearch] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  // Summary stats
  const totalAccounts = accounts.length
  const totalEntries = journalEntries.length
  const postedEntries = journalEntries.filter((e) => e.status === 'posted').length
  const totalDebit = trialBalance.reduce((s, r) => s + r.totalDebit, 0)
  const totalCredit = trialBalance.reduce((s, r) => s + r.totalCredit, 0)

  // Filtered accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((a) => {
      const matchType = accountTypeFilter === 'all' || a.type === accountTypeFilter
      const matchSearch =
        !accountSearch ||
        a.code.includes(accountSearch) ||
        a.name.toLowerCase().includes(accountSearch.toLowerCase())
      return matchType && matchSearch
    })
  }, [accounts, accountTypeFilter, accountSearch])

  // Filtered journal entries
  const filteredEntries = useMemo(() => {
    return journalEntries.filter((e) => {
      const matchStatus = jeStatusFilter === 'all' || e.status === jeStatusFilter
      const matchSearch =
        !jeSearch ||
        e.entryNumber.toLowerCase().includes(jeSearch.toLowerCase()) ||
        e.description.toLowerCase().includes(jeSearch.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [journalEntries, jeStatusFilter, jeSearch])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kế toán</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Hệ thống tài khoản, bút toán & bảng cân đối thử
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tài khoản</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{totalAccounts}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Bút toán đã ghi sổ</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{postedEntries}/{totalEntries}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng phát sinh Nợ</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{formatPrice(totalDebit)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng phát sinh Có</p>
          <p className="mt-1 text-2xl font-bold text-orange-600">{formatPrice(totalCredit)}</p>
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
      {activeTab === 'accounts' && (
        <AccountsTab
          accounts={filteredAccounts}
          allAccounts={accounts}
          typeFilter={accountTypeFilter}
          onTypeFilterChange={setAccountTypeFilter}
          search={accountSearch}
          onSearchChange={setAccountSearch}
        />
      )}
      {activeTab === 'journal-entries' && (
        <JournalEntriesTab
          entries={filteredEntries}
          allEntries={journalEntries}
          statusFilter={jeStatusFilter}
          onStatusFilterChange={setJeStatusFilter}
          search={jeSearch}
          onSearchChange={setJeSearch}
          selectedEntry={selectedEntry}
          onSelectEntry={setSelectedEntry}
        />
      )}
      {activeTab === 'trial-balance' && <TrialBalanceTab rows={trialBalance} />}
    </div>
  )
}

/* ─────────── Tab: Hệ thống tài khoản ─────────── */

function AccountsTab({
  accounts,
  allAccounts,
  typeFilter,
  onTypeFilterChange,
  search,
  onSearchChange,
}: {
  accounts: Account[]
  allAccounts: Account[]
  typeFilter: string
  onTypeFilterChange: (v: string) => void
  search: string
  onSearchChange: (v: string) => void
}) {
  const typeTabs = [
    { key: 'all', label: 'Tất cả', count: allAccounts.length },
    ...Object.entries(ACCOUNT_TYPE_MAP).map(([key, { label }]) => ({
      key,
      label,
      count: allAccounts.filter((a) => a.type === key).length,
    })),
  ]

  return (
    <div className="space-y-4">
      {/* Type filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {typeTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTypeFilterChange(tab.key)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              typeFilter === tab.key
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
          placeholder="Tìm theo mã hoặc tên tài khoản..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-900/30"
        />
      </div>

      {/* Accounts table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Mã TK</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Tên tài khoản</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Loại</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-400">Cấp</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">TK mẹ</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-400">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    Không tìm thấy tài khoản nào
                  </td>
                </tr>
              ) : (
                accounts.map((acc) => {
                  const accountType = ACCOUNT_TYPE_MAP[acc.type] || { label: acc.type, color: 'bg-gray-100 text-gray-700' }
                  return (
                    <tr
                      key={acc.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-800/50 dark:hover:bg-gray-800/30"
                    >
                      <td className="px-4 py-3">
                        <span
                          className="font-mono font-semibold text-primary-600 dark:text-primary-400"
                          style={{ paddingLeft: `${(acc.level - 1) * 16}px` }}
                        >
                          {acc.code}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium dark:text-white" style={{ paddingLeft: `${(acc.level - 1) * 16}px` }}>
                          {acc.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${accountType.color}`}>
                          {accountType.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{acc.level}</td>
                      <td className="px-4 py-3 font-mono text-gray-500">{acc.parentCode || '—'}</td>
                      <td className="px-4 py-3 text-center">
                        {acc.isActive ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                            Tạm ngưng
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Tab: Bút toán ─────────── */

function JournalEntriesTab({
  entries,
  allEntries,
  statusFilter,
  onStatusFilterChange,
  search,
  onSearchChange,
  selectedEntry,
  onSelectEntry,
}: {
  entries: JournalEntry[]
  allEntries: JournalEntry[]
  statusFilter: string
  onStatusFilterChange: (v: string) => void
  search: string
  onSearchChange: (v: string) => void
  selectedEntry: JournalEntry | null
  onSelectEntry: (e: JournalEntry | null) => void
}) {
  const statusTabs = [
    { key: 'all', label: 'Tất cả', count: allEntries.length },
    { key: 'posted', label: 'Đã ghi sổ', count: allEntries.filter((e) => e.status === 'posted').length },
    { key: 'reversed', label: 'Đã đảo', count: allEntries.filter((e) => e.status === 'reversed').length },
  ]

  return (
    <div className="space-y-4">
      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onStatusFilterChange(tab.key)}
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
          placeholder="Tìm theo số bút toán hoặc mô tả..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-900/30"
        />
      </div>

      {/* Journal entries table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Số bút toán</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Mô tả</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Ngày</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Hóa đơn</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Tổng Nợ</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Tổng Có</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Trạng thái</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-400">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    Không tìm thấy bút toán nào
                  </td>
                </tr>
              ) : (
                entries.map((entry) => {
                  const status = JE_STATUS_MAP[entry.status] || { label: entry.status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }
                  const totalDebit = entry.lines?.reduce((s, l) => s + l.debit, 0) ?? 0
                  const totalCredit = entry.lines?.reduce((s, l) => s + l.credit, 0) ?? 0
                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-800/50 dark:hover:bg-gray-800/30"
                    >
                      <td className="px-4 py-3">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{entry.entryNumber}</span>
                        {entry.reverses && (
                          <p className="text-[11px] text-red-500">Đảo bút toán #{entry.reverses}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="max-w-xs truncate font-medium dark:text-white">{entry.description}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(entry.entryDate + 'T00:00:00').toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {entry.invoiceId ? `#${entry.invoiceId}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono dark:text-gray-300">{formatPrice(totalDebit)}</td>
                      <td className="px-4 py-3 text-right font-mono dark:text-gray-300">{formatPrice(totalCredit)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onSelectEntry(entry)}
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
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onSelectEntry(null)} />
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold dark:text-white">{selectedEntry.entryNumber}</h2>
                <p className="mt-0.5 text-sm text-gray-500">{selectedEntry.description}</p>
              </div>
              <button
                onClick={() => onSelectEntry(null)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Status + meta */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {(() => {
                const s = JE_STATUS_MAP[selectedEntry.status] || { label: selectedEntry.status, color: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' }
                return (
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${s.color}`}>
                    <span className={`h-2 w-2 rounded-full ${s.dotColor}`} />
                    {s.label}
                  </span>
                )
              })()}
              <span className="text-sm text-gray-500">
                Ngày: {new Date(selectedEntry.entryDate + 'T00:00:00').toLocaleDateString('vi-VN')}
              </span>
              {selectedEntry.invoiceId && (
                <span className="text-sm text-gray-500">Hóa đơn: #{selectedEntry.invoiceId}</span>
              )}
              {selectedEntry.reverses && (
                <span className="text-sm text-red-500">Đảo bút toán #{selectedEntry.reverses}</span>
              )}
              {selectedEntry.reversedBy && (
                <span className="text-sm text-red-500">Đã bị đảo bởi #{selectedEntry.reversedBy}</span>
              )}
            </div>

            {/* Lines table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                    <th className="px-4 py-2.5 text-left font-semibold text-gray-600 dark:text-gray-400">TK</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-gray-600 dark:text-gray-400">Tên tài khoản</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-gray-600 dark:text-gray-400">Diễn giải</th>
                    <th className="px-4 py-2.5 text-right font-semibold text-gray-600 dark:text-gray-400">Nợ</th>
                    <th className="px-4 py-2.5 text-right font-semibold text-gray-600 dark:text-gray-400">Có</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEntry.lines?.map((line) => (
                    <tr key={line.id} className="border-b border-gray-50 dark:border-gray-800/50">
                      <td className="px-4 py-2 font-mono font-semibold text-primary-600 dark:text-primary-400">{line.accountCode}</td>
                      <td className="px-4 py-2 dark:text-gray-300">{line.accountName}</td>
                      <td className="px-4 py-2 text-gray-500">{line.description}</td>
                      <td className="px-4 py-2 text-right font-mono dark:text-gray-300">
                        {line.debit > 0 ? formatPrice(line.debit) : ''}
                      </td>
                      <td className="px-4 py-2 text-right font-mono dark:text-gray-300">
                        {line.credit > 0 ? formatPrice(line.credit) : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/30">
                    <td colSpan={3} className="px-4 py-2.5 text-right font-semibold text-gray-700 dark:text-gray-300">
                      Tổng cộng
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-blue-600">
                      {formatPrice(selectedEntry.lines?.reduce((s, l) => s + l.debit, 0) ?? 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-orange-600">
                      {formatPrice(selectedEntry.lines?.reduce((s, l) => s + l.credit, 0) ?? 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Created at */}
            <p className="mt-4 text-xs text-gray-400">
              Tạo: {new Date(selectedEntry.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────── Tab: Bảng cân đối thử ─────────── */

function TrialBalanceTab({ rows }: { rows: TrialBalanceRow[] }) {
  const totalDebit = rows.reduce((s, r) => s + r.totalDebit, 0)
  const totalCredit = rows.reduce((s, r) => s + r.totalCredit, 0)
  const isBalanced = Math.abs(totalDebit - totalCredit) < 1

  return (
    <div className="space-y-4">
      {/* Balance indicator */}
      <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
        isBalanced
          ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400'
      }`}>
        {isBalanced ? (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Cân đối — Tổng Nợ = Tổng Có
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            Không cân đối — Chênh lệch: {formatPrice(Math.abs(totalDebit - totalCredit))}
          </>
        )}
      </div>

      {/* Trial balance table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Mã TK</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">Tên tài khoản</th>
                <th className="px-4 py-3 text-right font-semibold text-blue-600">Phát sinh Nợ</th>
                <th className="px-4 py-3 text-right font-semibold text-orange-600">Phát sinh Có</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Số dư</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                    Chưa có dữ liệu phát sinh
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.accountCode}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-800/50 dark:hover:bg-gray-800/30"
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-primary-600 dark:text-primary-400">{row.accountCode}</td>
                    <td className="px-4 py-3 font-medium dark:text-white">{row.accountName}</td>
                    <td className="px-4 py-3 text-right font-mono dark:text-gray-300">{formatPrice(row.totalDebit)}</td>
                    <td className="px-4 py-3 text-right font-mono dark:text-gray-300">{formatPrice(row.totalCredit)}</td>
                    <td className={`px-4 py-3 text-right font-mono font-semibold ${
                      row.balance > 0 ? 'text-blue-600' : row.balance < 0 ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {row.balance > 0 ? `Nợ ${formatPrice(row.balance)}` : row.balance < 0 ? `Có ${formatPrice(Math.abs(row.balance))}` : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <td colSpan={2} className="px-4 py-3 text-right font-bold text-gray-700 dark:text-gray-300">Tổng cộng</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-blue-600">{formatPrice(totalDebit)}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-orange-600">{formatPrice(totalCredit)}</td>
                <td className="px-4 py-3" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
