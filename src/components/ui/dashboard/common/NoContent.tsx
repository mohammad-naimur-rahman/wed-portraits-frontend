import empty from '@/assets/lottie/empty.json'
import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { FilePlus2 } from 'lucide-react'
import Link from 'next/link'
import Lottie from 'react-lottie'
import ButtonExtended from '../../buttonExtended'

interface Props {
  isLoading: boolean
  data: {
    data: []
  }
  content: string
  createNewLink: string
}

export default function NoContent({ isLoading, data, content, createNewLink }: Props) {
  return (
    <div>
      {!isLoading && !data?.data?.length ? (
        <div className='w-full h-[80vh] flex gap-3 flex-col items-center justify-center'>
          <h3 className='italic text-3xl mb-3'>No {content} Available!</h3>
          <Link href={createNewLink}>
            <ButtonExtended icon={<FilePlus2 />}>Create New Content</ButtonExtended>
          </Link>
          <div className='max-w-md'>
            <Lottie options={lottieDefaultOptions(empty)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
