import { CookieValueTypes, getCookie } from 'cookies-next'

export const getAccessToken = (): CookieValueTypes => {
  const accessToken = getCookie('accessToken')
  return accessToken
}
