import { useParams } from 'react-router-dom'
import { useProduct } from '@/entities/product/model/hooks'
import { AddToCartBtn } from '@/features/add-to-cart/ui/add-to-cart-btn'
import { formatPrice } from '@/shared/lib/format-price'
import { Spinner } from '@/shared/ui/spinner'
import type { Product } from '@/entities/product/model/types'

// Mock product cho demo
const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Áo thun nam cổ tròn Premium Cotton',
  slug: 'ao-thun-nam-co-tron',
  description:
    'Áo thun nam chất liệu 100% cotton cao cấp, mềm mại, thoáng mát. Form áo regular fit phù hợp mọi dáng người. Thiết kế đơn giản, dễ phối đồ cho mọi dịp.',
  price: 199000,
  originalPrice: 350000,
  images: [
    'https://picsum.photos/seed/fashion1/600/600',
    'https://picsum.photos/seed/fashion1b/600/600',
    'https://picsum.photos/seed/fashion1c/600/600',
  ],
  category: 'fashion',
  brand: 'AllShop Basic',
  rating: 4.5,
  reviewCount: 128,
  stock: 50,
  specifications: {
    'Chất liệu': '100% Cotton',
    'Xuất xứ': 'Việt Nam',
    'Kiểu dáng': 'Regular Fit',
    'Bảo quản': 'Giặt máy ở 30°C',
  },
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading } = useProduct(id || '')

  // Dùng mock khi chưa có API
  const item = product ?? MOCK_PRODUCT

  if (isLoading && !product) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 dark:text-gray-200">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
            <img
              src={item.images[0]}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-2">
            {item.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${item.name} ${i + 1}`}
                className="h-20 w-20 cursor-pointer rounded-lg border-2 border-transparent object-cover hover:border-primary-500"
              />
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

          <div className="mt-6">
            <AddToCartBtn product={item} />
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
