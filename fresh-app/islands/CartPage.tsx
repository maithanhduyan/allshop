import {
  cartItems,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../utils/cart.ts";
import { formatPrice } from "../utils/format-price.ts";

export default function CartPage() {
  const items = cartItems.value;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span class="text-6xl">🛒</span>
        <h2 class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Giỏ hàng trống
        </h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
        </p>
        <a
          href="/"
          class="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <div class="mx-auto max-w-7xl px-4 py-6">
      <h1 class="mb-6 text-2xl font-bold dark:text-white">
        Giỏ hàng ({items.length} sản phẩm)
      </h1>

      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.productId}
                class="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
              >
                <div class="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex flex-1 flex-col">
                  <h3 class="font-medium text-gray-800 dark:text-gray-200">
                    {item.name}
                  </h3>
                  <p class="mt-1 text-sm font-bold text-red-600">
                    {formatPrice(item.price)}
                  </p>
                  <div class="mt-auto flex items-center justify-between">
                    <div class="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            item.quantity - 1,
                          )}
                        class="px-2.5 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        −
                      </button>
                      <span class="min-w-[2rem] text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            item.quantity + 1,
                          )}
                        class="px-2.5 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      class="text-sm text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => clearCart()}
            class="mt-4 text-sm text-red-500 hover:text-red-700"
          >
            Xóa tất cả
          </button>
        </div>

        <div class="h-fit rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 class="text-lg font-semibold dark:text-white">
            Tóm tắt đơn hàng
          </h2>
          <div class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Tạm tính</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">
                Phí vận chuyển
              </span>
              <span class="text-green-600">Miễn phí</span>
            </div>
          </div>
          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <div class="flex justify-between text-lg font-bold dark:text-white">
              <span>Tổng cộng</span>
              <span class="text-red-600">{formatPrice(total)}</span>
            </div>
          </div>
          <a
            href="/checkout"
            class="mt-6 block w-full rounded-xl bg-primary-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Tiến hành thanh toán
          </a>
        </div>
      </div>
    </div>
  );
}
