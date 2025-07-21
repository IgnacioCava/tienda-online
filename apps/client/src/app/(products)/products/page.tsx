'use client'

import { ProductForm } from '@/components'
import { SearchBar } from '@/components'
import ProductCard from '@/components/ProductCard'
import { useDeleteProduct, useProducts } from '@/hooks/useProducts'
import { IProduct, IProductQueryParams } from '@shared/*'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function ProductListPage() {
  const [filters, setFilters] = useState<IProductQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    categories: [],
  })

  const { data, isLoading, isError } = useProducts(filters)

  const handleSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setFilters((prev) => ({ ...prev, page: 1, search: event.target.value }))
  }, 300)

  useEffect(() => {
    return () => {
      handleSearch.cancel()
    }
  }, [handleSearch])

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold my-4 text-center">Products</h1>

      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="space-y-6 mt-4">
        {isError && (
          <div className="p-4 bg-red-100 text-red-700 rounded text-center">
            An error occurred while fetching products
          </div>
        )}
        {isLoading && <div className="p-4 text-center text-gray-500">Loading...</div>}

        <div className="text-center text-sm text-gray-600 mb-2">
          {data?.totalProducts} products found
        </div>
        <div className="grid grid-cols-2 flex-row justify-center flex-wrap gap-2 sm:gap-4 px-2 sm:px-0">
          {data?.products?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-6 relative w-fit m-auto">
        {!(filters.page === 1) && (
          <button
            disabled={filters.page === 1}
            onClick={() => setFilters({ ...filters, page: filters.page ? filters.page - 1 : 1 })}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 absolute right-full"
          >
            Previous
          </button>
        )}
        <span className="flex items-center font-semibold px-4 py-2">Page {filters.page}</span>
        {!(filters.page === data?.totalPages) && (
          <button
            disabled={filters.page === data?.totalPages}
            onClick={() => setFilters({ ...filters, page: filters.page ? filters.page + 1 : 1 })}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 absolute left-full"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
