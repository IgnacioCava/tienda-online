import { IProductQueryParams } from '@shared/*'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBarProps {
  filters: IProductQueryParams
  setFilters: (filters: IProductQueryParams) => void
}

export const SearchBar = ({ filters, setFilters }: SearchBarProps) => {
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

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={localFilters.search}
        onChange={(e) => handleChange('search', e.target.value)}
        className="border rounded px-2 py-1"
      />

      <input
        type="number"
        placeholder="Min price"
        min={0}
        value={localFilters.minPrice}
        onChange={(e) => handleChange('minPrice', e.target.value)}
        className="border rounded px-2 py-1 w-24"
      />

      <input
        type="number"
        placeholder="Max price"
        min={0}
        value={localFilters.maxPrice}
        onChange={(e) => handleChange('maxPrice', e.target.value)}
        className="border rounded px-2 py-1 w-24"
      />

      <select
        value={localFilters.limit}
        onChange={(e) => handleChange('limit', Number(e.target.value))}
        className="border rounded px-2 py-1 w-24"
      >
        {[5, 10, 20, 50].map((n) => (
          <option key={n} value={n}>
            {n} per page
          </option>
        ))}
      </select>

      <select
        value={localFilters.sortBy}
        onChange={(e) => handleChange('sortBy', e.target.value)}
        className="border rounded px-2 py-1 w-32"
      >
        <option value="createdAt">Created At</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
        <option value="category">Category</option>
      </select>

      <select
        value={localFilters.sortOrder}
        onChange={(e) => handleChange('sortOrder', e.target.value)}
        className="border rounded px-2 py-1 w-24"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  )
}
