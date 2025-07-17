export interface Product {
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
