import { MOCK_PRODUCTS } from './mock-data'
import { API_BASE_URL } from './constants'
import type { Product } from '@/types'

const FETCH_TIMEOUT_MS = 3000

/** Whether we already know the API is unreachable (avoids repeated slow requests). */
let apiDown = false
let apiDownCheckedAt = 0
const API_RETRY_INTERVAL_MS = 30_000 // re-check every 30 s

function shouldTryApi(): boolean {
  if (!apiDown) return true
  if (Date.now() - apiDownCheckedAt > API_RETRY_INTERVAL_MS) {
    apiDown = false // allow a retry
    return true
  }
  return false
}

function markApiDown() {
  apiDown = true
  apiDownCheckedAt = Date.now()
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    })
    return res
  } finally {
    clearTimeout(timer)
  }
}

// ─── Products ────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  if (!shouldTryApi()) return MOCK_PRODUCTS

  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/products`)
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    const products = Array.isArray(data) ? data : data.products
    if (!Array.isArray(products)) throw new Error('Invalid response: no products array')
    return products as Product[]
  } catch {
    markApiDown()
    console.warn('[api-client] getProducts failed – using mock data')
    return MOCK_PRODUCTS
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!shouldTryApi()) return MOCK_PRODUCTS.find((p) => p.id === id) ?? null

  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/products/${encodeURIComponent(id)}`)
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data: Product = await res.json()
    return data
  } catch {
    markApiDown()
    console.warn(`[api-client] getProductById(${id}) failed – using mock data`)
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!shouldTryApi()) {
    const q = query.toLowerCase()
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }

  try {
    const res = await fetchWithTimeout(
      `${API_BASE_URL}/api/products?search=${encodeURIComponent(query)}`,
    )
    if (!res.ok) throw new Error(`API ${res.status}`)
    return await res.json()
  } catch {
    markApiDown()
    console.warn('[api-client] searchProducts failed – using mock data')
    const q = query.toLowerCase()
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }
}
