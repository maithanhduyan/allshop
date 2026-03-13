'use client'

import { useState, useMemo } from 'react'
import { formatPrice } from '@/lib/format-price'
import { CATEGORIES } from '@/lib/constants'
import type { Product } from '@/types'

interface Props {
  products: Product[]
}

export function ProductsClient({ products }: Props) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !categoryFilter || p.category === categoryFilter
      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'low' && p.stock > 0 && p.stock < 10) ||
        (stockFilter === 'out' && p.stock === 0)
      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, search, categoryFilter, stockFilter])

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sản phẩm</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý {products.length} sản phẩm trong cửa hàng
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-primary-600 hover:to-primary-700 hover:shadow-md"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="">Tất cả danh mục</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>

        {/* Stock filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as 'all' | 'low' | 'out')}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="all">Tất cả tồn kho</option>
          <option value="low">Sắp hết ({products.filter((p) => p.stock > 0 && p.stock < 10).length})</option>
          <option value="out">Hết hàng ({products.filter((p) => p.stock === 0).length})</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
                <th className="px-6 py-3">Sản phẩm</th>
                <th className="px-6 py-3">Danh mục</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Tồn kho</th>
                <th className="px-6 py-3">Đánh giá</th>
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="h-12 w-12 object-cover" />
                          ) : (
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75Z" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900 dark:text-white">{product.name}</p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{product.brand} · ID: {product.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {CATEGORIES.find((c) => c.id === product.category)?.emoji}{' '}
                        {CATEGORIES.find((c) => c.id === product.category)?.name || product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          product.stock === 0
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : product.stock < 10
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}
                      >
                        {product.stock === 0 ? 'Hết hàng' : product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                          title="Chỉnh sửa"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                          title="Xóa"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filtered.length} / {products.length} sản phẩm
          </p>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

function ProductFormModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const isEditing = !!product
  const [name, setName] = useState(product?.name || '')
  const [price, setPrice] = useState(product?.price?.toString() || '')
  const [category, setCategory] = useState(product?.category || '')
  const [brand, setBrand] = useState(product?.brand || '')
  const [stock, setStock] = useState(product?.stock?.toString() || '')
  const [description, setDescription] = useState(product?.description || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tên sản phẩm</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Giá (VNĐ)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tồn kho</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Danh mục</label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Chọn danh mục</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Thương hiệu</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Nhập thương hiệu"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Mô tả sản phẩm..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:from-primary-600 hover:to-primary-700"
            >
              {isEditing ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
