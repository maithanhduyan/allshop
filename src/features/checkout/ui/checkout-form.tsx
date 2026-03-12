import { useState, type FormEvent } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useAppSelector } from '@/app/store/hooks'
import { selectCartItems, selectCartTotal } from '@/entities/cart/model/selectors'
import { formatPrice } from '@/shared/lib/format-price'

export function CheckoutForm() {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  })
  const [loading, setLoading] = useState(false)

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: API call to create order
    console.log('Order:', { ...form, items, total })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold dark:text-white">Thông tin giao hàng</h2>
      <Input
        label="Họ tên"
        value={form.name}
        onChange={(e) => updateField('name', e.target.value)}
        required
      />
      <Input
        label="Số điện thoại"
        type="tel"
        value={form.phone}
        onChange={(e) => updateField('phone', e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        required
      />
      <Input
        label="Địa chỉ giao hàng"
        value={form.address}
        onChange={(e) => updateField('address', e.target.value)}
        required
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú</label>
        <textarea
          className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-800"
          rows={3}
          value={form.note}
          onChange={(e) => updateField('note', e.target.value)}
          placeholder="Ghi chú cho đơn hàng..."
        />
      </div>
      <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
        <div className="flex justify-between text-lg font-bold">
          <span>Tổng cộng:</span>
          <span className="text-red-600">{formatPrice(total)}</span>
        </div>
      </div>
      <Button type="submit" disabled={loading || items.length === 0} size="lg">
        {loading ? 'Đang xử lý...' : 'Đặt hàng'}
      </Button>
    </form>
  )
}
