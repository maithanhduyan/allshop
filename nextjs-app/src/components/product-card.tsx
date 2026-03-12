import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/format-price'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link
      href={`/product/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          {product.name}
        </p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-base font-bold text-red-600">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
          <span className="text-yellow-400">★</span>
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  )
}
