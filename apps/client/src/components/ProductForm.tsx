'use client'

import { useEffect, useState } from 'react'
import { uploadImage } from '@/lib/uploadImage'
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts'
import { IProduct } from '@shared/*'
import Image from 'next/image'

export const ProductForm = ({ editProduct }: { editProduct?: Partial<IProduct> }) => {
  const [form, setForm] = useState<Partial<IProduct>>(editProduct || {})
  const [mode, setMode] = useState<'edit' | 'create'>('create')

  const [image, setImage] = useState<File | null>(null)
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  useEffect(() => {
    if (editProduct) {
      setMode('edit')
      setForm(editProduct)
    } else {
      setMode('create')
      setForm({})
    }
  }, [editProduct])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrl = ''
    if (image) {
      imageUrl = await uploadImage(image)
    }

    if (mode === 'edit' && form._id) {
      await updateProduct.mutateAsync({ id: form._id, updatedProduct: form as IProduct })
    } else {
      createProduct.mutate({ ...form, image: imageUrl })
    }

    setMode('create')
    setForm({})
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        className="border px-2 py-1 w-full"
        placeholder="Name"
        value={form.name || ''}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border px-2 py-1 w-full"
        placeholder="Description"
        value={form.description || ''}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        className="border px-2 py-1 w-full"
        placeholder="Price"
        value={form.price || ''}
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
      />
      <input
        type="text"
        className="border px-2 py-1 w-full"
        placeholder="Category"
        value={form.category || ''}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="text"
        className="border px-2 py-1 w-full"
        placeholder="Stock"
        value={form.stock || ''}
        onChange={(e) => setForm({ ...form, stock: parseFloat(e.target.value) })}
      />
      <input
        className="border px-2 py-1 w-full"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      {form.image && <Image src={form.image} alt="form image" height={50} width={50} />}
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        {mode === 'edit' ? 'Edit' : 'Create'} Product
      </button>
    </form>
  )
}
