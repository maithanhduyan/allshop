import ProductCard from "./ProductCard.tsx";
import type { Product } from "../utils/types.ts";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div class="flex h-64 flex-col items-center justify-center text-gray-400 dark:text-gray-500">
        <span class="text-4xl">🔍</span>
        <p class="mt-2 text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
