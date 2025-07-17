import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDatabase } from './db/mongoose'
import { productRoute, health } from './routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
)
app.use(express.json())

app.get('/', (_, res) => res.send('API is working'))

app.use('/api/products', productRoute)
app.use(health)

app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`)
    })
  })
}

export default app
