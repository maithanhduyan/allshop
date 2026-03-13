import { API_BASE_URL } from '@/lib/constants'
import type { Product, DashboardSummary } from '@/types'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { DashboardClient } from './dashboard-client'

export const metadata = {
  title: 'Admin Dashboard — AllShop',
}

interface Order {
  id: string
  userId: string
  items: { productId: string; name: string; image: string; price: number; quantity: number }[]
  total: number
  status: string
  name: string
  phone: string
  address: string
  note?: string
  createdAt: string
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return Array.isArray(data) ? data : data.products ?? []
  } catch {
    return MOCK_PRODUCTS
  }
}

async function getOrders(): Promise<Order[]> {
  // Orders require auth — return demo data for now
  return [
    { id: 'ORD-001', userId: '1', items: [{ productId: '1', name: 'Áo thun Premium', image: '', price: 299000, quantity: 2 }], total: 598000, status: 'pending', name: 'Nguyễn Văn A', phone: '0901234567', address: 'TP.HCM', createdAt: '2026-03-13T08:00:00Z' },
    { id: 'ORD-002', userId: '2', items: [{ productId: '2', name: 'iPhone 15 Pro Max', image: '', price: 29990000, quantity: 1 }], total: 29990000, status: 'confirmed', name: 'Trần Thị B', phone: '0987654321', address: 'Hà Nội', createdAt: '2026-03-12T14:30:00Z' },
    { id: 'ORD-003', userId: '3', items: [{ productId: '3', name: 'MacBook Pro M3', image: '', price: 42990000, quantity: 1 }], total: 42990000, status: 'shipping', name: 'Lê Văn C', phone: '0912345678', address: 'Đà Nẵng', createdAt: '2026-03-11T10:15:00Z' },
    { id: 'ORD-004', userId: '4', items: [{ productId: '4', name: 'Samsung Galaxy S24', image: '', price: 22990000, quantity: 1 }], total: 22990000, status: 'delivered', name: 'Phạm Thị D', phone: '0923456789', address: 'Cần Thơ', createdAt: '2026-03-10T16:45:00Z' },
    { id: 'ORD-005', userId: '5', items: [{ productId: '5', name: 'Tai nghe Sony WH-1000XM5', image: '', price: 7490000, quantity: 1 }], total: 7490000, status: 'delivered', name: 'Hoàng Văn E', phone: '0934567890', address: 'Huế', createdAt: '2026-03-09T09:20:00Z' },
    { id: 'ORD-006', userId: '1', items: [{ productId: '6', name: 'Bộ dụng cụ Bosch', image: '', price: 1890000, quantity: 1 }], total: 1890000, status: 'cancelled', name: 'Nguyễn Văn A', phone: '0901234567', address: 'TP.HCM', createdAt: '2026-03-08T12:00:00Z' },
  ]
}

async function getAccountingSummary(): Promise<DashboardSummary> {
  return {
    invoices: { total: 6, issued: 5, cancelled: 1, revenue: 128455200, tax: 9515200 },
    journalEntries: { total: 6, posted: 5, reversed: 1 },
    accounting: { totalDebit: 128486800, totalCredit: 128486800, isBalanced: true, totalAccounts: 20 },
    orders: { total: 6, revenue: 105958000 },
  }
}

export default async function AdminDashboard() {
  const [products, orders, accountingSummary] = await Promise.all([getProducts(), getOrders(), getAccountingSummary()])

  const totalRevenue = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalCustomers = new Set(orders.map((o) => o.userId)).size
  const lowStockProducts = products.filter((p) => p.stock < 10)

  const categoryBreakdown = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return (
    <DashboardClient
      totalRevenue={totalRevenue}
      totalOrders={totalOrders}
      totalProducts={totalProducts}
      totalCustomers={totalCustomers}
      lowStockProducts={lowStockProducts}
      categoryBreakdown={categoryBreakdown}
      statusCounts={statusCounts}
      recentOrders={orders.slice(0, 5)}
      topProducts={products.slice(0, 5)}
      accountingSummary={accountingSummary}
    />
  )
}
