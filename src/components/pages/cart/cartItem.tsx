import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { ICartItem, removeFromCart } from '@/redux/features/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import { X } from 'lucide-react'

interface Props {
  service: ICartItem
}
export default function CartItem({ service }: Props) {
  const dispatch = useAppDispatch()
  return (
    <div className='border rounded-md flex items-center justify-between'>
      <div className='flex'>
        <Img src={service?.image} alt={service?.title} className='h-56 w-auto aspect-video object-cover' />
        <div className='space-y-3 p-5'>
          <Typography variant='h5'>{service?.title}</Typography>
          <Button variant='outline' className='rounded-full'>
            {service?.category}
          </Button>
          <Typography variant='h3'>${service?.price}</Typography>
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
