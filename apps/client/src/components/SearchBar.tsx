import { IProductQueryParams } from '@shared/*'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBarProps {
  filters: IProductQueryParams
  setFilters: (filters: IProductQueryParams) => void
}

const SearchBar = ({ filters, setFilters }: SearchBarProps) => {
  const [localFilters, setLocalFilters] = useState({
    search: filters.search || '',
    minPrice: filters.minPrice?.toString() || '',
    maxPrice: filters.maxPrice?.toString() || '',
    limit: filters.limit || 10,
    sortBy: filters.sortBy || 'createdAt',
    sortOrder: filters.sortOrder || 'desc',
  })

  const debouncedSetFilters = useDebouncedCallback((updated) => {
    setFilters({
      ...filters,
      ...updated,
      page: 1,
      minPrice: updated.minPrice ? parseFloat(updated.minPrice) : undefined,
      maxPrice: updated.maxPrice ? parseFloat(updated.maxPrice) : undefined,
      limit: Number(updated.limit),
    })
  }, 300)

  const handleChange = (key: keyof typeof localFilters, value: string | number) => {
    const updated = { ...localFilters, [key]: value }
    setLocalFilters(updated)
    debouncedSetFilters(updated)
  }

  const [modal, setModal] = useState<'filter' | 'order' | false>(false)

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4 max-w-screen-sm mx-auto px-2">
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={localFilters.search}
        onChange={(e) => handleChange('search', e.target.value)}
        className="border border-slate-200 rounded px-3 py-2 w-full outline-0"
      />

      <div className="flex gap-2">
        <div className="sm:hidden w-fit">
          <button
            onClick={() => setModal('filter')}
            className="border border-slate-200 px-2 py-1 rounded hover:bg-blue-600 hover:text-white hover:border-transparent duration-100"
          >
            Filter
          </button>
        </div>

        <div className="sm:hidden w-fit">
          <button
            onClick={() => setModal('order')}
            className="border border-slate-200 px-2 py-1 rounded hover:bg-blue-600 hover:text-white hover:border-transparent duration-100"
          >
            Order
          </button>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-wrap gap-4 mb-4 max-w-screen-sm mx-auto">
        {/* Same inputs here as before */}
        <input
          type="number"
          placeholder="Min price"
          name="minPrice"
          min={0}
          value={localFilters.minPrice}
          onChange={(e) => handleChange('minPrice', e.target.value)}
          className="border border-slate-200rounded px-3 py-2 w-full sm:w-24"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          min={0}
          value={localFilters.maxPrice}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
          className="border border-slate-200 rounded px-3 py-2 w-full sm:w-24"
        />
        <select
          value={localFilters.limit}
          name="limit"
          onChange={(e) => handleChange('limit', Number(e.target.value))}
          className="border border-slate-200 rounded px-3 py-2 w-full sm:w-24"
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
        <select
          value={localFilters.sortBy}
          name="sortBy"
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="border border-slate-200 rounded px-3 py-2 w-full sm:w-32"
        >
          <option value="createdAt">Created At</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
        <select
          value={localFilters.sortOrder}
          name="sortOrder"
          onChange={(e) => handleChange('sortOrder', e.target.value)}
          className="border border-slate-200 rounded px-3 py-2 w-full sm:w-24"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {modal === 'filter' && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-[1px] bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setModal(false)}
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

            <input
              type="number"
              name="minPrice"
              placeholder="Min price"
              min={0}
              value={localFilters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="border border-slate-200 rounded px-3 py-2 mb-3 w-full"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max price"
              min={0}
              value={localFilters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="border border-slate-200 rounded px-3 py-2 mb-3 w-full"
            />
            <select
              value={localFilters.limit}
              name="limit"
              onChange={(e) => handleChange('limit', Number(e.target.value))}
              className="border border-slate-200 rounded px-3 py-2 mb-3 w-full"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
            </select>

            <button
              onClick={() => setModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      {modal === 'order' && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-[1px] bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setModal(false)} // Close modal on background click
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Order Products</h2>

            <select
              value={localFilters.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              className="border border-slate-200 rounded px-3 py-2 mb-3 w-full"
            >
              <option value="createdAt">Created At</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
            <select
              value={localFilters.sortOrder}
              onChange={(e) => handleChange('sortOrder', e.target.value)}
              className="border border-slate-200 rounded px-3 py-2 mb-3 w-full"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              onClick={() => setModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
