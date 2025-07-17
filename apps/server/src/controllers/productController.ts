import { Request, Response, NextFunction } from 'express'

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = [
      { id: 1, name: 'example1', price: 100 },
      { id: 2, name: 'example2', price: 200 },
    ]

    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}
