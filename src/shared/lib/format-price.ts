import { CURRENCY } from '@/shared/config/constants'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
  }).format(price)
}
