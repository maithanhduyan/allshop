import { CategoriesClient } from './categories-client'
import { CATEGORIES } from '@/lib/constants'

export const metadata = {
  title: 'Quản lý danh mục — AllShop Admin',
}

export default function CategoriesPage() {
  const categories = CATEGORIES.map((c, i) => ({
    ...c,
    productCount: [12, 8, 5, 10, 7, 6][i] ?? 0,
  }))

  return <CategoriesClient categories={categories} />
}
