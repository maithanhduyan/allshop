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
