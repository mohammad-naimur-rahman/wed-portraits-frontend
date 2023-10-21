import ButtonExtended from '@/components/ui/buttonExtended'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useDeleteBookingMutation } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'
import { IError } from '@/types/IError'
import { IService } from '@/types/IService'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import UpdateBooking from '../bookings/UpdateBooking'

interface Props {
  booking: IBooking
}

export default function BookingCard({ booking }: Props) {
  const service = booking?.service as IService
  const user = booking?.user as IUser

  const [showPrompt, setshowPrompt] = useState(false)
  const [deleteId, setdeleteId] = useState<string | null>(null)

  const [deleteBooking, { isError: isDeleteError, isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeleteBookingMutation()

  useEffect(() => {
    if (isDeleteError) toast.error(errorMessage(deleteError as IError))
    if (isDeleteSuccess) toast.success('Booking Deleted Successfully')
  }, [isDeleteError, deleteError, isDeleteSuccess])

  return (
    <div className='border rounded-md flex items-center justify-between overflow-hidden bg-secondary'>
      <div className='flex flex-col lg:flex-row items-start lg:items-center w-full'>
        <Img
          src={service?.image}
          alt={service?.title}
          className='h-auto lg:h-60 w-full lg:w-auto aspect-video object-cover'
        />
        <div className='space-y-3 p-5 flex flex-col justify-center'>
          <Link href={`/services/${service?.id}`}>
            <Typography variant='h5' className='text-primary'>
              {service?.title}
            </Typography>
          </Link>
          <div className='flex gap-5 items-center flex-wrap'>
            <Typography variant='h5'>Category: {service?.category}</Typography>
            <Typography variant='h5'>Client: {user?.name}</Typography>
          </div>
          <div className='flex items-center gap-8 flex-wrap'>
            <Typography variant='h3' className='font-semibold'>
              ${service?.price}
            </Typography>
            <Typography variant='h5'>Event date: {format(new Date(booking?.date), 'dd MMM yyyy')}</Typography>
          </div>
          <Typography variant='h5'>Status: {transformRole(booking?.status)}</Typography>

          <div className='flex gap-3 flex-wrap'>
            <UpdateBooking booking={booking} />
            <ButtonExtended
              icon={<Trash2 />}
              size='sm'
              variant='destructive'
              disabled={booking?.status === 'ongoing' || booking?.status === 'confirmed'}
              onClick={() => {
                setdeleteId(booking?.id)
                setshowPrompt(true)
              }}>
              Delete Booking
            </ButtonExtended>
          </div>
        </div>
      </div>

      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteBooking({
            id: deleteId,
            token: getAccessToken(),
          })
        }}
      />
    </div>
  )
}
