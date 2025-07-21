// apps/admin-client/components/product-table.tsx

'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useProducts, useDeleteProduct } from '@/hooks/useProducts'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/app/components/dataTable'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { TrashIcon, PencilIcon } from 'lucide-react'
import { IProduct, IProductQueryParams } from '@shared/types'
import { useMemo, useState } from 'react'

function ProductTable() {
  const [filters, setFilters] = useState<IProductQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    categories: [],
  })
  const { data, isLoading } = useProducts(filters)
  console.log(data)
  const deleteProduct = useDeleteProduct()
  const router = useRouter()

  const columns = useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ getValue }) => `$${getValue<IProduct['price']>()}`,
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/products/${row.original._id}`)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteProduct.mutate(row.original._id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteProduct, router],
  )

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <DataTable
        columns={columns}
        data={data?.products || []}
        searchableColumns={['name', 'category']}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ProductTable
