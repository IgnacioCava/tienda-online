import type { IUser } from '@tienda-online/shared'
import mongoose, { Document, Schema } from 'mongoose'

type UserDocument = IUser & Document

const userSchema = new Schema<UserDocument>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: String,
    image: String,
    provider: String,
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
  },
  { timestamps: true },
)

export const User = mongoose.model<UserDocument>('User', userSchema)
