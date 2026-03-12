import { CATEGORIES } from "../utils/constants.ts";
import { MOCK_PRODUCTS } from "../utils/mock-data.ts";
import { formatPrice } from "../utils/format-price.ts";
import ProductGrid from "../components/ProductGrid.tsx";

export default function HomePage() {
  const flashSaleProducts = MOCK_PRODUCTS.filter((p) => p.originalPrice).slice(
    0,
    4,
  );

  return (
    <div class="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div class="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-7xl px-4 py-10 md:py-16 lg:py-20">
          <div class="grid items-center gap-8 lg:grid-cols-2">
            <div class="animate-fade-in-up">
              <span class="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                🔥 Flash Sale — Giảm đến 50%
              </span>
              <h1 class="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Mua sắm thông minh
                <br />
                <span class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Giá không thể tốt hơn
                </span>
              </h1>
              <p class="mt-4 max-w-lg text-sm leading-relaxed text-blue-100/90 md:text-base">
                Hàng triệu sản phẩm thời trang, điện máy, laptop, điện thoại
                chính hãng. Giao hàng nhanh 2h nội thành. Đổi trả 30 ngày.
              </p>
              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  href="/?category=phones"
                  class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Khám phá ngay
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width={2.5}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
                <a
                  href="/?category=fashion"
                  class="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Thời trang mới
                </a>
              </div>
            </div>

            {/* Hero visual — stat cards */}
            <div class="hidden animate-fade-in lg:grid lg:grid-cols-2 lg:gap-4">
              {[
                {
                  value: "10M+",
                  label: "Khách hàng tin tưởng",
                  icon: "👥",
                },
                {
                  value: "500K+",
                  label: "Sản phẩm chính hãng",
                  icon: "📦",
                },
                {
                  value: "2h",
                  label: "Giao nhanh nội thành",
                  icon: "🚀",
                },
                {
                  value: "30 ngày",
                  label: "Đổi trả miễn phí",
                  icon: "🔄",
                },
              ].map((stat) => (
                <div class="rounded-2xl bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/15">
                  <span class="text-2xl">{stat.icon}</span>
                  <p class="mt-2 text-2xl font-extrabold text-white">
                    {stat.value}
                  </p>
                  <p class="text-sm text-blue-100/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section class="mx-auto max-w-7xl px-4 py-8">
        <div class="mb-5 flex items-center gap-3">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            Danh mục nổi bật
          </h2>
          <div class="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <a
              href={`/?category=${cat.id}`}
              class="group flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900 dark:shadow-gray-900/50"
            >
              <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl transition-transform group-hover:scale-110 dark:bg-primary-900/30">
                {cat.icon}
              </span>
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-300 sm:text-sm">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <section class="mx-auto max-w-7xl px-4 pb-8">
        <div class="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-4 md:p-6">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">⚡</span>
              <h2 class="text-lg font-extrabold text-white md:text-xl">
                Flash Sale
              </h2>
              <div class="ml-2 flex gap-1">
                {["02", "15", "30"].map((t) => (
                  <span class="rounded-md bg-black/20 px-2 py-1 text-xs font-bold tabular-nums text-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="/"
              class="text-sm font-semibold text-white/80 hover:text-white"
            >
              Xem tất cả →
            </a>
          </div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <a
                href={`/product/${product.id}`}
                class="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
              >
                <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span class="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    -
                    {Math.round(
                      ((product.originalPrice! - product.price) /
                        product.originalPrice!) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <div class="p-2.5">
                  <p class="line-clamp-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                    {product.name}
                  </p>
                  <p class="mt-1 text-sm font-bold text-red-600">
                    {formatPrice(product.price)}
                  </p>
                  <div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                      style={{
                        width: `${
                          Math.min(90, product.reviewCount / 6 + 30)
                        }%`,
                      }}
                    />
                  </div>
                  <p class="mt-1 text-[10px] text-gray-400">
                    Đã bán {product.reviewCount}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT GRID ===== */}
      <section class="mx-auto max-w-7xl px-4 pb-12">
        <div class="mb-5 flex items-center gap-3">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white md:text-xl">
            Gợi ý hôm nay
          </h2>
          <div class="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>
        <ProductGrid products={MOCK_PRODUCTS} />
      </section>
    </div>
  );
}
