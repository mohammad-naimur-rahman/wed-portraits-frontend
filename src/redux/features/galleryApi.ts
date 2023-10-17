import api from '../api/apiSlice'

const rootApi = '/galleries'

const galleryApi = api.injectEndpoints({
  endpoints: build => ({
    getAllGallery: build.query({
      query: () => ({
        url: rootApi,
      }),
      providesTags: ['galleries'],
    }),
    createGallery: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['galleries'],
    }),
    updateGallery: build.mutation({
      query: ({ id, token, payload }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['galleries'],
    }),
    deleteGallery: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['galleries'],
    }),
  }),
})

export const { useCreateGalleryMutation, useGetAllGalleryQuery, useUpdateGalleryMutation, useDeleteGalleryMutation } =
  galleryApi
