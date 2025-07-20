import { Router } from 'express'
import { getAllProducts } from '../controllers'
import { authMiddleware } from 'src/middleware/authMiddleware'

const router = Router()

router.get('/', authMiddleware, getAllProducts)

export default router
