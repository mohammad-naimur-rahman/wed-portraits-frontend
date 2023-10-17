import { envVars } from '@/configs'
import { IError } from '@/types/IError'
import axios from 'axios'
import toast from 'react-hot-toast'
import { errorMessage } from './error'

export const fetcher = async (urlpath: string, query?: string) => {
  const url = query ? `${envVars.API_URL}/${urlpath}?${query}` : `${envVars.API_URL}/${urlpath}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    toast.error(errorMessage(error as IError))
    return null
  }
}
