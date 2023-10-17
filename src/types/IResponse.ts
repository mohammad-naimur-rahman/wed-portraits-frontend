export interface IResponse<T> {
  data: T[]
  meta?: {
    total: number
    page: number
    limit: number
  }
}

export interface ISingleResponse<T> {
  data: T
}
