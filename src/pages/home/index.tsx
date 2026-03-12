import { ProductFilterBar } from '@/features/product-filter/ui/product-filter-bar'
import { ProductGrid } from '@/widgets/product-grid/ui/product-grid'
import { useAppSelector } from '@/app/store/hooks'
import { selectFilter } from '@/features/product-filter/model/selectors'
import { useProducts } from '@/entities/product/model/hooks'
import { CATEGORIES } from '@/shared/config/constants'
import { Link } from 'react-router-dom'
import type { Product } from '@/entities/product/model/types'

// Mock data cho demo - sẽ thay bằng API thật
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Áo thun nam cổ tròn Premium Cotton',
    slug: 'ao-thun-nam-co-tron',
    description: 'Áo thun nam chất liệu cotton cao cấp',
    price: 199000,
    originalPrice: 350000,
    images: ['https://picsum.photos/seed/fashion1/400/400'],
    category: 'fashion',
    brand: 'AllShop Basic',
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max',
    description: 'Apple iPhone 15 Pro Max chính hãng',
    price: 29990000,
    originalPrice: 34990000,
    images: ['https://picsum.photos/seed/phone1/400/400'],
    category: 'phones',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 542,
    stock: 15,
  },
  {
    id: '3',
    name: 'Laptop Dell XPS 15 Core i7',
    slug: 'dell-xps-15',
    description: 'Laptop Dell XPS 15 inch Core i7 16GB RAM',
    price: 35990000,
    originalPrice: 42990000,
    images: ['https://picsum.photos/seed/laptop1/400/400'],
    category: 'computers',
    brand: 'Dell',
    rating: 4.7,
    reviewCount: 89,
    stock: 8,
  },
  {
    id: '4',
    name: 'Tai nghe Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Tai nghe chống ồn hàng đầu',
    price: 7490000,
    originalPrice: 8990000,
    images: ['https://picsum.photos/seed/accessory1/400/400'],
    category: 'accessories',
    brand: 'Sony',
    rating: 4.9,
    reviewCount: 312,
    stock: 25,
  },
  {
    id: '5',
    name: 'Máy giặt Samsung Inverter 9.5kg',
    slug: 'may-giat-samsung',
    description: 'Máy giặt Samsung công nghệ Inverter',
    price: 8990000,
    originalPrice: 12990000,
    images: ['https://picsum.photos/seed/electronic1/400/400'],
    category: 'electronics',
    brand: 'Samsung',
    rating: 4.6,
    reviewCount: 67,
    stock: 12,
  },
  {
    id: '6',
    name: 'Bộ dụng cụ sửa chữa 120 món',
    slug: 'bo-dung-cu-120',
    description: 'Bộ dụng cụ đa năng 120 chi tiết',
    price: 890000,
    originalPrice: 1290000,
    images: ['https://picsum.photos/seed/tool1/400/400'],
    category: 'tools',
    brand: 'ToolMaster',
    rating: 4.3,
    reviewCount: 45,
    stock: 30,
  },
  {
    id: '7',
    name: 'Quần jean nam Slim Fit',
    slug: 'quan-jean-slim-fit',
    description: 'Quần jean nam form slim fit',
    price: 450000,
    originalPrice: 650000,
    images: ['https://picsum.photos/seed/fashion2/400/400'],
    category: 'fashion',
    brand: 'AllShop Denim',
    rating: 4.4,
    reviewCount: 203,
    stock: 40,
  },
  {
    id: '8',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Samsung Galaxy S24 Ultra 12GB/256GB',
    price: 27990000,
    originalPrice: 33990000,
    images: ['https://picsum.photos/seed/phone2/400/400'],
    category: 'phones',
    brand: 'Samsung',
    rating: 4.7,
    reviewCount: 389,
    stock: 20,
  },
]

export default function HomePage() {
  const filter = useAppSelector(selectFilter)
  const { data, isLoading } = useProducts({
    category: filter.category,
    search: filter.search,
    sortBy: filter.sortBy,
  })

  // Dùng mock data khi chưa có API
  const products = data?.products ?? MOCK_PRODUCTS
  const filteredProducts = filter.category
    ? products.filter((p) => p.category === filter.category)
    : products

  // Featured / flash sale items
  const flashSaleProducts = MOCK_PRODUCTS.filter((p) => p.originalPrice).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-16 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                🔥 Flash Sale — Giảm đến 50%
              </span>
              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Mua sắm thông minh
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Giá không thể tốt hơn
                </span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-blue-100/90 md:text-base">
                Hàng triệu sản phẩm thời trang, điện máy, laptop, điện thoại chính hãng.
                Giao hàng nhanh 2h nội thành. Đổi trả 30 ngày.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/?category=phones"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Khám phá ngay
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/?category=fashion"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Thời trang mới
                </Link>
              </div>
            </div>

            {/* Hero visual — stat cards */}
            <div className="hidden animate-fade-in lg:grid lg:grid-cols-2 lg:gap-4" style={{ animationDelay: '200ms' }}>
              {[
                { value: '10M+', label: 'Khách hàng tin tưởng', icon: '👥' },
                { value: '500K+', label: 'Sản phẩm chính hãng', icon: '📦' },
                { value: '2h', label: 'Giao nhanh nội thành', icon: '🚀' },
                { value: '30 ngày', label: 'Đổi trả miễn phí', icon: '🔄' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/15"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="mt-2 text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-sm text-blue-100/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            Danh mục nổi bật
          </h2>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/?category=${cat.id}`}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900 dark:shadow-gray-900/50"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl transition-transform group-hover:scale-110 dark:bg-primary-900/30">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 sm:text-sm">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="animate-pulse-soft text-2xl">⚡</span>
              <h2 className="text-lg font-extrabold text-white md:text-xl">Flash Sale</h2>
              <div className="ml-2 flex gap-1">
                {['02', '15', '30'].map((t, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-black/20 px-2 py-1 text-xs font-bold tabular-nums text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/" className="text-sm font-semibold text-white/80 hover:text-white">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="line-clamp-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-red-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${Math.random() * 40 + 50}%` }} />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">Đã bán {product.reviewCount}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTER + PRODUCT GRID ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            Gợi ý hôm nay
          </h2>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>
        <ProductFilterBar />
        <div className="mt-6">
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading && !data}
          />
        </div>
      </section>
    </div>
  )
}
