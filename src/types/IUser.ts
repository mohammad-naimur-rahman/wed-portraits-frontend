import { ENUM_USER_ROLE } from '@/enum/userRolesEum'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  image?: string
  role: keyof typeof ENUM_USER_ROLE
  bookings: string[]
}
