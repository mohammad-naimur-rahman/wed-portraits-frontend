import Typography from '@/components/ui/typography'
import { IGallery } from '@/types/IGallery'
import GalleryCard from './GalleryCard'

interface Props {
  images: IGallery[]
}

export default function Gallery({ images }: Props) {
  return (
    <section className='container py-10'>
      <Typography className='text-center pt-8 pb-4' variant='h1'>
        Image Gallery
      </Typography>
      <Typography variant='h3' className='text-center pb-8'>
        Some of our past clicks
      </Typography>

      <div className='columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 break-inside-avoid-column'>
        {images?.map(image => (
          <GalleryCard key={image?.id} image={image} />
        ))}
      </div>
    </section>
  )
}
