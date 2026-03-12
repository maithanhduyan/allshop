import { useState } from "preact/hooks";
import { formatPrice } from "../utils/format-price.ts";
import { addToCart } from "../utils/cart.ts";
import type { Product } from "../utils/types.ts";

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      stock: product.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div class="mx-auto max-w-7xl px-4 py-6 dark:text-gray-200">
      <div class="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div>
          <div class="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
            <img
              src={product.images[0]}
              alt={product.name}
              class="h-full w-full object-cover"
            />
          </div>
          <div class="mt-4 flex gap-2">
            {product.images.map((img, i) => (
              <div
                key={i}
                class="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-transparent hover:border-primary-500"
              >
                <img
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  class="h-full w-full cursor-pointer object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {product.brand}
          </span>
          <h1 class="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
            {product.name}
          </h1>

          <div class="mt-2 flex items-center gap-2">
            <span class="text-yellow-400">★★★★★</span>
            <span class="text-sm text-gray-500">
              {product.rating} ({product.reviewCount} đánh giá)
            </span>
          </div>

          <div class="mt-4 flex items-baseline gap-3">
            <span class="text-3xl font-bold text-red-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span class="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span class="rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p class="mt-4 text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          <div class="mt-4">
            {product.stock > 0
              ? (
                <span class="text-sm text-green-600">
                  ✓ Còn hàng ({product.stock} sản phẩm)
                </span>
              )
              : <span class="text-sm text-red-500">✗ Hết hàng</span>}
          </div>

          {/* Quantity + Add to cart */}
          <div class="mt-6 flex items-center gap-4">
            <div class="flex items-center rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                class="px-3 py-2 text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                −
              </button>
              <span class="min-w-[3rem] text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))}
                class="px-3 py-2 text-lg text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              class="flex-1 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
            >
              {added ? "✓ Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
            </button>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div class="mt-8">
              <h2 class="mb-4 text-lg font-semibold dark:text-white">
                Thông số kỹ thuật
              </h2>
              <table class="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <tr class="border-b border-gray-100 dark:border-gray-800">
                        <td class="py-2 text-sm text-gray-500 dark:text-gray-400">
                          {key}
                        </td>
                        <td class="py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                          {value}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
