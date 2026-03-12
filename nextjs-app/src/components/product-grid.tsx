import { ProductCard } from '@/components/product-card'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-gray-400 dark:text-gray-500">
        <span className="text-4xl">🔍</span>
        <p className="mt-2 text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
