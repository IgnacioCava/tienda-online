'use client'

import { IProduct } from '@shared/*'
import Image from 'next/image'

type ProductPreviewProps = {
  product: Partial<IProduct>
  imageFile?: File | null
}

const ProductPreview = ({ product, imageFile }: ProductPreviewProps) => {
  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : product.image || '/globe.svg'

  return (
    <div className="rounded-xl shadow-md border border-slate-200 overflow-hidden bg-white">
      <div className="aspect-square bg-slate-100">
        <Image
          src={imageUrl}
          alt={product.name || 'Preview Image'}
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold">{product.name || 'Product name'}</h2>
        <p className="text-gray-700 text-sm">
          {product.description || 'Description will appear here.'}
        </p>
        <p className="text-xl font-bold text-blue-600">${product.price?.toFixed(2) || '0.00'}</p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Category:</span> {product.category || 'N/A'}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Stock:</span> {product.stock ?? 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default ProductPreview
