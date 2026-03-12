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

export interface ProductListParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  minPrice?: number
  maxPrice?: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
}
