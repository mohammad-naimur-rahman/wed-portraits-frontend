import api from '@/redux/api/apiSlice'

const rootApi = '/users'

// TODO: add user login and signup api
const userApi = api.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query({
      query: token => ({
        url: `${rootApi}/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['user'],
    }),
    updateProfile: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['user'],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi
