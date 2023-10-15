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
    getUsers: build.query({
      query: ({ token, query }) => ({
        url: query ? `${rootApi}?${query}` : rootApi,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['users'],
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
    changeRole: build.mutation({
      query: ({ email, role, token }) => ({
        url: `${rootApi}/admins/${email}`,
        method: 'PATCH',
        body: { role },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['user'],
    }),
    deleteUser: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['users'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useChangeRoleMutation,
  useDeleteUserMutation,
} = userApi
