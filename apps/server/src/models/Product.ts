import { Schema, Document, model } from 'mongoose'
import { Product } from '@tienda-online/shared'

type ProductDocument = Product & Document

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

export const ProductModel = model<ProductDocument>('Product', ProductSchema)
