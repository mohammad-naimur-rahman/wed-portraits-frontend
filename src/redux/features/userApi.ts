import api from '@/redux/api/apiSlice'
const rootApi = '/users'

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
    updateUser: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['user', 'users'],
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
      invalidatesTags: ['users'],
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
  useUpdateUserMutation,
  useGetUsersQuery,
  useChangeRoleMutation,
  useDeleteUserMutation,
} = userApi
