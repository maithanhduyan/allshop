export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  stock: number
  specifications?: Record<string, string>
}

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  stock: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

export interface InvoiceItem {
  id: string
  invoiceId: string
  productId: string
  productName: string
  unit: string
  quantity: number
  unitPrice: number
  taxRate: number
  taxAmount: number
  totalAmount: number
}

export interface Invoice {
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
  status: 'draft' | 'issued' | 'cancelled'
  items: InvoiceItem[]
  issuedAt?: string
  cancelledAt?: string
  createdAt: string
}

export interface Account {
  id: string
  code: string
  name: string
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
  parentCode?: string
  level: number
  isActive: boolean
  createdAt: string
}

export interface JournalLine {
  id: string
  journalEntryId: string
  accountCode: string
  accountName: string
  description: string
  debit: number
  credit: number
}

export interface JournalEntry {
  id: string
  entryNumber: string
  invoiceId?: string
  description: string
  entryDate: string
  status: 'posted' | 'reversed'
  reversedBy?: string
  reverses?: string
  lines?: JournalLine[]
  createdAt: string
}

export interface TrialBalanceRow {
  accountCode: string
  accountName: string
  totalDebit: number
  totalCredit: number
  balance: number
}

/* ─────────── Report types (Stage 3) ─────────── */

export interface RevenueDay {
  date: string
  invoiceCount: number
  subtotal: number
  tax: number
  total: number
}

export interface RevenueReport {
  from: string
  to: string
  days: RevenueDay[]
  totalInvoices: number
  totalSubtotal: number
  totalTax: number
  totalRevenue: number
}

export interface TaxReport {
  from: string
  to: string
  outputTax: number
  inputTax: number
  cancelledTax: number
  netTaxPayable: number
}

export interface AccountBalanceRow {
  accountCode: string
  accountName: string
  openingDebit: number
  openingCredit: number
  periodDebit: number
  periodCredit: number
  closingDebit: number
  closingCredit: number
}

export interface AccountBalanceReport {
  from: string
  to: string
  accounts: AccountBalanceRow[]
}

export interface DashboardSummary {
  invoices: {
    total: number
    issued: number
    cancelled: number
    revenue: number
    tax: number
  }
  journalEntries: {
    total: number
    posted: number
    reversed: number
  }
  accounting: {
    totalDebit: number
    totalCredit: number
    isBalanced: boolean
    totalAccounts: number
  }
  orders: {
    total: number
    revenue: number
  }
}
