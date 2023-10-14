import { IUser } from './IUser'
export interface IAuthUser {
  data: IUser
  accessToken: string
  refreshToken: string
}
