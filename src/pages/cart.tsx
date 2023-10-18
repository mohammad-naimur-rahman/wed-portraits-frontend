import animationData from '@/assets/lottie/empty.json'
import RootLayout from '@/components/layout/RootLayout'
import CartItem from '@/components/pages/cart/cartItem'
import Typography from '@/components/ui/typography'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { ICartItem } from '@/redux/features/cartSlice'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

export default function CartPage() {
  const { cartArr } = useAppSelector(state => state.cart)

  const [cartItems, setcartItems] = useState<ICartItem[]>([])

  useEffect(() => {
    if (cartArr?.length) {
      setcartItems(cartArr)
    }
  }, [cartArr])

  console.log(cartArr.length)

  return (
    <RootLayout title='Cart | Wed Portraits'>
      <section className='container py-10 min-h-[calc(100vh_-_64px)]'>
        <Typography className='pt-3 pb-8' variant='h2'>
          Cart
        </Typography>

        {cartItems?.length > 0 ? (
          <div className='space-y-5'>
            {cartItems?.map(service => (
              <CartItem key={service?.id} service={service} />
            ))}
          </div>
        ) : (
          <div className='max-w-xl mx-auto text-center'>
            <Typography variant='h3' className='italic'>
              Your cart is empty
            </Typography>
            <Lottie options={lottieDefaultOptions(animationData)} />
          </div>
        )}
      </section>
    </RootLayout>
  )
}
