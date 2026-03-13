import { API_BASE_URL } from '@/lib/constants'
import type { Product } from '@/types'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { ProductsClient } from './products-client'

export const metadata = {
  title: 'Quản lý sản phẩm — AllShop Admin',
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

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsClient products={products} />
}
