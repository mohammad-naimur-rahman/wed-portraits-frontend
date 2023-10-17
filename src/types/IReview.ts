import { IUser } from './IUser'

export interface IReview {
  id: string
  reviewText: string
  rating: number
  user: IUser
  service: string
}
