import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { initializeFirebaseAdmin } from '@/lib/firebase/firebaseAdmin'
import { connectToDatabase } from './db/mongoose'
import { errorHandler } from './middleware/errorHandler'
import { authRoute, health, productRoute } from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(
  cors({
    origin: [process.env.FRONTEND_URL!, 'http://localhost:3000', 'http://localhost'],
    credentials: true,
  }),
)
app.use(express.json())

app.get('/', (_, res) => res.send('API is working'))

app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)
app.use(health)

app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
  connectToDatabase().then(() => {
    initializeFirebaseAdmin()
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`)
    })
  })
}

export default app
