import { api } from '@/shared/api/axios'
import type { Product, ProductListParams, ProductListResponse } from '../model/types'

export const productApi = {
  getAll: async (params?: ProductListParams): Promise<ProductListResponse> => {
    const res = await api.get('/products', { params })
    return res.data
  },

  getById: async (id: string): Promise<Product> => {
    const res = await api.get(`/products/${encodeURIComponent(id)}`)
    return res.data
  },

  getByCategory: async (category: string, params?: ProductListParams): Promise<ProductListResponse> => {
    const res = await api.get(`/products/category/${encodeURIComponent(category)}`, { params })
    return res.data
  },

  search: async (query: string, params?: ProductListParams): Promise<ProductListResponse> => {
    const res = await api.get('/products/search', { params: { q: query, ...params } })
    return res.data
  },
}
