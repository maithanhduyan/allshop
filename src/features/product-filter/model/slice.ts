import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  category: string
  search: string
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  minPrice: number
  maxPrice: number
}

const initialState: FilterState = {
  category: '',
  search: '',
  sortBy: 'popular',
  minPrice: 0,
  maxPrice: 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setSortBy(state, action: PayloadAction<FilterState['sortBy']>) {
      state.sortBy = action.payload
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.minPrice = action.payload.min
      state.maxPrice = action.payload.max
    },
    resetFilters() {
      return initialState
    },
  },
})

export const { setCategory, setSearch, setSortBy, setPriceRange, resetFilters } =
  filterSlice.actions
export const filterReducer = filterSlice.reducer
