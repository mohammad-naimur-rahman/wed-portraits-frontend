import empty from '@/assets/lottie/empty.json'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import Lottie from 'react-lottie'

interface Props {
  isLoading: boolean
  data: {
    data: []
  }
  content: string
}

export default function NoContent({ isLoading, data, content }: Props) {
  return (
    <div>
      {!isLoading && !data?.data?.length ? (
        <div className='w-full h-[80vh] flex gap-3 flex-col items-center justify-center'>
          <h3 className='italic text-3xl mb-3'>No {content} Available!</h3>
          <div className='max-w-md'>
            <Lottie options={lottieDefaultOptions(empty)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
