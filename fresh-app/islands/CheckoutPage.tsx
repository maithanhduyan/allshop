import { useState } from "preact/hooks";
import { cartItems, clearCart } from "../utils/cart.ts";
import { formatPrice } from "../utils/format-price.ts";

export default function CheckoutPage() {
  const items = cartItems.value;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span class="text-6xl">📦</span>
        <h2 class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Không có sản phẩm để thanh toán
        </h2>
        <a
          href="/"
          class="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Quay về trang chủ
        </a>
      </div>
    );
  }

  if (submitted) {
    return (
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span class="text-6xl">🎉</span>
        <h2 class="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Đặt hàng thành công!
        </h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Cảm ơn bạn đã mua sắm tại AllShop. Đơn hàng sẽ được xử lý trong thời
          gian sớm nhất.
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

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  return (
    <div class="mx-auto max-w-2xl px-4 py-6">
      <h1 class="mb-6 text-2xl font-bold dark:text-white">Thanh toán</h1>

      <form onSubmit={handleSubmit} class="space-y-6">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 class="mb-4 text-lg font-semibold dark:text-white">
            Thông tin giao hàng
          </h2>
          <div class="space-y-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Họ và tên
              </label>
              <input
                type="text"
                required
                class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Số điện thoại
              </label>
              <input
                type="tel"
                required
                class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="0901 234 567"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Địa chỉ giao hàng
              </label>
              <textarea
                required
                rows={3}
                class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-800"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
              />
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 class="mb-4 text-lg font-semibold dark:text-white">
            Đơn hàng ({items.length} sản phẩm)
          </h2>
          <div class="space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                class="flex justify-between text-sm"
              >
                <span class="text-gray-600 dark:text-gray-400">
                  {item.name} × {item.quantity}
                </span>
                <span class="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <div class="flex justify-between text-lg font-bold dark:text-white">
              <span>Tổng cộng</span>
              <span class="text-red-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
}
