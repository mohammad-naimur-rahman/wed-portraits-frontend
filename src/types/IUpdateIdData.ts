import { CookieValueTypes } from 'cookies-next'

export interface IUpdateIdData<T> {
  payload: Partial<T>
  id: string
  token: CookieValueTypes
}
