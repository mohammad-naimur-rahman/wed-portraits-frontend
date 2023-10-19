import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BookingCard from '@/components/pages/dashboard/cards/BookingCard'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetAllBookingsQuery } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'

import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'

interface Props {
  userData: IUser
}

function AllBookingsPage({ userData }: Props) {
  const { data, isLoading, error, isError } = useGetAllBookingsQuery(getAccessToken())
  const bookings: IBooking[] = data?.data

  return (
    <DashboardLayout title='My Bookings | Dashboard' userRole={userData?.role} error={error} isError={isError}>
      <section className='p-5'>
        <Typography className='pt-3 pb-8' variant='h2'>
          All Bookings
        </Typography>

        {isLoading ? (
          <div className='flex flex-col gap-5 w-full'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-60' />
            ))}
          </div>
        ) : (
          <div className='space-y-5'>
            {bookings?.map(booking => (
              <BookingCard key={booking?.id} booking={booking} />
            ))}
          </div>
        )}
      </section>

      <NoContent isLoading={isLoading} data={data} content='Booking' />
    </DashboardLayout>
  )
}

export default withAuth(AllBookingsPage)
