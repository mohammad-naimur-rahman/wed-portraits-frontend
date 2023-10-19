import ButtonExtended from '@/components/ui/buttonExtended'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useDeleteBookingMutation, useUpdateBookingMutation } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'
import { IError } from '@/types/IError'
import { IService } from '@/types/IService'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  booking: IBooking
}

export default function BookingCard({ booking }: Props) {
  const service = booking?.service as IService

  const [showPrompt, setshowPrompt] = useState(false)
  const [deleteId, setdeleteId] = useState<string | null>(null)

  const [cancelBooking, { isError, isSuccess, error }] = useUpdateBookingMutation()
  const [deleteBooking, { isError: isDeleteError, isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeleteBookingMutation()

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Booking Cancelled Successfully')

    if (isDeleteError) toast.error(errorMessage(deleteError as IError))
    if (isDeleteSuccess) toast.success('Booking Deleted Successfully')
  }, [isError, error, isSuccess, isDeleteError, deleteError, isDeleteSuccess])

  return (
    <div className='border rounded-md flex items-center justify-between overflow-hidden bg-secondary'>
      <div className='flex'>
        <Img src={service?.image} alt={service?.title} className='h-60 w-auto aspect-video object-cover' />
        <div className='space-y-3 p-5 flex flex-col justify-center'>
          <Link href={`/services/${service?.id}`}>
            <Typography variant='h5' className='text-primary'>
              {service?.title}
            </Typography>
          </Link>
          <Typography variant='h5' className='pt-1'>
            Category: {service?.category}
          </Typography>
          <div className='flex items-center gap-8'>
            <Typography variant='h3' className='font-semibold'>
              ${service?.price}
            </Typography>
            <Typography variant='h5'>Event date: {format(new Date(booking?.date), 'dd MMM yyyy')}</Typography>
          </div>
          <Typography variant='h5'>Status: {transformRole(booking?.status)}</Typography>
        </div>
      </div>

      <div className='p-5 flex flex-col'>
        <ButtonExtended
          icon={<Trash2 />}
          size='default'
          variant='destructive'
          onClick={() => {
            setdeleteId(booking?.id)
            setshowPrompt(true)
          }}>
          Delete Booking
        </ButtonExtended>
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
