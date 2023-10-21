import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import MyBookingCard from '@/components/pages/dashboard/cards/MyBookingCard'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { bookingStatusArr } from '@/constants/dashboard/bookingStatusArray'
import { useGetAllBookingsQuery } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { qs } from '@/utils/form/qs'
import { transformRole } from '@/utils/transformRole'
import { useState } from 'react'

interface Props {
  userData: IUser
}

function MyBookingsPage({ userData }: Props) {
  const [bookingStatus, setbookingStatus] = useState('all')
  const { data, isLoading, error, isError } = useGetAllBookingsQuery({
    query: qs({ status: bookingStatus }),
    token: getAccessToken(),
  })

  const bookings: IBooking[] = data?.data

  return (
    <DashboardLayout title='My Bookings | Dashboard' userRole={userData?.role} error={error} isError={isError}>
      <section className='p-5'>
        <div className='flex flex-wrap items-center gap-5 pt-3 pb-8'>
          <Typography variant='h2'>All Bookings</Typography>

          <Select onValueChange={val => setbookingStatus(val)} defaultValue={bookingStatus}>
            <SelectTrigger className='max-w-xs'>
              <SelectValue placeholder='Booking Status' />
            </SelectTrigger>
            <SelectContent className='max-w-xs'>
              <SelectGroup>
                <SelectLabel>Booking Status</SelectLabel>
                {['all', ...bookingStatusArr].map(status => (
                  <SelectItem value={status} key={status}>
                    {transformRole(status)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <div className='flex flex-col gap-5 w-full'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-60' />
            ))}
          </div>
        ) : (
          <div className='space-y-5'>
            {bookings?.map(booking => (
              <MyBookingCard key={booking?.id} booking={booking} />
            ))}
          </div>
        )}
      </section>

      <NoContent isLoading={isLoading} data={data} content='Booking' />
    </DashboardLayout>
  )
}

export default withAuth(MyBookingsPage)
