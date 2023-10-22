import animationData from '@/assets/lottie/empty.json'
import RootLayout from '@/components/layout/RootLayout'
import CartItem from '@/components/pages/cart/cartItem'
import ButtonExtended from '@/components/ui/buttonExtended'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Typography from '@/components/ui/typography'
import { envVars } from '@/configs'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { ICartItem, emptyCart } from '@/redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { Album, FolderSearch } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Lottie from 'react-lottie'

export interface IBookItem {
  service: ICartItem
  date: Date
}

export default function CartPage() {
  const { push, asPath } = useRouter()
  const dispatch = useAppDispatch()
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

  const [showPrompt, setshowPrompt] = useState(false)

  useEffect(() => {
    if (cartArr?.length) {
      const cartArray = createInitialBookItem(cartArr)
      setcartItems(cartArray)
    } else {
      setcartItems([])
    }
  }, [cartArr])

  const createBookingRequest = async (item: IBookItem) => {
    const payload = {
      service: item.service.id,
      date: new Date(item.date),
      status: 'pending',
    }
    const result = await axios.post(`${envVars.API_URL}/bookings`, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })

    if (result.status === 201) {
      toast.success('Booking Successful')
      dispatch(emptyCart())
      push('/dashboard/my-bookings')
    }

    return result
  }

  const requests = cartItems.map(item => () => createBookingRequest(item))

  const bookServices = async () => {
    try {
      const stripe = await loadStripe(envVars.STRIPE_PUBLISHABLE_KEY)
      const checkoutSession = await axios.post(`${envVars.API_URL}/payment`, cartItems, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })

      if (checkoutSession.status === 201) {
        toast.success(checkoutSession?.data?.message)
        dispatch(emptyCart())
      }

      await stripe?.redirectToCheckout({
        sessionId: checkoutSession?.data?.data,
      })
    } catch (error) {
      toast.error(errorMessage(error as IError))
    }
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
              <CartItem key={cartitem?.service?.id} cartItem={cartitem} setcartItems={setcartItems} />
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
                <ButtonExtended icon={<Album />} size='lg' onClick={() => setshowPrompt(true)}>
                  Proceed to payment
                </ButtonExtended>
              ) : (
                <Link href={`/login?redirected=true&prevPath=${asPath}`}>
                  <ButtonExtended icon={<Album />} size='lg'>
                    Login to Book Services
                  </ButtonExtended>
                </Link>
              )}
            </>
          ) : null}
        </div>
      </section>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          bookServices()
        }}
      />
    </RootLayout>
  )
}
