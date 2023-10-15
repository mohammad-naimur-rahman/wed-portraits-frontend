import { ENUM_USER_ROLE } from '@/enum/userRolesEum'

export interface ICookieUser {
  _id: string
  email: string
  name: string
  role: ENUM_USER_ROLE
  image?: string
}
