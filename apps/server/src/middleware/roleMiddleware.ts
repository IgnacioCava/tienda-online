import { Request, Response, NextFunction } from 'express'

export const requireRole = (role: 'admin' | 'client') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { role?: string } | undefined

    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' })
    }

    next()
  }
}
