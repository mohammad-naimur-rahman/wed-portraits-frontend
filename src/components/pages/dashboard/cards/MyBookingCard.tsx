import ButtonExtended from '@/components/ui/buttonExtended'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useUpdateBookingMutation } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'
import { IError } from '@/types/IError'
import { IService } from '@/types/IService'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { format } from 'date-fns'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  booking: IBooking
}

export default function MyBookingCard({ booking }: Props) {
  const service = booking?.service as IService

  const [showPrompt, setshowPrompt] = useState(false)
  const [updateBookingId, setupdateBookingId] = useState<string | null>(null)

  const [cancelBooking, { isError, isSuccess, error }] = useUpdateBookingMutation()

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Booking Cancelled Successfully')
  }, [isError, error, isSuccess])

  return (
    <div className='border rounded-md flex flex-col xl:flex-row items-center justify-between overflow-hidden bg-secondary'>
      <div className='flex flex-col lg:flex-row w-full'>
        <Img
          src={service?.image}
          alt={service?.title}
          className='w-full h-auto lg:h-60 lg:w-auto aspect-video object-cover'
        />
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

      <div className='p-5'>
        <ButtonExtended
          icon={<XCircle />}
          size='default'
          variant='destructive'
          onClick={() => {
            setupdateBookingId(booking?.id)
            setshowPrompt(true)
          }}
          disabled={booking?.status !== 'pending'}>
          Cancel Booking
        </ButtonExtended>
      </div>

      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          cancelBooking({
            id: updateBookingId,
            payload: {
              status: 'cancelled',
            },
            token: getAccessToken(),
          })
        }}
      />
    </div>
  )
}
