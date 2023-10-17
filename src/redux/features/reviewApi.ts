import api from '../api/apiSlice'

const rootApi = '/reviews'

const reviewApi = api.injectEndpoints({
  endpoints: build => ({
    // getAllGallery: build.query({
    //   query: () => ({
    //     url: rootApi,
    //   }),
    //   providesTags: ['galleries'],
    // }),
    createReview: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // updateGallery: build.mutation({
    //   query: ({ id, token, payload }) => ({
    //     url: `${rootApi}/${id}`,
    //     method: 'PATCH',
    //     body: payload,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ['galleries'],
    // }),
    // deleteGallery: build.mutation({
    //   query: ({ id, token }) => ({
    //     url: `${rootApi}/${id}`,
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ['galleries'],
    // }),
  }),
})

export const { useCreateReviewMutation } = reviewApi
