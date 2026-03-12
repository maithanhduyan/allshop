import { useAppSelector, useAppDispatch } from '@/app/store/hooks'
import { selectCartItems, selectCartTotal } from '@/entities/cart/model/selectors'
import { removeItem, updateQuantity, clearCart } from '@/entities/cart/model/cart.slice'
import { CartItemCard } from '@/entities/cart/ui/cart-item'
import { formatPrice } from '@/shared/lib/format-price'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
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
        <Link to="/">
          <Button className="mt-6">Tiếp tục mua sắm</Button>
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
              <CartItemCard
                key={item.productId}
                item={item}
                onQuantityChange={(qty) =>
                  dispatch(
                    updateQuantity({ productId: item.productId, quantity: qty })
                  )
                }
                onRemove={() => dispatch(removeItem(item.productId))}
              />
            ))}
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 text-sm text-red-500 hover:text-red-700"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 h-fit dark:border-gray-700 dark:bg-gray-900">
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
          <Link to="/checkout" className="mt-6 block">
            <Button className="w-full" size="lg">
              Tiến hành thanh toán
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
