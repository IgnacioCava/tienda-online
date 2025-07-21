import { Request, Response } from 'express'
import { Product } from '../models/Product'
import buildProductQuery from '@/utils/buildProductQuery'

// Get all
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { filters, pagination, sort, meta } = buildProductQuery(req)

    const [products, total] = await Promise.all([
      Product.find(filters).sort(sort).skip(pagination.skip).limit(pagination.limit),
      Product.countDocuments(filters),
    ])

    res.json({
      page: meta.page,
      totalPages: Math.ceil(total / meta.limit),
      totalProducts: total,
      products,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

// Get one
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Invalid product ID' })
  }
}

// Create
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Failed to create product', details: err })
  }
}

// Update
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updated) return res.status(404).json({ error: 'Product not found' })
    res.json(updated)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Failed to update product' })
  }
}

// Delete
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Product not found' })
    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Failed to delete product' })
  }
}
