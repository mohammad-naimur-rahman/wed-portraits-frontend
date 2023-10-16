import animationData from '@/assets/lottie/imageUploading.json'
import { IError } from '@/types/IError'
import { errorMessage } from '@/utils/error'
import { imageUploader } from '@/utils/form/imageUploader'
import { X } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../../button'
import Img from '../../img'
import { Input } from '../../input'
import Overlay from '../../overlay'

interface Props {
  image: string
  setimage: Dispatch<SetStateAction<string>>
}

export default function ImageUploaderComponent({ image, setimage }: Props) {
  const [isLoading, setisLoading] = useState(false)
  const hadleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setisLoading(true)
      const imageInfo = await imageUploader(e)
      setisLoading(false)
      setimage(imageInfo)
    } catch (err) {
      setisLoading(false)
      toast.error(errorMessage(err as IError))
    }
  }

  return (
    <>
      {image ? (
        <div className='flex w-full items-center gap-5 py-5'>
          <Img src={image} alt='Image' className='max-w-xs h-auto' sizes='20vw' width={300} height={300} />
          <Button size='icon' variant='ghost' onClick={() => setimage('')}>
            <X className='w-6 h-6' />
          </Button>
        </div>
      ) : (
        <Input type='file' onChange={hadleImageUpload} />
      )}
      <Overlay animationData={animationData} isOpen={isLoading} />
    </>
  )
}
