import { IError } from '@/types/IError'
import { isAxiosError } from 'axios'
export const errorMessage = (err: IError) => {
  if (isAxiosError(err)) {
    return err?.response?.data?.message
  } else if (err instanceof Error) {
    return err?.message
  } else if (err.data) {
    return err.data.message
  } else {
    return 'Something went wrong!'
  }
}
