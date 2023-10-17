import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import Link from 'next/link'

export default function HomepageHeader() {
  return (
    <header className='flex flex-col'>
      <div className='h-[calc(50vh_-_32px)] flex'>
        <div className='w-1/2 bg-black text-white text-right flex flex-col justify-center items-end gap-5 p-10'>
          <Typography variant='h1'>Wed Portraits Photography</Typography>
          <Typography variant='h5'>Memories Preserved Forever</Typography>
          <Typography variant='body' className='w-3/4'>
            Explore our exquisite photography services that capture the beauty, emotion, and essence of every moment.
            From weddings to family portraits, we specialize in turning memories into timeless treasures
          </Typography>
          <Link href='/services'>
            <button className='border-2 border-white rounded-full px-8 py-2 mt-4 hover:text-black hover:bg-white transition-all'>
              Explore Services
            </button>
          </Link>
        </div>
        <div className='w-1/2'>
          <Img src='/homepage/header1.jpg' alt='Wed Portraits' className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='h-[calc(50vh_-_32px)] flex'>
        <div className='w-1/2'>
          <Img src='/homepage/header2.jpg' alt='Wed Portraits' className='w-full h-full object-cover' />
        </div>
        <div className='w-1/2 bg-black text-white text-left flex flex-col justify-center items-start gap-5 p-10'>
          <Typography variant='h1'>Discover the World Through Our Lens</Typography>
          <Typography variant='h5'>Photography Beyond Borders</Typography>
          <Typography variant='body' className='w-3/4'>
            Join us on a visual journey across the globe. Our photographers have a passion for exploring diverse
            cultures and landscapes, bringing you captivating images that tell stories from every corner of the world
          </Typography>
          <Link href='/services'>
            <button className='border-2 border-white rounded-full px-8 py-2 mt-4 hover:text-black hover:bg-white transition-all'>
              Explore Services
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
