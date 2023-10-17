import { getCookie } from 'cookies-next'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../button'

export default function Cart() {
  const ifCartExist = getCookie('cart')
  const cart = ifCartExist ? JSON.parse(ifCartExist) : []
  return (
    <Link href='/cart'>
      <Button size='icon' variant='outline' className='relative'>
        <ShoppingBasket />
        {cart?.length ? (
          <span className='absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white'>
            {cart?.length}
          </span>
        ) : null}
      </Button>
    </Link>
  )
}
