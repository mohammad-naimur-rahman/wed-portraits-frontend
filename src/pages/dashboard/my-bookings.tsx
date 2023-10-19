import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import MyBookingCard from '@/components/pages/dashboard/cards/MyBookingCard'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import Typography from '@/components/ui/typography'
import { useGetAllBookingsQuery } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'

import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'

interface Props {
  userData: IUser
}

function MyBookingsPage({ userData }: Props) {
  const { data, isLoading, error, isError } = useGetAllBookingsQuery(getAccessToken())
  const bookings: IBooking[] = data?.data

  return (
    <DashboardLayout title='My Bookings | Dashboard' userRole={userData?.role} error={error} isError={isError}>
      <section className='p-5'>
        <Typography className='pt-3 pb-8' variant='h2'>
          My Bookings
        </Typography>
        <div className='space-y-5'>
          {bookings?.map(booking => (
            <MyBookingCard key={booking?.id} booking={booking} />
          ))}
        </div>
      </section>

      <NoContent isLoading={isLoading} data={data} content='Booking' />
    </DashboardLayout>
  )
}

export default withAuth(MyBookingsPage)
