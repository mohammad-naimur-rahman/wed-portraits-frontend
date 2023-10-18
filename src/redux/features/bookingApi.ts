import api from '../api/apiSlice'

const rootApi = '/bookings'

const bookingsApi = api.injectEndpoints({
  endpoints: build => ({
    getAllBookings: build.query({
      query: token => ({
        url: rootApi,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['bookings'],
    }),
    createBooking: build.mutation({
      query: ({ payload, token }) => ({
        url: rootApi,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['bookings'],
    }),
    updateBooking: build.mutation({
      query: ({ id, token, payload }) => ({
        url: `${rootApi}/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['bookings'],
    }),
    deleteBooking: build.mutation({
      query: ({ id, token }) => ({
        url: `${rootApi}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
})

export const { useGetAllBookingsQuery, useCreateBookingMutation, useUpdateBookingMutation, useDeleteBookingMutation } =
  bookingsApi
