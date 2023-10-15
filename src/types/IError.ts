import { AxiosError } from 'axios'

export type IError = Error | AxiosError | { data: { message: string } }
