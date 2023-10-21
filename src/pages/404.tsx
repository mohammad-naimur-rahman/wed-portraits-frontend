import animationData from '@/assets/lottie/404.json'
import EmptyLayout from '@/components/layout/EmptyLayout'
import ButtonExtended from '@/components/ui/buttonExtended'
import Typography from '@/components/ui/typography'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Lottie from 'react-lottie'

export default function NotFoundPage() {
  return (
    <EmptyLayout title='Page Not Found'>
      <div className='flex justify-center items-center w-full h-screen'>
        <div className='text-center space-y-8 italic'>
          <Typography variant='h2'>Page Not Found</Typography>
          <div className='max-w-lg h-auto'>
            <Lottie options={lottieDefaultOptions(animationData)} />
          </div>

          <Link href='/'>
            <ButtonExtended icon={<ArrowLeft />} className='mt-8'>
              Go Back Home
            </ButtonExtended>
          </Link>
        </div>
      </div>
    </EmptyLayout>
  )
}
