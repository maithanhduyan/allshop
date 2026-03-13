'use client'

import { useState } from 'react'

interface Category {
  id: string
  name: string
  emoji: string
  productCount: number
}

interface Props {
  categories: Category[]
}

export function CategoriesClient({ categories }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleAdd = () => {
    setEditingCategory(null)
    setShowForm(true)
  }

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Danh mục</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý {categories.length} danh mục sản phẩm
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-primary-600 hover:to-primary-700 hover:shadow-md"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Thêm danh mục
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl dark:bg-gray-800">
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cat.productCount} sản phẩm
                  </p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(cat)}
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
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Tỷ lệ sản phẩm</span>
                <span>{cat.productCount} SP</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  style={{ width: `${Math.min((cat.productCount / 15) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {showForm && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => {
            setShowForm(false)
            setEditingCategory(null)
          }}
        />
      )}
    </div>
  )
}

function CategoryFormModal({
  category,
  onClose,
}: {
  category: Category | null
  onClose: () => void
}) {
  const isEditing = !!category
  const [name, setName] = useState(category?.name || '')
  const [emoji, setEmoji] = useState(category?.emoji || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tên danh mục</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Nhập tên danh mục"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Emoji biểu tượng</label>
            <input
              type="text"
              required
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Ví dụ: 👕"
              maxLength={4}
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
