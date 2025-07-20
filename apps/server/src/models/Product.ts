import type { IProduct } from '@tienda-online/shared'
import { Document, model, Schema } from 'mongoose'

type ProductDocument = IProduct & Document

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
    stock: Number,
    category: String,
  },
  { timestamps: true },
)

export const Product = model<ProductDocument>('Product', ProductSchema)
