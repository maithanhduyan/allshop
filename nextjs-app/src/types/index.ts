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
