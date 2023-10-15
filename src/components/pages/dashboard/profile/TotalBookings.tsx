import { Skeleton } from '@/components/ui/skeleton'
import { IUser } from '@/types/IUser'

interface Props {
  userDetails: IUser
  isLoading: boolean
}

export default function TotalBookings({ userDetails, isLoading }: Props) {
  if (isLoading) {
    return <Skeleton className='mb-2 w-64 h-5' />
  }
  return (
    <>
      {userDetails?.role === 'user' ? (
        <p className='mb-2 text-lg text-secondary-foreground'>
          <span className='font-semibold'>Total bookings</span>{' '}
          {userDetails?.bookings?.length ? userDetails?.bookings?.length : 'No bookings yet'}
        </p>
      ) : null}
    </>
  )
}
