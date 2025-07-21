import ProductTable from '@/app/components/productTable'

const ProductsPage = () => {
  return (
    <main className="p-6 tracking-wide w-full">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <ProductTable />
    </main>
  )
}

export default ProductsPage
