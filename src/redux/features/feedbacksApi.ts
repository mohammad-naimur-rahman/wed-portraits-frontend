import api from '../api/apiSlice'

const rootApi = '/feedbacks'

const feedbacksApi = api.injectEndpoints({
  endpoints: build => ({
    getAllFeedbacks: build.query({
      query: token => ({
        url: rootApi,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['feedbacks'],
    }),
    createFeedback: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['feedbacks'],
    }),
    deleteFeedback: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['feedbacks'],
    }),
  }),
})

export const { useCreateFeedbackMutation, useDeleteFeedbackMutation, useGetAllFeedbacksQuery } = feedbacksApi
