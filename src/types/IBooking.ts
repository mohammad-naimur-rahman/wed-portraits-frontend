import { IService } from './IService'
import { IUser } from './IUser'

export interface IBooking {
  id: string
  service: string | IService
  user: string | IUser
  date: Date
  status: 'pending' | 'confirmed' | 'cancelled' | 'ongoing' | 'fulfilled'
}
