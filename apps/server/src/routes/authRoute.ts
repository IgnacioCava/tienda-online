import { Router } from 'express'
import { signInOrCreateUser, signupCredentials } from '../controllers/authController'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = Router()

router.post('/signin', authMiddleware, signInOrCreateUser)
router.post('/signup-credentials', authMiddleware, signupCredentials)

export default router
