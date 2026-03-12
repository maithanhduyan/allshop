import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setCategory, setSortBy } from '../model/slice'
import { selectFilter } from '../model/selectors'
import { CATEGORIES } from '@/shared/config/constants'

export function ProductFilterBar() {
  const dispatch = useAppDispatch()
  const filter = useAppSelector(selectFilter)

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 shadow-sm dark:bg-gray-900 md:p-4">
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => dispatch(setCategory(''))}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
            filter.category === ''
              ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Tất cả
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => dispatch(setCategory(cat.id))}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
              filter.category === cat.id
                ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
      <select
        value={filter.sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value as typeof filter.sortBy))}
        className="ml-auto rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
        <option value="popular">Phổ biến</option>
        <option value="newest">Mới nhất</option>
        <option value="price_asc">Giá thấp → cao</option>
        <option value="price_desc">Giá cao → thấp</option>
      </select>
    </div>
  )
}
