import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { cn } from '@/lib/utils'
import Lottie from 'react-lottie'

interface Props {
  animationData: any
  isOpen: boolean
}

export default function Overlay({ isOpen, animationData }: Props) {
  return (
    <div
      className={cn(
        'w-full min-h-screen flex items-center justify-center fixed left-0 top-0 backdrop-blur-md z-[100]',
        {
          hidden: !isOpen,
        }
      )}>
      <div className='max-w-md'>
        <Lottie options={lottieDefaultOptions(animationData)} />
      </div>
    </div>
  )
}
