interface IServiceQueries {
  search: string
  minPrice: number
  maxPrice: number
  category: 'all' | 'Wedding' | 'Birthday' | 'Anniversary' | 'Others'
  status: 'all' | 'active' | 'inactive' | 'upcoming'
  sortBy: 'createdAt'
  sortOrder: 'desc'
  page: 1
  limit: 10
}
