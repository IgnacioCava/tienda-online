import { useProduct } from '@/hooks'

type Product = {
  id: string
  name: string
  description: string
  image: string
  price: number
  stock: number
}

const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'iPhone 15',
    description: 'Latest Apple smartphone with A16 chip.',
    image: 'https://via.placeholder.com/300x200',
    price: 999,
    stock: 12,
  },
  '2': {
    id: '2',
    name: 'MacBook Pro',
    description: 'Powerful laptop for professionals.',
    image: 'https://via.placeholder.com/300x200',
    price: 1999,
    stock: 5,
  },
}

export default function ProductPreview({ productId }: { productId: string }) {
  const { data: product, isLoading } = useProduct(productId)

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <div className="max-w-3xl mx-auto border rounded-lg p-6 shadow-md">
      <img src={product.image} alt={product.name} className="rounded-lg mb-4 w-full object-cover" />
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <p className="text-muted-foreground mb-2">{product.description}</p>
      <p className="text-lg font-bold mb-1">${product.price}</p>
      <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
    </div>
  )
}
