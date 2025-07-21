import { useDeleteProduct } from '@/hooks'
import { IProduct } from '@shared/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter()
  const deleteProduct = useDeleteProduct()

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteProduct.mutateAsync(id)
    }
  }

  return (
    <div
      key={product._id}
      className="group relative flex flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:shadow-md max-h-[450px]"
    >
      <div
        className="relative w-full overflow-hidden bg-slate-100 cursor-pointer h-3/4 flex items-center"
        onClick={() => router.push(`products/${product._id}/view`)}
      >
        <Image
          src={product.image || 'file.svg'}
          alt={product.name}
          width={100}
          height={100}
          sizes="100vw"
          className="h-fit w-full aspect-square object-contain transition-transform duration-200 group-hover:scale-105 mx-auto"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      <div className="flex flex-col justify-between p-4 space-y-2">
        <h2 className="text-lg font-semibold text-slate-800">{product.name}</h2>
        <p className="text-xl font-bold text-green-600">${product.price}</p>
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">Category:</span> {product.category}
        </p>
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">Stock:</span> {product.stock}
        </p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() => router.push(`products/${product._id}/edit`)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(product._id!)}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
