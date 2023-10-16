import { IUser } from '@/types/IUser'
import { getCookie } from 'cookies-next'

export const getUserData = (): IUser => {
  const userData = getCookie('userData')
  const user = userData && JSON.parse(userData)
  return user
}
