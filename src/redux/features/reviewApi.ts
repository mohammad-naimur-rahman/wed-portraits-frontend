import api from '../api/apiSlice'

const rootApi = '/reviews'

const reviewApi = api.injectEndpoints({
  endpoints: build => ({
    getAllReviews: build.query({
      query: token => ({
        url: rootApi,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['reviews'],
    }),
    createReview: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['reviews'],
    }),
    deleteReview: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
})

export const { useCreateReviewMutation, useGetAllReviewsQuery, useDeleteReviewMutation } = reviewApi
