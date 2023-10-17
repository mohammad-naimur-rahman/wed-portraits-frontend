export interface IResponse<T> {
  data: T[]
  meta?: {
    total: number
    page: number
    limit: number
  }
}
