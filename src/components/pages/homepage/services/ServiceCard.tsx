import ButtonExtended from '@/components/ui/buttonExtended'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IService } from '@/types/IService'
import { getCookie, setCookie } from 'cookies-next'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface Props {
  service: IService
}

export default function ServiceCard({ service }: Props) {
  const { push } = useRouter()

  const addToCart = (id: string) => {
    const existingCart = getCookie('cart')
    if (existingCart) {
      const cart: string[] = JSON.parse(existingCart)
      const ifExist = cart.find(c => c === id)
      if (ifExist) {
        toast.error('Item is already in the cart!')
        return
      }
      cart.push(id)
      setCookie('cart', JSON.stringify(cart))
      toast.success('Item added to cart!')
    } else {
      setCookie('cart', JSON.stringify([id]))
      toast.success('Item added to cart!')
    }
  }
  return (
    <div className='p-4'>
      <div
        className='shadow-lg rounded-lg bg-secondary overflow-hidden flex flex-col justify-between h-full gap-4 cursor-pointer'
        onClick={() => push(`/services/${service?.id}`)}>
        <Img src={service?.image} alt={service?.title} className='aspect-video object-cover' />
        <Typography variant='h5' className='px-3 pt-2'>
          {service?.title}
        </Typography>
        <Typography variant='body' className='px-3 text-justify font-light'>
          {service?.description?.slice(0, 200)}...
        </Typography>
        <div className='flex justify-between p-3'>
          <ButtonExtended icon={<ShoppingCart />} onClick={() => addToCart(service?.id)}>
            Add to cart
          </ButtonExtended>
          <Typography variant='h4'>${service?.price}</Typography>
        </div>
      </div>
    </div>
  )
}
