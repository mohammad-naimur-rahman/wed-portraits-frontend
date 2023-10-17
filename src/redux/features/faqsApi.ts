import api from '../api/apiSlice'

const rootApi = '/faqs'

const faqsApi = api.injectEndpoints({
  endpoints: build => ({
    getAllFaqs: build.query({
      query: () => ({
        url: rootApi,
      }),
      providesTags: ['faqs'],
    }),
    createFaq: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['faqs'],
    }),
    updateFaq: build.mutation({
      query: ({ id, token, payload }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['faqs'],
    }),
    deleteFaq: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['faqs'],
    }),
  }),
})

export const { useGetAllFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } = faqsApi
