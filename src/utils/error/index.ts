import { IError } from '@/types/IError'
import { isAxiosError } from 'axios'
export const errorMessage = (err: IError) => {
  if (isAxiosError(err)) {
    return err?.response?.data?.message
  } else {
    err.message
  }
}
