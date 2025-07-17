import { Router } from 'express'
import { getAllProducts } from '../controllers'

const router = Router()

router.get('/', getAllProducts)

export default router
