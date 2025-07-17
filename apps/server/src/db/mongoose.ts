import mongoose from 'mongoose'

export const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI
    if (!uri) throw new Error('MONGO_URI missing in .env')
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`)
    throw error
  }
}
