import { useQuery } from '@tanstack/react-query'
import { productApi } from '../api/product.api'
import type { ProductListParams } from '../model/types'

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getAll(params),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  })
}
