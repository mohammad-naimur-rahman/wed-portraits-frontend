import { IBookItem } from '@/pages/cart'
import { ICartItem } from '@/redux/features/cartSlice'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Props {
  currentDate: Date
  service: ICartItem
  setcartItems: Dispatch<SetStateAction<IBookItem[]>>
}

export default function SelectDate({ currentDate, service, setcartItems }: Props) {
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
        {/* @ts-ignore */}
        <Calendar mode='single' selected={new Date(currentDate)} onSelect={setDateForService} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
