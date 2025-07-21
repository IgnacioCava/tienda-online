'use client'

import { useEffect, useState } from 'react'
import { uploadImage } from '@/lib/uploadImage'
import { useCreateProduct, useUpdateProduct } from '@/hooks'
import { IProduct } from '@shared/*'
import Image from 'next/image'
import { ProductPreview } from '@/components'
import FormInput from './FormInput'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProductForm = ({ editProduct }: { editProduct?: Partial<IProduct> }) => {
  const router = useRouter()

  const [form, setForm] = useState<Partial<IProduct>>(editProduct || {})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [mode, setMode] = useState<'edit' | 'create'>('create')
  const [image, setImage] = useState<File | null>(null)
  const [formEnabled, setFormEnabled] = useState(false)

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

  const verifyForm = (newForm: typeof form) => {
    const errors = {
      name: !newForm.name || newForm.name.length < 3 ? 'El nombre es muy corto' : '',
      price: !newForm.price || newForm.price < 1 ? 'Debe ingresar un valor positivo' : '',
      stock: !newForm.stock || newForm.stock < 1 ? 'Debe ingresar un valor positivo' : '',
    }

    setFormErrors(errors)
    setFormEnabled(Object.values(errors).every((e) => e === ''))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    verifyForm(form)
    if (!formEnabled) return
    let imageUrl = form.image || ''
    if (image) {
      imageUrl = await uploadImage(image)
    }

    if (mode === 'edit' && form._id) {
      await updateProduct.mutateAsync({
        id: form._id,
        updatedProduct: { ...form, image: imageUrl } as IProduct,
      })
    } else {
      createProduct.mutate(
        { ...form, image: imageUrl },
        {
          onSuccess: () => {
            toast.success('Producto creado exitosamente', {
              position: 'top-center',
              duration: 5000,
            })
          },
          onError: () => {
            toast.error('Error al crear producto', {
              position: 'top-center',
              duration: 5000,
            })
          },
        },
      )
    }

    setMode('create')
    setForm({})
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        {mode === 'edit' ? 'Edit' : 'Create'} Product
      </h2>
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <FormInput
            form={form}
            setForm={setForm}
            verifyForm={verifyForm}
            verifyError={formErrors}
            label="Name"
            placeholder="Product Name"
            name="name"
            type="text"
          />
          <FormInput
            form={form}
            setForm={setForm}
            verifyForm={verifyForm}
            verifyError={formErrors}
            label="Description"
            placeholder="Product Description"
            name="description"
            type="text"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              form={form}
              setForm={setForm}
              verifyForm={verifyForm}
              verifyError={formErrors}
              label="Price"
              placeholder="0.00"
              name="price"
              type="number"
            />
            <FormInput
              form={form}
              setForm={setForm}
              verifyForm={verifyForm}
              verifyError={formErrors}
              label="Stock"
              placeholder="0"
              name="stock"
              type="number"
            />
          </div>

          <FormInput
            form={form}
            setForm={setForm}
            verifyForm={verifyForm}
            verifyError={formErrors}
            label="Category"
            placeholder="e.g. Electronics"
            name="category"
            type="text"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              className="w-full text-sm border border-gray-300 rounded-md file:px-4 file:py-2 file:mr-4 file:bg-blue-50 file:border-0 file:rounded-md file:text-blue-700"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Live Preview</h3>
          <ProductPreview product={form} imageFile={image} />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => router.push('/products')}
          className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100"
        >
          Back to List
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
          disabled={!formEnabled}
        >
          {mode === 'edit' ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
