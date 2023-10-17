import ButtonExtended from '@/components/ui/buttonExtended'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IService } from '@/types/IService'
import { ShoppingCart } from 'lucide-react'

interface Props {
  service: IService
}

export default function ServiceCard({ service }: Props) {
  const addToCart = (id: string) => {
    // TODO: Add to cart function
  }
  return (
    <div className='p-4'>
      <div
        className='shadow-lg rounded-lg bg-secondary overflow-hidden flex flex-col justify-between h-full gap-4 cursor-pointer'
        onClick={() => addToCart(service?.id)}>
        <Img src={service?.image} alt={service?.title} className='aspect-video object-cover' />
        <Typography variant='h5' className='px-3 pt-2'>
          {service?.title}
        </Typography>
        <Typography variant='body' className='px-3 text-justify font-light'>
          {service?.description?.slice(0, 200)}...
        </Typography>
        <div className='flex justify-between p-3'>
          <ButtonExtended icon={<ShoppingCart />}>Add to cart</ButtonExtended>
          <Typography variant='h4'>${service?.price}</Typography>
        </div>
      </div>
    </div>
  )
}
