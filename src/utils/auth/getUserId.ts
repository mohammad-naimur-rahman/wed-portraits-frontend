import { ICookieUser } from '@/types/ICookieUser'
import { getCookie } from 'cookies-next'

export const getUserId = (): string => {
  const userData = getCookie('userData')
  const user: ICookieUser = userData && JSON.parse(userData)
  return user?.id
}
