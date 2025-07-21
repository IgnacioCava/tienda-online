'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useProduct } from '@/hooks'
import { ProductForm } from '@/components'
import { IProduct } from '@shared/types'

const EditProductPage = () => {
  const router = useRouter()
  const { id } = useParams()

  const { data: product, isLoading, isError } = useProduct(typeof id === 'string' ? id : '')

  useEffect(() => {
    if (isError) {
      alert('Failed to load product')
      router.push('/products')
    }
  }, [isError, router])

  if (isLoading || !product) return <div>Loading product...</div>

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <ProductForm editProduct={product as Partial<IProduct>} />
    </div>
  )
}

export default EditProductPage
