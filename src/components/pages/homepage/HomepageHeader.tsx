import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import Link from 'next/link'

export default function HomepageHeader() {
  return (
    <header className='flex flex-col'>
      <div className='lg:h-auto xl:h-[calc(50vh_-_32px)] flex flex-col lg:flex-row'>
        <div className='w-full lg:w-1/2 text-right flex flex-col justify-center items-end gap-3 2xl:gap-5 p-7 2xl:p-10'>
          <Typography variant='h1'>Wed Portraits Photography</Typography>
          <Typography variant='h5'>Memories Preserved Forever</Typography>
          <Typography variant='body' className='w-3/4'>
            Explore our exquisite photography services that capture the beauty, emotion, and essence of every moment.
            From weddings to family portraits, we specialize in turning memories into timeless treasures
          </Typography>
          <Link href='/services'>
            <button className='border-2 border-black dark:border-white rounded-full px-8 py-2 mt-4 hover:text-white dark:hover:text-black hover:bg-foreground transition-all'>
              Explore Services
            </button>
          </Link>
        </div>
        <div className='w-full lg:w-1/2'>
          <Img src='/homepage/header1.jpg' alt='Wed Portraits' className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='lg:h-auto xl:h-[calc(50vh_-_32px)] flex flex-col lg:flex-row'>
        <div className='w-full lg:w-1/2 order-2 lg:order-1'>
          <Img src='/homepage/header2.jpg' alt='Wed Portraits' className='w-full h-full object-cover' />
        </div>
        <div className='w-full lg:w-1/2 text-left flex flex-col justify-center items-start gap-3 2xl:gap-5 p-7 2xl:p-10 order-1 lg:order-2'>
          <Typography variant='h1'>Discover the World Through Our Lens</Typography>
          <Typography variant='h5'>Photography Beyond Borders</Typography>
          <Typography variant='body' className='w-3/4'>
            Join us on a visual journey across the globe. Our photographers have a passion for exploring diverse
            cultures and landscapes, bringing you captivating images that tell stories from every corner of the world
          </Typography>
          <Link href='/services'>
            <button className='border-2 border-black dark:border-white rounded-full px-8 py-2 mt-4 hover:text-white dark:hover:text-black hover:bg-foreground transition-all'>
              Explore Services
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
