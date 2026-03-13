import { InvoicesClient } from './invoices-client'

export const metadata = {
  title: 'Quản lý hóa đơn — AllShop Admin',
}

interface InvoiceItem {
  id: string
  productName: string
  unit: string
  quantity: number
  unitPrice: number
  taxAmount: number
  totalAmount: number
}

interface Invoice {
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
  status: string
  items: InvoiceItem[]
  issuedAt?: string
  cancelledAt?: string
  createdAt: string
}

async function getInvoices(): Promise<Invoice[]> {
  // Demo data — in production, this would call the API with admin auth
  return [
    {
      id: '1', invoiceNumber: 'HD-20260313-0001', orderId: '2', userId: '2',
      sellerName: 'Công ty TNHH AllShop Việt Nam', sellerTaxCode: '0123456789', sellerAddress: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
      buyerName: 'Trần Thị Bình', buyerTaxCode: '9876543210', buyerAddress: '456 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội', buyerEmail: 'binh@example.com',
      subtotal: 29990000, taxRate: 0.08, taxAmount: 2399200, totalAmount: 32389200, status: 'issued',
      items: [{ id: '1', productName: 'iPhone 15 Pro Max 256GB', unit: 'Cái', quantity: 1, unitPrice: 29990000, taxAmount: 2399200, totalAmount: 32389200 }],
      issuedAt: '2026-03-12T15:00:00Z', createdAt: '2026-03-12T14:45:00Z',
    },
    {
      id: '2', invoiceNumber: 'HD-20260311-0001', orderId: '3', userId: '3',
      sellerName: 'Công ty TNHH AllShop Việt Nam', sellerTaxCode: '0123456789', sellerAddress: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
      buyerName: 'Lê Văn Cường', buyerAddress: '789 Trần Phú, Hải Châu, Đà Nẵng', buyerEmail: 'cuong@example.com',
      subtotal: 42990000, taxRate: 0.08, taxAmount: 3439200, totalAmount: 46429200, status: 'issued',
      items: [{ id: '2', productName: 'MacBook Pro M3 14 inch', unit: 'Cái', quantity: 1, unitPrice: 42990000, taxAmount: 3439200, totalAmount: 46429200 }],
      issuedAt: '2026-03-11T11:00:00Z', createdAt: '2026-03-11T10:30:00Z',
    },
    {
      id: '3', invoiceNumber: 'HD-20260313-0002', orderId: '7', userId: '6',
      sellerName: 'Công ty TNHH AllShop Việt Nam', sellerTaxCode: '0123456789', sellerAddress: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
      buyerName: 'Vũ Thị Giang', buyerAddress: '890 Hai Bà Trưng, Q.3, TP.HCM', buyerEmail: 'giang@example.com',
      subtotal: 38480000, taxRate: 0.08, taxAmount: 3078400, totalAmount: 41558400, status: 'draft',
      items: [
        { id: '3', productName: 'Dell XPS 15', unit: 'Cái', quantity: 1, unitPrice: 35990000, taxAmount: 2879200, totalAmount: 38869200 },
        { id: '4', productName: 'Chuột Logitech MX Master 3S', unit: 'Cái', quantity: 1, unitPrice: 2490000, taxAmount: 199200, totalAmount: 2689200 },
      ],
      createdAt: '2026-03-13T08:00:00Z',
    },
    {
      id: '4', invoiceNumber: 'HD-20260310-0001', orderId: '4', userId: '4',
      sellerName: 'Công ty TNHH AllShop Việt Nam', sellerTaxCode: '0123456789', sellerAddress: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
      buyerName: 'Phạm Thị Dung', buyerTaxCode: '1122334455', buyerAddress: '321 Nguyễn Trãi, Ninh Kiều, Cần Thơ', buyerEmail: 'dung@example.com',
      subtotal: 22990000, taxRate: 0.08, taxAmount: 1839200, totalAmount: 24829200, status: 'cancelled',
      items: [{ id: '5', productName: 'Samsung Galaxy S24 Ultra', unit: 'Cái', quantity: 1, unitPrice: 22990000, taxAmount: 1839200, totalAmount: 24829200 }],
      cancelledAt: '2026-03-11T09:00:00Z', createdAt: '2026-03-10T17:00:00Z',
    },
  ]
}

export default async function AdminInvoicesPage() {
  const invoices = await getInvoices()
  return <InvoicesClient invoices={invoices} />
}
