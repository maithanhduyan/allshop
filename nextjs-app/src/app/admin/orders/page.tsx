import { OrdersClient } from './orders-client'

export const metadata = {
  title: 'Quản lý đơn hàng — AllShop Admin',
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

async function getOrders(): Promise<Order[]> {
  // Demo data — in production, this would call the API with admin auth
  return [
    { id: 'ORD-001', userId: '1', items: [{ productId: '1', name: 'Áo thun Premium Cotton', image: '', price: 299000, quantity: 2 }], total: 598000, status: 'pending', name: 'Nguyễn Văn An', phone: '0901234567', address: '123 Nguyễn Huệ, Q.1, TP.HCM', note: 'Giao giờ hành chính', createdAt: '2026-03-13T08:00:00Z' },
    { id: 'ORD-002', userId: '2', items: [{ productId: '2', name: 'iPhone 15 Pro Max 256GB', image: '', price: 29990000, quantity: 1 }], total: 29990000, status: 'confirmed', name: 'Trần Thị Bình', phone: '0987654321', address: '456 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội', createdAt: '2026-03-12T14:30:00Z' },
    { id: 'ORD-003', userId: '3', items: [{ productId: '3', name: 'MacBook Pro M3 14 inch', image: '', price: 42990000, quantity: 1 }], total: 42990000, status: 'shipping', name: 'Lê Văn Cường', phone: '0912345678', address: '789 Trần Phú, Hải Châu, Đà Nẵng', createdAt: '2026-03-11T10:15:00Z' },
    { id: 'ORD-004', userId: '4', items: [{ productId: '4', name: 'Samsung Galaxy S24 Ultra', image: '', price: 22990000, quantity: 1 }], total: 22990000, status: 'delivered', name: 'Phạm Thị Dung', phone: '0923456789', address: '321 Nguyễn Trãi, Ninh Kiều, Cần Thơ', createdAt: '2026-03-10T16:45:00Z' },
    { id: 'ORD-005', userId: '5', items: [{ productId: '5', name: 'Tai nghe Sony WH-1000XM5', image: '', price: 7490000, quantity: 1 }], total: 7490000, status: 'delivered', name: 'Hoàng Văn Em', phone: '0934567890', address: '567 Lê Lợi, TP Huế', createdAt: '2026-03-09T09:20:00Z' },
    { id: 'ORD-006', userId: '1', items: [{ productId: '6', name: 'Bộ dụng cụ Bosch 108 chi tiết', image: '', price: 1890000, quantity: 1 }], total: 1890000, status: 'cancelled', name: 'Nguyễn Văn An', phone: '0901234567', address: '123 Nguyễn Huệ, Q.1, TP.HCM', note: 'Đổi ý không mua nữa', createdAt: '2026-03-08T12:00:00Z' },
    { id: 'ORD-007', userId: '6', items: [{ productId: '7', name: 'Dell XPS 15', image: '', price: 35990000, quantity: 1 }, { productId: '8', name: 'Chuột Logitech MX Master 3S', image: '', price: 2490000, quantity: 1 }], total: 38480000, status: 'confirmed', name: 'Vũ Thị Giang', phone: '0945678901', address: '890 Hai Bà Trưng, Q.3, TP.HCM', createdAt: '2026-03-12T18:00:00Z' },
    { id: 'ORD-008', userId: '7', items: [{ productId: '9', name: 'iPad Pro M2 12.9 inch', image: '', price: 28990000, quantity: 1 }], total: 28990000, status: 'pending', name: 'Đặng Văn Hùng', phone: '0956789012', address: '234 Phan Đình Phùng, Ba Đình, Hà Nội', createdAt: '2026-03-13T10:30:00Z' },
  ]
}

export default async function OrdersPage() {
  const orders = await getOrders()
  return <OrdersClient orders={orders} />
}
