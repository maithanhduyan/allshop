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
