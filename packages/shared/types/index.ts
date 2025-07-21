export interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
  createdAt?: string
  updatedAt?: string
}

export interface IUser {
  uid: string
  email: string
  image?: string
  name?: string
  provider?: string
  role: 'client' | 'admin'
}

export interface IProductQueryParams {
  search?: string
  categories?: string[]
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}
