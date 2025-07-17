import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }

  await mongoose.connect(uri)
})

beforeEach(async () => {
  const db = mongoose.connection.db
  if (!db) throw new Error('Database connection not ready')

  const collections = await db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})
