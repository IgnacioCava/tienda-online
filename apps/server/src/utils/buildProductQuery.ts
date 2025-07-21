import { Request } from 'express'
import type { IProductQueryParams } from '@tienda-online/shared'

type PriceFilters = { $gte?: number; $lte?: number }
type CategoryFilter = { $in?: string[] }
type SearchFilter = { $regex: string; $options: 'i' }

type Filters = {
  price?: PriceFilters
  category?: CategoryFilter
  name?: SearchFilter
}

const buildProductQuery = (req: Request & { query: IProductQueryParams }) => {
  const {
    page = '1',
    limit = '10',
    search = '',
    categories,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query

  const pageNumber = parseInt(page as string, 10)
  const limitNumber = parseInt(limit as string, 10)
  const skip = (pageNumber - 1) * limitNumber

  const filters: Filters = {}
  const sort: Record<string, 1 | -1> = {}

  if (search) {
    filters.name = { $regex: search, $options: 'i' }
  }

  if (categories) {
    // support multiple categories: ?category=cat1,cat2
    filters.category = { $in: categories }
  }

  if (minPrice || maxPrice) {
    filters.price = {}
    if (minPrice) filters.price.$gte = parseFloat(minPrice.toString())
    if (maxPrice) filters.price.$lte = parseFloat(maxPrice.toString())
  }

  sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1

  return {
    filters,
    pagination: { skip, limit: limitNumber },
    sort,
    meta: { page: pageNumber, limit: limitNumber },
  }
}

export default buildProductQuery
