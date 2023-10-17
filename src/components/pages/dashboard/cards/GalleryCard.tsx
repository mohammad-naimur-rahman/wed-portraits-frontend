import { Button } from '@/components/ui/button'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useDeleteGalleryMutation } from '@/redux/features/galleryApi'
import { IError } from '@/types/IError'
import { IGallery } from '@/types/IGallery'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import UpdateGalleryImage from '../gallery/UpdateGalleryImage'

interface Props {
  image: IGallery
}

export default function GalleryCard({ image }: Props) {
  const [deleteImage, { isError, error, isSuccess }] = useDeleteGalleryMutation()

  const [showPrompt, setshowPrompt] = useState(false)
  const [delelteId, setdelelteId] = useState<string | null>(null)

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Image Deleted Successfully')
  }, [isError, error, isSuccess])

  return (
    <div className='flex flex-col gap-3 shadow-md relative group'>
      <Img src={image?.image} alt={image?.id} />
      <Typography
        variant='h5'
        className='tpx-3 py-2 absolute bottom-0 left-0 text-white bg-black bg-opacity-40 w-full text-center'>
        {image?.date ? format(new Date(image?.date), 'dd MMM yyyy') : null}
      </Typography>

      <div className='absolute top-0 right-0 p-2 space-x-2 opacity-0 group-hover:opacity-100'>
        <UpdateGalleryImage galleryImage={image} />
        <Button
          variant='destructive'
          size='icon'
          className='min-w-[40px]'
          onClick={() => {
            setdelelteId(image?.id)
            setshowPrompt(true)
          }}>
          <Trash2 />
        </Button>
      </div>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteImage({
            id: delelteId,
            token: getAccessToken(),
          })
        }}
      />
    </div>
  )
}
