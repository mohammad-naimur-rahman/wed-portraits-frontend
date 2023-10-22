import EmptyLayout from '@/components/layout/EmptyLayout'
import { Button } from '@/components/ui/button'
import { envVars } from '@/configs'
import { useAppSelector } from '@/redux/hooks'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cartArr } = useAppSelector(state => state.cart)

  const [cart, setcart] = useState([])

  console.log(cartArr)
  const makePayment = async () => {
    const stripe = await loadStripe(envVars.STRIPE_PUBLISHABLE_KEY)

    const response = await axios.post(`${envVars.API_URL}/payment`, cartArr)

    const session = response?.data

    console.log(session)

    const result = stripe?.redirectToCheckout({
      sessionId: session.id,
    })

    if (result?.error) {
      console.log(result?.error)
    }
  }
  return (
    <EmptyLayout title='Payment'>
      <Button onClick={makePayment}>CheckoutPage</Button>
    </EmptyLayout>
  )
}
