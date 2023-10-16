import api from '../api/apiSlice'

const rootApi = '/blogs'

const blogsApi = api.injectEndpoints({
  endpoints: build => ({
    getAllBlogs: build.query({
      query: () => ({
        url: rootApi,
      }),
      providesTags: ['blogs'],
    }),
    getBlog: build.query({
      query: slug => ({
        url: `${rootApi}/${slug}`,
      }),
      providesTags: ['blogs'],
    }),
    createBlog: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blogs'],
    }),
    updateBlog: build.mutation({
      query: ({ id, token, payload }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blogs'],
    }),
    deleteBlog: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blogs'],
    }),
  }),
})

export const {
  useGetAllBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi
