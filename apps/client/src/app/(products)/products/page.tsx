'use client'

import { ProductForm } from '@/components/ProductForm'
import { SearchBar } from '@/components/SearchBar'
import { useDeleteProduct, useProducts } from '@/hooks/useProducts'
import { IProduct, IProductQueryParams } from '@shared/*'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function ProductListPage() {
  const [filters, setFilters] = useState<IProductQueryParams>({
    page: 1,
    limit: 1,
    sortBy: 'createdAt',
    categories: [],
  })

  const { data, isLoading, isError } = useProducts(filters)

  const deleteProduct = useDeleteProduct()

  const [form, setForm] = useState<Partial<IProduct>>({})
  const [editId, setEditId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteProduct.mutateAsync(id)
    }
  }

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductForm editProduct={editId ? form : undefined} />

      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="space-y-4">
        {isError && <div className="p-4">An error occured while fetching products</div>}
        {isLoading && <div className="p-4">Loading...</div>}
        <div>Product list - {data?.totalProducts} products found</div>
        {data?.products?.map((product) => (
          <div data-testid="product-list" key={product._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-sm text-gray-600">${product.price?.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p>{product.stock}</p>
            <Image src={product.image} alt="product image" height={50} width={50} />
            <div className="mt-2 flex gap-2">
              <button
                className="text-blue-600"
                onClick={() => {
                  setForm(product)
                  setEditId(product._id!)
                }}
              >
                Edit
              </button>
              <button className="text-red-600" onClick={() => handleDelete(product._id!)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-4 items-center">
        <button
          disabled={filters.page === 1}
          onClick={() => setFilters({ ...filters, page: filters.page ? filters.page - 1 : 1 })}
        >
          Previous
        </button>
        <span>Page {filters.page}</span>
        <button
          disabled={filters.page === data?.totalPages}
          onClick={() => setFilters({ ...filters, page: filters.page ? filters.page + 1 : 1 })}
        >
          Next
        </button>
      </div>
    </div>
  )
}
