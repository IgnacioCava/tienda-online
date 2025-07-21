import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IProduct, IProductQueryParams } from '@shared/types'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/useAuthStore'

export interface ProductFilters {
  search?: string
  categories?: string[]
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PaginatedProducts {
  products: IProduct[]
  totalProducts: number
  page: number
  totalPages: number
}

const buildQueryParams = (p: IProductQueryParams) => {
  const params = new URLSearchParams()

  if (p.search) params.set('search', p.search)
  if (p.categories) p.categories.forEach((cat) => params.append('categories', cat))
  if (p.minPrice !== undefined) params.set('minPrice', p.minPrice.toString())
  if (p.maxPrice !== undefined) params.set('maxPrice', p.maxPrice.toString())
  if (p.sortBy) params.set('sortBy', p.sortBy)
  if (p.sortOrder) params.set('sortOrder', p.sortOrder)
  if (p.page !== undefined) params.set('page', p.page.toString())
  if (p.limit !== undefined) params.set('limit', p.limit.toString())

  return params.toString()
}

// Fetch paginated products
export const useProducts = (filters: IProductQueryParams) => {
  const { user } = useAuthStore()
  return useQuery<PaginatedProducts>({
    queryKey: ['products', filters],
    queryFn: async () => {
      const queryString = buildQueryParams(filters)
      const res = await api.get(`/products?${queryString}`)
      return res.data
    },
    staleTime: 1000 * 60,
    enabled: !!user,
  })
}

// Get a single product
export const useProduct = (id: string) => {
  const { user } = useAuthStore()

  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get<IProduct>(`/products/${id}`)
      return data
    },
    enabled: !!user && !!id,
  })
}

// Create product
export const useCreateProduct = () => {
  const { user } = useAuthStore()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newProduct: Partial<IProduct>) => api.post('/products', newProduct),
    onSuccess: () => {
      if (user) queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    meta: {
      enabled: !!user,
    },
  })
}

// Update product
export const useUpdateProduct = () => {
  const { user } = useAuthStore()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updatedProduct }: { id: string; updatedProduct: Partial<IProduct> }) =>
      api.put(`/products/${id}`, updatedProduct),
    onSuccess: (_, variables) => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
      }
    },
    meta: {
      enabled: !!user,
    },
  })
}

// Delete product
export const useDeleteProduct = () => {
  const { user } = useAuthStore()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => {
      if (user) queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    meta: {
      enabled: !!user,
    },
  })
}
