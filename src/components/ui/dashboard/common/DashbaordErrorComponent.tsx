import animationData from '@/assets/lottie/something-went-wrong.json'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { RotateCw } from 'lucide-react'
import { useRouter } from 'next/router'
import Lottie from 'react-lottie'
import ButtonExtended from '../../buttonExtended'

interface Props {
  errorMessage: string
}

export default function DashbaordErrorComponent({ errorMessage }: Props) {
  const { reload } = useRouter()
  const reloadPage = () => {
    reload()
  }
  return (
    <section className='w-full min-h-screen-nav flex items-center justify-center'>
      <div className='max-w-screen-sm flex flex-col items-center'>
        <h3 className='text-3xl text-center text-destructive mb-8'>{errorMessage}</h3>
        <ButtonExtended icon={<RotateCw />} onClick={reloadPage}>
          Try again
        </ButtonExtended>
        <Lottie options={lottieDefaultOptions(animationData)} />
      </div>
    </section>
  )
}
