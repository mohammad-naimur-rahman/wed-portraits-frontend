import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IBookItem } from '@/pages/cart'
import { removeFromCart } from '@/redux/features/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import { X } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import SelectDate from './SelectDate'

interface Props {
  cartitem: IBookItem
  setcartItems: Dispatch<SetStateAction<IBookItem[]>>
}

export default function CartItem({ cartitem, setcartItems }: Props) {
  const service = cartitem?.service

  const dispatch = useAppDispatch()

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
          <Button variant='outline' className='rounded-full self-start'>
            {service?.category}
          </Button>
          <Typography variant='h3'>${service?.price}</Typography>
          <SelectDate currentDate={cartitem?.date} service={service} setcartItems={setcartItems} />

          {/* <DatePicker form={form} name='date' /> */}
        </div>
      </div>

      <div className='p-5'>
        <Button size='icon' variant='destructive' onClick={() => dispatch(removeFromCart(service?.id))}>
          <X />
        </Button>
      </div>
    </div>
  )
}
