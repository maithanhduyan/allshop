import { formatPrice } from '@/shared/lib/format-price'
import type { Product } from '../model/types'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-lg font-bold text-white">Hết hàng</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="text-yellow-400">★</span>
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  )
}
