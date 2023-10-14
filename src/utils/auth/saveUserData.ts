import { IAuthUser } from '@/types/IAuthUser'
import { ICookieUser } from '@/types/ICookieUser'
import { ITokenData } from '@/types/ITokenData'
import { IUser } from '@/types/IUser'
import { setCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { calculateTokenExpiration } from './calculateTokenExpiration'

export const saveUserData = (authData: IAuthUser) => {
  const accessToken = authData?.accessToken
  const refreshToken = authData?.refreshToken

  // Decode jwt token
  const accessTokenData: ITokenData = jwtDecode(accessToken)
  const refreshTokenData: ITokenData = jwtDecode(refreshToken)

  const accessTokenExpiration = calculateTokenExpiration(accessTokenData)
  const refreshTokenExpiration = calculateTokenExpiration(refreshTokenData)

  // Taking only the necessary data
  const userData: IUser = authData?.data
  const userDataToSave: ICookieUser = {
    id: userData?.id,
    email: userData?.email,
    name: userData?.name,
    image: userData?.image,
  }

  setCookie('accessToken', accessToken, {
    maxAge: accessTokenExpiration,
  })
  setCookie('refreshToken', refreshToken, {
    maxAge: refreshTokenExpiration,
  })

  // Saving usee data with refresh token expiration because when refresh token will expire, user needs to login again
  setCookie('userData', JSON.stringify(userDataToSave), {
    maxAge: refreshTokenExpiration,
  })
}
