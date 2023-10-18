import { initializeCart } from '@/redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '../button'

export default function Cart() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeCart())
  }, [dispatch])

  const { cartArr } = useAppSelector(state => state.cart)

  return (
    <Link href='/cart'>
      <Button size='icon' variant='outline' className='relative'>
        <ShoppingBasket />
        {cartArr?.length ? (
          <span className='absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white'>
            {cartArr?.length}
          </span>
        ) : null}
      </Button>
    </Link>
  )
}
