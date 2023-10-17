import { IReview } from './IReview'

export interface IService {
  id: string
  title: string
  description: string
  image: string
  price: number
  status: 'active' | 'inactive' | 'upcoming'
  category: 'Wedding' | 'Birthday' | 'Anniversary' | 'Others'
  reviews: IReview[]
}
