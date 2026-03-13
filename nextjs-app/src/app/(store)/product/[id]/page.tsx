import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/api-client'
import type { Product } from '@/types'
import ProductDetailClient from './product-detail-client'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
