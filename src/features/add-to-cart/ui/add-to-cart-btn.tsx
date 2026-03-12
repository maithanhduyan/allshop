import { useAppDispatch } from '@/app/store/hooks'
import { addItem } from '@/entities/cart/model/cart.slice'
import { Button } from '@/shared/ui/button'
import type { Product } from '@/entities/product/model/types'

interface AddToCartBtnProps {
  product: Product
}

export function AddToCartBtn({ product }: AddToCartBtnProps) {
  const dispatch = useAppDispatch()

  const handleAdd = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity: 1,
        stock: product.stock,
      })
    )
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full"
    >
      {product.stock === 0 ? 'Hết hàng' : '🛒 Thêm vào giỏ'}
    </Button>
  )
}
