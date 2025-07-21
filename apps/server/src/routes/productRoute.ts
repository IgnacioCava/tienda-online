import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = Router()

router.get('/', authMiddleware, getAllProducts)
router.get('/:id', authMiddleware, getProductById)
router.post('/', authMiddleware, createProduct)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

export default router
