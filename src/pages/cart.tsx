import animationData from '@/assets/lottie/empty.json'
import RootLayout from '@/components/layout/RootLayout'
import CartItem from '@/components/pages/cart/cartItem'
import ButtonExtended from '@/components/ui/buttonExtended'
import Typography from '@/components/ui/typography'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { ICartItem } from '@/redux/features/cartSlice'
import { useAppSelector } from '@/redux/hooks'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { BadgeDollarSign, FolderSearch } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

export interface IBookItem {
  service: ICartItem
  date: Date
}

export default function CartPage() {
  const { asPath } = useRouter()
  const { cartArr } = useAppSelector(state => state.cart)

  const createInitialBookItem = (arr: ICartItem[]): IBookItem[] => {
    return arr?.map((service: ICartItem) => {
      return {
        service,
        date: new Date(),
      }
    })
  }

  const [cartItems, setcartItems] = useState<IBookItem[]>([])

  useEffect(() => {
    if (cartArr?.length) {
      const cartArray = createInitialBookItem(cartArr)
      setcartItems(cartArray)
    } else {
      setcartItems([])
    }
  }, [cartArr])

  const bookServices = () => {
    console.log(cartItems)
  }

  return (
    <RootLayout title='Cart | Wed Portraits'>
      <section className='container py-10 min-h-[calc(100vh_-_64px)]'>
        <Typography className='pt-3 pb-8' variant='h2'>
          Cart
        </Typography>

        {cartItems?.length > 0 ? (
          <div className='space-y-5'>
            {cartItems?.map(cartitem => (
              <CartItem key={cartitem?.service?.id} cartitem={cartitem} setcartItems={setcartItems} />
            ))}
          </div>
        ) : (
          <div className='max-w-xl mx-auto text-center'>
            <Typography variant='h3' className='italic'>
              Your cart is empty
            </Typography>

            <Link href='/services'>
              <ButtonExtended icon={<FolderSearch />} size='lg' className='mt-5'>
                Browse Services
              </ButtonExtended>
            </Link>
            <Lottie options={lottieDefaultOptions(animationData)} />
          </div>
        )}

        <div className='flex justify-end py-5'>
          {cartItems?.length > 0 ? (
            <>
              {getAccessToken() ? (
                <ButtonExtended icon={<BadgeDollarSign />} size='lg' onClick={bookServices}>
                  Book Services
                </ButtonExtended>
              ) : (
                <Link href={`/login?redirected=true&prevPath=${asPath}`}>
                  <ButtonExtended icon={<BadgeDollarSign />} size='lg'>
                    Login to Book Services
                  </ButtonExtended>
                </Link>
              )}
            </>
          ) : null}
        </div>
      </section>
    </RootLayout>
  )
}
