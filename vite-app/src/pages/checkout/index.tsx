import { CheckoutForm } from '@/features/checkout/ui/checkout-form'
import { useAppSelector } from '@/app/store/hooks'
import { selectCartItems } from '@/entities/cart/model/selectors'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button'

export default function CheckoutPage() {
  const items = useAppSelector(selectCartItems)

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <span className="text-6xl">📦</span>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Không có sản phẩm để thanh toán
        </h2>
        <Link to="/">
          <Button className="mt-6">Quay về trang chủ</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold dark:text-white">Thanh toán</h1>
      <CheckoutForm />
    </div>
  )
}
