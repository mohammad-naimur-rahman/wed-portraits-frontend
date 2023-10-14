import { ITokenData } from '@/types/ITokenData'

export const calculateTokenExpiration = (tokenData: ITokenData) => {
  const issuedAt = new Date(tokenData.iat * 1000)
  const expiration = new Date(tokenData.exp * 1000)

  // Calculate the time difference
  const timeDifference = expiration.getTime() - issuedAt.getTime()
  return timeDifference / 1000
}
