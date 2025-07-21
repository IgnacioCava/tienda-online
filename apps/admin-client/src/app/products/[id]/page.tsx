'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useProduct, useUpdateProduct } from '@/hooks/useProducts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const updateProduct = useUpdateProduct()
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  })

  const { data: product, isLoading, isError } = useProduct(typeof id === 'string' ? id : '')

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: String(product.price || ''),
        stock: String(product.stock || ''),
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    await updateProduct.mutateAsync({
      id: product?._id,
      updatedProduct: {
        ...product,
        ...form,
        price: parseFloat(form.price),
        stock: parseFloat(form.stock),
      },
    })

    router.push('/products')
  }

  if (isLoading) return <p className="text-sm text-muted">Loading product...</p>
  if (!product) return <p className="text-sm text-muted">Product not found</p>

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'description', 'category', 'price', 'stock'].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              value={form[field as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
