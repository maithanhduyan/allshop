import { formatPrice } from '@/shared/lib/format-price'
import type { CartItem as CartItemType } from '../model/types'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
          <p className="text-lg font-bold text-red-600">
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium dark:text-gray-200">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}
