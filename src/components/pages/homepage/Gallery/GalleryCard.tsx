import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IGallery } from '@/types/IGallery'
import { format } from 'date-fns'

interface Props {
  image: IGallery
}

export default function GalleryCard({ image }: Props) {
  return (
    <div className='flex flex-col gap-3 shadow-md relative group'>
      <Img src={image?.image} alt={image?.id} />
      <Typography
        variant='h5'
        className='tpx-3 py-2 absolute bottom-0 left-0 text-white bg-black bg-opacity-40 w-full text-center'>
        {image?.date ? format(new Date(image?.date), 'dd MMM yyyy') : null}
      </Typography>
    </div>
  )
}
