export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'

export const CATEGORIES = [
  { id: 'fashion', name: 'Thời trang', emoji: '👕' },
  { id: 'electronics', name: 'Điện máy', emoji: '📺' },
  { id: 'tools', name: 'Công cụ', emoji: '🔧' },
  { id: 'computers', name: 'Máy tính', emoji: '💻' },
  { id: 'phones', name: 'Điện thoại', emoji: '📱' },
  { id: 'accessories', name: 'Phụ kiện', emoji: '🎧' },
] as const
