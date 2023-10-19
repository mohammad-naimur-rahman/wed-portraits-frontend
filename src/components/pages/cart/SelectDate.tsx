import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { IBookItem } from '@/pages/cart'
import { useGetBookingDatesQuery } from '@/redux/features/bookingApi'
import { ICartItem } from '@/redux/features/cartSlice'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Matcher } from 'react-day-picker'

interface Props {
  cartItem: IBookItem
  service: ICartItem
  setcartItems: Dispatch<SetStateAction<IBookItem[]>>
}

export default function SelectDate({ cartItem, service, setcartItems }: Props) {
  const currentDate = cartItem.date

  const { data } = useGetBookingDatesQuery(cartItem?.service?.id)
  const forbiddenDays: Matcher[] = data?.data

  const setDateForService = (val: Date) => {
    setcartItems(prev => {
      return prev.map(item => {
        if (item.service?.id === service?.id) {
          return { ...item, date: val }
        }
        return item
      })
    })
  }
  return (
    <>
      {forbiddenDays?.length ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('w-[280px] justify-start text-left font-normal', !currentDate && 'text-muted-foreground')}>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {currentDate ? format(currentDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={new Date(currentDate)}
              // @ts-ignore
              onSelect={setDateForService}
              disabled={[{ before: new Date() }, ...forbiddenDays]}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Skeleton className='w-[280px] h-10' />
      )}
    </>
  )
}
