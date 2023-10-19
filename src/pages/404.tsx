import ButtonExtended from '@/components/ui/buttonExtended'
import Typography from '@/components/ui/typography'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='text-center space-y-8 italic'>
        <Typography variant='h2'>Page Not Found</Typography>
        <Typography variant='h1' className='text-destructive'>
          404
        </Typography>
        <Link href='/'>
          <ButtonExtended icon={<ArrowLeft />} className='mt-8'>
            Go Back Home
          </ButtonExtended>
        </Link>
      </div>
    </div>
  )
}
