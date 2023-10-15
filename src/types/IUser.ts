export interface IUser {
  id: string
  name: string
  email: string
  password: string
  image?: string
  role: 'user' | 'admin' | 'super_admin'
  bookings: string[]
}
