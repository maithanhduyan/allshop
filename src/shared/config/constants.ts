export const APP_NAME = 'AllShop'

export const CATEGORIES = [
  { id: 'fashion', name: 'Thời trang', icon: '👕' },
  { id: 'electronics', name: 'Điện máy', icon: '📺' },
  { id: 'tools', name: 'Công cụ', icon: '🔧' },
  { id: 'computers', name: 'Máy tính', icon: '💻' },
  { id: 'phones', name: 'Điện thoại', icon: '📱' },
  { id: 'accessories', name: 'Phụ kiện', icon: '🎧' },
] as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
} as const

export const CURRENCY = {
  code: 'VND',
  symbol: '₫',
  locale: 'vi-VN',
} as const
