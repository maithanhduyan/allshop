import { CustomersClient } from './customers-client'

export const metadata = {
  title: 'Quản lý khách hàng — AllShop Admin',
}

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

async function getCustomers(): Promise<Customer[]> {
  // Demo data — in production, this would call an admin API
  return [
    { id: '1', name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', phone: '0901234567', ordersCount: 5, totalSpent: 12500000, createdAt: '2026-01-15T08:00:00Z' },
    { id: '2', name: 'Trần Thị Bình', email: 'binh.tran@gmail.com', phone: '0987654321', ordersCount: 3, totalSpent: 45670000, createdAt: '2026-01-20T10:30:00Z' },
    { id: '3', name: 'Lê Văn Cường', email: 'cuong.le@yahoo.com', phone: '0912345678', ordersCount: 8, totalSpent: 89200000, createdAt: '2025-12-05T14:00:00Z' },
    { id: '4', name: 'Phạm Thị Dung', email: 'dung.pham@outlook.com', phone: '0923456789', ordersCount: 2, totalSpent: 25890000, createdAt: '2026-02-10T09:15:00Z' },
    { id: '5', name: 'Hoàng Văn Em', email: 'em.hoang@gmail.com', phone: '0934567890', ordersCount: 1, totalSpent: 7490000, createdAt: '2026-03-01T11:45:00Z' },
    { id: '6', name: 'Vũ Thị Giang', email: 'giang.vu@gmail.com', phone: '0945678901', ordersCount: 4, totalSpent: 56780000, createdAt: '2026-01-08T16:20:00Z' },
    { id: '7', name: 'Đặng Văn Hùng', email: 'hung.dang@hotmail.com', phone: '0956789012', ordersCount: 6, totalSpent: 78350000, createdAt: '2025-11-25T08:30:00Z' },
    { id: '8', name: 'Bùi Thị Iris', email: 'iris.bui@gmail.com', phone: '0967890123', ordersCount: 2, totalSpent: 15670000, createdAt: '2026-02-28T13:00:00Z' },
    { id: '9', name: 'Cao Văn Khoa', email: 'khoa.cao@gmail.com', ordersCount: 0, totalSpent: 0, createdAt: '2026-03-10T17:00:00Z' },
    { id: '10', name: 'Ngô Thị Lan', email: 'lan.ngo@outlook.com', phone: '0978901234', ordersCount: 7, totalSpent: 102340000, createdAt: '2025-10-12T10:00:00Z' },
  ]
}

export default async function CustomersPage() {
  const customers = await getCustomers()
  return <CustomersClient customers={customers} />
}
