export interface ITokenData {
  iat: number
  exp: number
  role: 'super_admin' | 'admin' | 'user'
  userId: string
}
