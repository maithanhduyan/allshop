'use client'

import Image from 'next/image'
import { useState } from 'react'
import { formatPrice } from '@/lib/format-price'
import { useAppDispatch } from '@/store/hooks'
import { addItem } from '@/store/cart-slice'
import type { Product } from '@/types'

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const dispatch = useAppDispatch()

  const item = product
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.images[0],
        quantity,
        stock: item.stock,
      })
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 dark:text-gray-200">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 flex gap-2">
            {item.images.map((img, i) => (
              <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-transparent hover:border-primary-500">
                <Image
                  src={img}
                  alt={`${item.name} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="cursor-pointer object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</span>
          <h1 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">{item.name}</h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-sm text-gray-500">
              {item.rating} ({item.reviewCount} đánh giá)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-red-600">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-400">{item.description}</p>

          <div className="mt-4">
            {item.stock > 0 ? (
              <span className="text-sm text-green-600">
                ✓ Còn hàng ({item.stock} sản phẩm)
              </span>
            ) : (
              <span className="text-sm text-red-500">✗ Hết hàng</span>
            )}
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                −
              </button>
              <span className="min-w-[3rem] text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(item.stock, q + 1))}
                className="px-3 py-2 text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={item.stock === 0}
              className="flex-1 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
            >
              {added ? '✓ Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
            </button>
          </div>

          {/* Specifications */}
          {item.specifications && (
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold dark:text-white">Thông số kỹ thuật</h2>
              <table className="w-full">
                <tbody>
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 text-sm text-gray-500 dark:text-gray-400">{key}</td>
                      <td className="py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
