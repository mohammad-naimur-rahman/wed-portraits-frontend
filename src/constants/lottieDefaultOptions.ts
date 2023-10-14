import { ILottie } from '@/types/ILottie'

export const lottieDefaultOptions = (animationData: any, loop: boolean = true, autoplay: boolean = true): ILottie => ({
  loop,
  autoplay,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
})
