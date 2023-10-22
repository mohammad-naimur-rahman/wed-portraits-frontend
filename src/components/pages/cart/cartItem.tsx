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
  cartItem: IBookItem
  setcartItems: Dispatch<SetStateAction<IBookItem[]>>
}

export default function CartItem({ cartItem, setcartItems }: Props) {
  const service = cartItem?.service

  const dispatch = useAppDispatch()

  return (
    <div className='border rounded-md flex flex-col sm:flex-row items-center justify-between overflow-hidden bg-secondary relative'>
      <div className='flex flex-col items-center min-[1000px]:flex-row w-full'>
        <Img
          src={service?.image}
          alt={service?.title}
          className='h-full min-[1000px]:h-60 w-full min-[1000px]:w-auto aspect-video object-cover'
        />
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
          <SelectDate cartItem={cartItem} service={service} setcartItems={setcartItems} />
        </div>
      </div>

      <div className='p-5 top-0 right-0 absolute min-[1000px]:static'>
        <Button size='icon' variant='destructive' onClick={() => dispatch(removeFromCart(service?.id))}>
          <X />
        </Button>
      </div>
    </div>
  )
}
