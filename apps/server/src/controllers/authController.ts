import { Request, Response } from 'express'
import { createUserIfNoneExists } from '@/services/userService'

export const signInOrCreateUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(400).json({ message: 'ID token is required' })

    const { uid, email } = req.user

    if (!uid || !email) {
      return res.status(400).json({ message: 'Invalid token: missing uid or email' })
    }

    const user = await createUserIfNoneExists(req.user)

    return res.status(200).json({ user })
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export const signupCredentials = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(400).json({ message: 'ID token is required' })

    const { uid, email } = req.user

    if (!uid || !email) {
      return res.status(400).json({ message: 'Invalid token: missing uid or email' })
    }

    const user = await createUserIfNoneExists(req.user)

    return res.status(200).json({ user })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
