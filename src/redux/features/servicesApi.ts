import api from '../api/apiSlice'

const rootApi = '/services'

const servicesApi = api.injectEndpoints({
  endpoints: build => ({
    getAllServices: build.query({
      query: query => ({
        url: query ? `${rootApi}?${query}` : rootApi,
      }),
      providesTags: ['services'],
    }),
    createService: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['services'],
    }),
  }),
})

export const { useGetAllServicesQuery, useCreateServiceMutation } = servicesApi
