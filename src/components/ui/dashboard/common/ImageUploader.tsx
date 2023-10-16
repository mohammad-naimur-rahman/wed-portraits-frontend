import { imageUploader } from '@/utils/imageUploader'
import { X } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Button } from '../../button'
import Img from '../../img'
import { Input } from '../../input'

interface Props {
  image: string
  setimage: Dispatch<SetStateAction<string>>
}

export default function ImageUploader({ image, setimage }: Props) {
  const hadleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageInfo = await imageUploader(e)
    setimage(imageInfo)
  }
  return (
    <>
      {image ? (
        <div className='flex items-center gap-5 py-5'>
          <Img src={image} alt='Image' className='max-w-xs h-auto' sizes='20vw' width={300} height={300} />
          <Button size='icon' variant='ghost' onClick={() => setimage('')}>
            <X className='w-6 h-6' />
          </Button>
        </div>
      ) : (
        <Input type='file' onChange={hadleImageUpload} />
      )}
    </>
  )
}
