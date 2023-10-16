import { IUser } from './IUser'

export interface IFeedback {
  topic: string
  description?: string
  user: IUser
}
