import animationData from '@/assets/lottie/payment_successful.json'
import EmptyLayout from '@/components/layout/EmptyLayout'
import ButtonExtended from '@/components/ui/buttonExtended'
import Typography from '@/components/ui/typography'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { BookMarked } from 'lucide-react'
import Link from 'next/link'
import Lottie from 'react-lottie'

export default function SuccessPaymentPage() {
  return (
    <EmptyLayout title='Payment Successful'>
      <div className='flex justify-center items-center w-full h-screen'>
        <div className='text-center space-y-8 italic'>
          <Typography variant='h2'>Payment Successful</Typography>
          <div className='max-w-lg h-auto'>
            <Lottie options={lottieDefaultOptions(animationData, false)} />
          </div>

          <Link href='/dashboard/my-bookings'>
            <ButtonExtended icon={<BookMarked />} className='mt-8'>
              View your bookings
            </ButtonExtended>
          </Link>
        </div>
      </div>
    </EmptyLayout>
  )
}
