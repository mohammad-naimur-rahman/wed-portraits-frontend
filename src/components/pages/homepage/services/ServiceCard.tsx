import ButtonExtended from '@/components/ui/buttonExtended'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { addToCart } from '@/redux/features/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import { IService } from '@/types/IService'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/router'

interface Props {
  service: IService
}

export default function ServiceCard({ service }: Props) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  return (
    <div className='p-4'>
      <div className='shadow-lg rounded-lg bg-secondary overflow-hidden flex flex-col justify-between h-full gap-4'>
        <Img src={service?.image} alt={service?.title} className='aspect-video object-cover' />

        <Typography
          variant='h4'
          className='px-3 pt-2 text-primary cursor-pointer'
          // @ts-ignore
          onClick={() => push(`/services/${service?.id}`)}>
          {service?.title}
        </Typography>
        <Typography variant='body' className='px-3 text-justify font-light'>
          {service?.description?.slice(0, 200)}...
        </Typography>
        <div className='flex justify-between p-3'>
          {service?.status === 'upcoming' ? (
            <span className='opacity-0'>Can&apos;t book</span>
          ) : (
            <ButtonExtended
              icon={<ShoppingCart />}
              onClick={e => {
                e.stopPropagation()
                dispatch(
                  addToCart({
                    id: service?.id,
                    title: service?.title,
                    category: service?.category,
                    image: service?.image,
                    price: service?.price,
                  })
                )
              }}>
              Add to cart
            </ButtonExtended>
          )}

          <Typography variant='h4'>${service?.price}</Typography>
        </div>
      </div>
    </div>
  )
}
