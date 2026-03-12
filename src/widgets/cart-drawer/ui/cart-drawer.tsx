import { useAppSelector, useAppDispatch } from '@/app/store/hooks'
import { selectCartItems, selectCartTotal } from '@/entities/cart/model/selectors'
import { removeItem, updateQuantity } from '@/entities/cart/model/cart.slice'
import { CartItemCard } from '@/entities/cart/ui/cart-item'
import { formatPrice } from '@/shared/lib/format-price'
import { Link } from 'react-router-dom'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform dark:bg-gray-900 dark:shadow-black/40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
          <h2 className="text-lg font-bold dark:text-white">Giỏ hàng ({items.length})</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
              <span className="text-5xl">🛒</span>
              <p className="mt-2">Giỏ hàng trống</p>
            </div>
          ) : (
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
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex justify-between text-lg font-bold dark:text-white">
              <span>Tổng cộng:</span>
              <span className="text-red-600">{formatPrice(total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full rounded-xl bg-primary-600 py-3 text-center font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Thanh toán
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
