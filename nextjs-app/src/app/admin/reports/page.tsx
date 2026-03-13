import { ReportsClient } from './reports-client'
import type { RevenueReport, TaxReport, AccountBalanceReport } from '@/types'

export const metadata = {
  title: 'Báo cáo — AllShop Admin',
}

const today = new Date()
const from30 = new Date(today)
from30.setDate(from30.getDate() - 30)
const fmtDate = (d: Date) => d.toISOString().slice(0, 10)

async function getRevenueReport(): Promise<RevenueReport> {
  return {
    from: fmtDate(from30),
    to: fmtDate(today),
    days: [
      { date: '2026-03-12', invoiceCount: 1, subtotal: 29990000, tax: 2399200, total: 32389200 },
      { date: '2026-03-11', invoiceCount: 1, subtotal: 42990000, tax: 3439200, total: 46429200 },
      { date: '2026-03-10', invoiceCount: 1, subtotal: 22990000, tax: 1839200, total: 24829200 },
      { date: '2026-03-09', invoiceCount: 2, subtotal: 15480000, tax: 1238400, total: 16718400 },
      { date: '2026-03-08', invoiceCount: 1, subtotal: 7490000, tax: 599200, total: 8089200 },
    ],
    totalInvoices: 6,
    totalSubtotal: 118940000,
    totalTax: 9515200,
    totalRevenue: 128455200,
  }
}

async function getTaxReport(): Promise<TaxReport> {
  return {
    from: fmtDate(from30),
    to: fmtDate(today),
    outputTax: 9515200,
    inputTax: 1200000,
    cancelledTax: 1839200,
    netTaxPayable: 6476000,
  }
}

async function getAccountBalanceReport(): Promise<AccountBalanceReport> {
  return {
    from: fmtDate(from30),
    to: fmtDate(today),
    accounts: [
      { accountCode: '111', accountName: 'Tiền mặt', openingDebit: 50000000, openingCredit: 0, periodDebit: 128455200, periodCredit: 95000000, closingDebit: 83455200, closingCredit: 0 },
      { accountCode: '112', accountName: 'Tiền gửi ngân hàng', openingDebit: 200000000, openingCredit: 0, periodDebit: 0, periodCredit: 0, closingDebit: 200000000, closingCredit: 0 },
      { accountCode: '131', accountName: 'Phải thu của khách hàng', openingDebit: 0, openingCredit: 0, periodDebit: 103647600, periodCredit: 24829200, closingDebit: 78818400, closingCredit: 0 },
      { accountCode: '1331', accountName: 'Thuế GTGT được khấu trừ', openingDebit: 500000, openingCredit: 0, periodDebit: 1200000, periodCredit: 0, closingDebit: 1700000, closingCredit: 0 },
      { accountCode: '156', accountName: 'Hàng hóa', openingDebit: 80000000, openingCredit: 0, periodDebit: 25000000, periodCredit: 60000000, closingDebit: 45000000, closingCredit: 0 },
      { accountCode: '331', accountName: 'Phải trả cho người bán', openingDebit: 0, openingCredit: 30000000, periodDebit: 30000000, periodCredit: 25000000, closingDebit: 0, closingCredit: 25000000 },
      { accountCode: '33311', accountName: 'Thuế GTGT đầu ra', openingDebit: 0, openingCredit: 0, periodDebit: 1839200, periodCredit: 7677600, closingDebit: 0, closingCredit: 5838400 },
      { accountCode: '411', accountName: 'Vốn đầu tư của chủ sở hữu', openingDebit: 0, openingCredit: 300000000, periodDebit: 0, periodCredit: 0, closingDebit: 0, closingCredit: 300000000 },
      { accountCode: '5111', accountName: 'Doanh thu bán hàng hóa', openingDebit: 0, openingCredit: 0, periodDebit: 22990000, periodCredit: 95970000, closingDebit: 0, closingCredit: 72980000 },
      { accountCode: '632', accountName: 'Giá vốn hàng bán', openingDebit: 0, openingCredit: 0, periodDebit: 60000000, periodCredit: 0, closingDebit: 60000000, closingCredit: 0 },
    ],
  }
}

export default async function ReportsPage() {
  const [revenue, tax, accountBalance] = await Promise.all([
    getRevenueReport(),
    getTaxReport(),
    getAccountBalanceReport(),
  ])
  return <ReportsClient revenue={revenue} tax={tax} accountBalance={accountBalance} />
}
