import { Request, Response, NextFunction } from 'express'
import { getAdminAuth } from '../lib/firebase/firebaseAdmin'

const PUBLIC_PATHS = ['/signin', '/signup']

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  //if (PUBLIC_PATHS.includes(req.path)) return next()

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const idToken = authHeader.split('Bearer ')[1]

  try {
    const decodedToken = await getAdminAuth().verifyIdToken(idToken)
    if (!decodedToken || !decodedToken.uid || !decodedToken.email) {
      return res.status(400).json({ message: 'Missing user data' })
    }
    console.log(decodedToken)
    req.user = decodedToken // 👈 You attach the decoded Firebase token here
    next()
  } catch (err) {
    console.error('Token verification failed', err)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
