import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import clsx from 'clsx'
import Lottie from 'react-lottie'

interface Props {
  animationData: any
  isOpen: boolean
}

export default function Overlay({ isOpen, animationData }: Props) {
  return (
    <div
      className={clsx('w-full h-screen flex items-center justify-center fixed left-0 top-0 backdrop-blur-md z-10', {
        hidden: !isOpen,
      })}>
      <div className='max-w-md'>
        <Lottie options={lottieDefaultOptions(animationData)} />
      </div>
    </div>
  )
}
