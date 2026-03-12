'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeItem, updateQuantity, clearCart } from '@/store/cart-slice'
import { formatPrice } from '@/lib/format-price'

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const dispatch = useAppDispatch()

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span className="text-6xl">🛒</span>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Giỏ hàng trống
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold dark:text-white">Giỏ hàng ({items.length} sản phẩm)</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
                  <p className="mt-1 text-sm font-bold text-red-600">{formatPrice(item.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
                        }
                        className="px-2.5 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                        }
                        className="px-2.5 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(item.productId))}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 text-sm text-red-500 hover:text-red-700"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-lg font-semibold dark:text-white">Tóm tắt đơn hàng</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Tạm tính</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Phí vận chuyển</span>
              <span className="text-green-600">Miễn phí</span>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="flex justify-between text-lg font-bold dark:text-white">
              <span>Tổng cộng</span>
              <span className="text-red-600">{formatPrice(total)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-xl bg-primary-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Tiến hành thanh toán
          </Link>
        </div>
      </div>
    </div>
  )
}
