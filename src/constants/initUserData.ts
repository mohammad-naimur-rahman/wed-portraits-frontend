import { ENUM_USER_ROLE } from '@/enum/userRolesEum'
import { ICookieUser } from '@/types/ICookieUser'

export const initUserData: ICookieUser = {
  id: '',
  name: '',
  email: '',
  image: '',
  role: ENUM_USER_ROLE.USER,
}
