import { envVars } from '@/configs'
import { ITokenData } from '@/types/ITokenData'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { BaseQueryExtraOptions, BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import toast from 'react-hot-toast'

const baseQuery = fetchBaseQuery({
  baseUrl: envVars.API_URL,
})

const baseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions<BaseQueryFn>
) => {
  const refreshToken = getCookie('refreshToken')
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await axios.get(`${envVars.API_URL}/auth/access-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    if (refreshResult?.data?.success) {
      const newAccessToken = refreshResult.data.data.accessToken
      const accessTokenData: ITokenData = jwtDecode(newAccessToken)
      const accessTokenExpiration = calculateTokenExpiration(accessTokenData)
      setCookie('accessToken', newAccessToken, {
        maxAge: accessTokenExpiration,
      })
      result = await baseQuery(args, api, extraOptions)
    } else {
      toast.error('Please login again!')
    }
  }

  return result
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user', 'blogs', 'blog', 'services', 'service', 'faqs', 'feedbacks', 'galleries'],
  endpoints: () => ({}),
})

export default api
