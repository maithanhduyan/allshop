import { formatPrice } from "../utils/format-price.ts";
import type { Product } from "../utils/types.ts";

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <a
      href={`/product/${product.id}`}
      class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.name}
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {discount > 0 && (
          <span class="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>
      <div class="p-3">
        <p class="line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          {product.name}
        </p>
        <div class="mt-1.5 flex items-baseline gap-2">
          <span class="text-base font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span class="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div class="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
          <span class="text-yellow-400">★</span>
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
      </div>
    </a>
  );
}
