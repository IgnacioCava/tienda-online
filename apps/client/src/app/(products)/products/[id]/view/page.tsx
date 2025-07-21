'use client'

import { useProduct } from '@/hooks'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

const ProductViewPage = () => {
  const router = useRouter()
  const { id } = useParams()
  const { data: product, isLoading } = useProduct(typeof id === 'string' ? id : '')

  if (isLoading || !product) return <div>Loading product...</div>

  return (
    <div className="bg-slate-50 py-10 px-4 sm:px-8 lg:px-16 flex-1">
      <div className="mx-auto max-w-5xl bg-white shadow-md rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Image Section */}
        <div className="relative w-full h-96 bg-slate-100 rounded-lg overflow-hidden">
          <Image
            src={product.image || '/file.svg'}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>
            <p className="mt-2 text-2xl text-green-600">${product.price}</p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={() => router.push(`/products/${product._id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => router.push('/products')}
              className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100"
            >
              Back to List
            </button>
            <button
              onClick={() => alert('Handle delete here')}
              className="ml-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductViewPage
