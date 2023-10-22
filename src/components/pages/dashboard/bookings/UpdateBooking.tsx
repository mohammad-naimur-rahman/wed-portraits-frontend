import animationData from '@/assets/lottie/updating.json'
import ButtonExtended from '@/components/ui/buttonExtended'
import { DatePicker } from '@/components/ui/date-picker'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Overlay from '@/components/ui/overlay'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateBookingMutation } from '@/redux/features/bookingApi'
import { IBooking } from '@/types/IBooking'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilePlus2, PenSquare } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { getUpdateStatusArr } from './utils'

interface Props {
  booking: IBooking
}

export default function UpdateBooking({ booking }: Props) {
  const [updateBooking, { isLoading, isSuccess, isError, error }] = useUpdateBookingMutation()

  const updateBookingZSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'ongoing', 'fulfilled']),
    date: z.date(),
  })

  const form = useForm<z.infer<typeof updateBookingZSchema>>({
    resolver: zodResolver(updateBookingZSchema),
    defaultValues: {
      status: booking?.status,
      date: new Date(booking?.date),
    },
  })

  const onSubmit = (values: z.infer<typeof updateBookingZSchema>) => {
    updateBooking({ payload: values, token: getAccessToken(), id: booking?.id })
  }

  useEffect(() => {
    if (isError) {
      form.reset()
      toast.error(errorMessage(error as IError))
    }
    if (isSuccess) {
      form.reset()
      toast.success('Booking updated Successfully!')
    }
  }, [isError, error, isSuccess, form])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended
            icon={<PenSquare />}
            className='min-w-[40px]'
            size='sm'
            disabled={['confirmed', 'cancelled', 'fulfilled'].includes(booking?.status)}>
            Update Booking
          </ButtonExtended>
        </DialogTrigger>
        <DialogContent className='max-w-2xl overflow-auto max-h-[calc(100dvh_-_20px)]'>
          <DialogHeader>
            <DialogTitle>Update Booking</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Role' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Role</SelectLabel>
                            {getUpdateStatusArr(booking?.status).map(status => (
                              <SelectItem value={status} key={status}>
                                {transformRole(status)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DatePicker form={form} label='Capture Date' name='date' />

              <DialogClose>
                <ButtonExtended icon={<FilePlus2 />} type='submit'>
                  Update Booking
                </ButtonExtended>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Overlay isOpen={isLoading} animationData={animationData} />
    </>
  )
}
