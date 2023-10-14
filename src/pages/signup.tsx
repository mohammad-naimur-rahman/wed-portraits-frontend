import animationData from '@/assets/lottie/signup.json'
import EmptyLayout from '@/components/layout/EmptyLayout'
import SignupForm from '@/components/pages/signup/SignupForm'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { useRouter } from 'next/router'
import Lottie from 'react-lottie'

export default function SignupPage() {
  const { query } = useRouter()
  return (
    <EmptyLayout title='Signup | Wed Portraits'>
      <section className='container flex flex-col md:flex-row min-h-screen items-center gap-5'>
        <div className='w-full order-2 md:order-1 md:w-1/2'>
          <SignupForm query={query} />
        </div>
        <div className='w-full order-1 md:order-2 md:w-1/2'>
          <div className='max-w-xs md:max-w-lg flex items-center justify-center mx-auto'>
            <Lottie options={lottieDefaultOptions(animationData)} />
          </div>
        </div>
      </section>
    </EmptyLayout>
  )
}
