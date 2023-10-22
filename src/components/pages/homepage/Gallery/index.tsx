import LightBox from '@/components/ui/lightbox'
import Reveal from '@/components/ui/reveal'
import Typography from '@/components/ui/typography'
import { IGallery } from '@/types/IGallery'
import { useState } from 'react'
import GalleryCard from './GalleryCard'

interface Props {
  images: IGallery[]
}

export default function Gallery({ images }: Props) {
  const [lightboxSrc, setlightboxSrc] = useState('')
  const [toggleLightbox, settoggleLightbox] = useState(false)

  const handleLightbox = (src: string) => {
    setlightboxSrc(src)
    settoggleLightbox(true)
  }

  return (
    <section className='container py-10'>
      <LightBox toggler={toggleLightbox} src={lightboxSrc} onClose={() => settoggleLightbox(false)} />
      <Reveal inViewClassName='animate-shrink'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          Image Gallery
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          Some of our past clicks
        </Typography>
      </Reveal>

      <div className='columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 break-inside-avoid-column'>
        {images?.map(image => (
          <GalleryCard key={image?.id} image={image} handleLightbox={handleLightbox} />
        ))}
      </div>
    </section>
  )
}
