import { AccountingClient } from './accounting-client'
import type { Account, JournalEntry, TrialBalanceRow } from '@/types'

export const metadata = {
  title: 'Kế toán — AllShop Admin',
}

async function getAccounts(): Promise<Account[]> {
  // Demo data — Vietnamese chart of accounts (Thông tư 200)
  return [
    { id: '1', code: '111', name: 'Tiền mặt', type: 'asset', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '2', code: '112', name: 'Tiền gửi ngân hàng', type: 'asset', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '3', code: '131', name: 'Phải thu của khách hàng', type: 'asset', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '4', code: '133', name: 'Thuế GTGT được khấu trừ', type: 'asset', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '5', code: '1331', name: 'Thuế GTGT được khấu trừ của hàng hóa, dịch vụ', type: 'asset', parentCode: '133', level: 2, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '6', code: '156', name: 'Hàng hóa', type: 'asset', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '7', code: '211', name: 'Tài sản cố định hữu hình', type: 'asset', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '8', code: '331', name: 'Phải trả cho người bán', type: 'liability', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '9', code: '333', name: 'Thuế và các khoản phải nộp NN', type: 'liability', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '10', code: '3331', name: 'Thuế GTGT phải nộp', type: 'liability', parentCode: '333', level: 2, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '11', code: '33311', name: 'Thuế GTGT đầu ra', type: 'liability', parentCode: '3331', level: 3, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '12', code: '411', name: 'Vốn đầu tư của chủ sở hữu', type: 'equity', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '13', code: '421', name: 'Lợi nhuận sau thuế chưa phân phối', type: 'equity', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '14', code: '511', name: 'Doanh thu bán hàng và cung cấp dịch vụ', type: 'revenue', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '15', code: '5111', name: 'Doanh thu bán hàng hóa', type: 'revenue', parentCode: '511', level: 2, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '16', code: '632', name: 'Giá vốn hàng bán', type: 'expense', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '17', code: '641', name: 'Chi phí bán hàng', type: 'expense', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '18', code: '642', name: 'Chi phí quản lý doanh nghiệp', type: 'expense', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '19', code: '821', name: 'Chi phí thuế thu nhập doanh nghiệp', type: 'expense', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
    { id: '20', code: '911', name: 'Xác định kết quả kinh doanh', type: 'equity', level: 1, isActive: true, createdAt: '2026-01-01T00:00:00Z' },
  ]
}

async function getJournalEntries(): Promise<JournalEntry[]> {
  return [
    {
      id: '1', entryNumber: 'JE-20260312-0001', invoiceId: '1',
      description: 'Ghi nhận doanh thu hóa đơn HD-20260312-0001',
      entryDate: '2026-03-12', status: 'posted',
      lines: [
        { id: '1', journalEntryId: '1', accountCode: '131', accountName: 'Phải thu của khách hàng', description: 'Phải thu từ khách hàng', debit: 32389200, credit: 0 },
        { id: '2', journalEntryId: '1', accountCode: '5111', accountName: 'Doanh thu bán hàng hóa', description: 'Doanh thu bán hàng', debit: 0, credit: 29990000 },
        { id: '3', journalEntryId: '1', accountCode: '33311', accountName: 'Thuế GTGT đầu ra', description: 'Thuế GTGT đầu ra', debit: 0, credit: 2399200 },
      ],
      createdAt: '2026-03-12T15:00:00Z',
    },
    {
      id: '2', entryNumber: 'JE-20260311-0001', invoiceId: '2',
      description: 'Ghi nhận doanh thu hóa đơn HD-20260311-0001',
      entryDate: '2026-03-11', status: 'posted',
      lines: [
        { id: '4', journalEntryId: '2', accountCode: '131', accountName: 'Phải thu của khách hàng', description: 'Phải thu từ khách hàng', debit: 46429200, credit: 0 },
        { id: '5', journalEntryId: '2', accountCode: '5111', accountName: 'Doanh thu bán hàng hóa', description: 'Doanh thu bán hàng', debit: 0, credit: 42990000 },
        { id: '6', journalEntryId: '2', accountCode: '33311', accountName: 'Thuế GTGT đầu ra', description: 'Thuế GTGT đầu ra', debit: 0, credit: 3439200 },
      ],
      createdAt: '2026-03-11T11:00:00Z',
    },
    {
      id: '3', entryNumber: 'JE-20260311-0002', invoiceId: '4',
      description: 'Đảo bút toán hủy hóa đơn HD-20260310-0001',
      entryDate: '2026-03-11', status: 'posted', reverses: '4',
      lines: [
        { id: '10', journalEntryId: '3', accountCode: '5111', accountName: 'Doanh thu bán hàng hóa', description: 'Đảo — Doanh thu bán hàng', debit: 22990000, credit: 0 },
        { id: '11', journalEntryId: '3', accountCode: '33311', accountName: 'Thuế GTGT đầu ra', description: 'Đảo — Thuế GTGT đầu ra', debit: 1839200, credit: 0 },
        { id: '12', journalEntryId: '3', accountCode: '131', accountName: 'Phải thu của khách hàng', description: 'Đảo — Phải thu từ khách hàng', debit: 0, credit: 24829200 },
      ],
      createdAt: '2026-03-11T09:00:00Z',
    },
    {
      id: '4', entryNumber: 'JE-20260310-0001', invoiceId: '4',
      description: 'Ghi nhận doanh thu hóa đơn HD-20260310-0001',
      entryDate: '2026-03-10', status: 'reversed', reversedBy: '3',
      lines: [
        { id: '7', journalEntryId: '4', accountCode: '131', accountName: 'Phải thu của khách hàng', description: 'Phải thu từ khách hàng', debit: 24829200, credit: 0 },
        { id: '8', journalEntryId: '4', accountCode: '5111', accountName: 'Doanh thu bán hàng hóa', description: 'Doanh thu bán hàng', debit: 0, credit: 22990000 },
        { id: '9', journalEntryId: '4', accountCode: '33311', accountName: 'Thuế GTGT đầu ra', description: 'Thuế GTGT đầu ra', debit: 0, credit: 1839200 },
      ],
      createdAt: '2026-03-10T17:00:00Z',
    },
  ]
}

async function getTrialBalance(): Promise<TrialBalanceRow[]> {
  return [
    { accountCode: '131', accountName: 'Phải thu của khách hàng', totalDebit: 103647600, totalCredit: 24829200, balance: 78818400 },
    { accountCode: '5111', accountName: 'Doanh thu bán hàng hóa', totalDebit: 22990000, totalCredit: 95970000, balance: -72980000 },
    { accountCode: '33311', accountName: 'Thuế GTGT đầu ra', totalDebit: 1839200, totalCredit: 7677600, balance: -5838400 },
  ]
}

export default async function AccountingPage() {
  const [accounts, journalEntries, trialBalance] = await Promise.all([
    getAccounts(),
    getJournalEntries(),
    getTrialBalance(),
  ])
  return (
    <AccountingClient
      accounts={accounts}
      journalEntries={journalEntries}
      trialBalance={trialBalance}
    />
  )
}
