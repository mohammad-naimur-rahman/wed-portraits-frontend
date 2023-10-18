import { IUser } from './IUser'

export interface IFeedback {
  id: string
  topic: string
  description?: string
  user: IUser
}
