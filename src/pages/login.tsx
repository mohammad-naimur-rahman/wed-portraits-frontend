import animationData from '@/assets/lottie/login.json'
import EmptyLayout from '@/components/layout/EmptyLayout'
import LoginForm from '@/components/pages/login/LoginForm'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { useRouter } from 'next/router'
import Lottie from 'react-lottie'

export default function LoginPage() {
  const { query } = useRouter()
  return (
    <EmptyLayout title='Login | Wed Portraits'>
      <section className='container flex flex-col md:flex-row min-h-screen items-center gap-5'>
        <div className='w-full md:w-1/2'>
          <div className='max-w-xs md:max-w-lg flex items-center justify-center mx-auto'>
            <Lottie options={lottieDefaultOptions(animationData, true)} height='90%' width='90%' />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <LoginForm query={query} />
        </div>
      </section>
    </EmptyLayout>
  )
}
