import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'

interface CardProps {
  imgSrc: string
  title: string
  description: string
}

function Card({ imgSrc, title, description }: CardProps) {
  return (
    <div className='relative w-96'>
      <Img src={imgSrc} alt='Overview 1' />
      <div className='w-full h-full object-cover absolute top-0 left-0 bg-black opacity-50' />
      <div className='w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col p-5 text-center gap-4 text-white'>
        <Typography variant='h3'>{title}</Typography>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function Overview() {
  return (
    <section className='min-h-[70vh] relative text-white'>
      <Img
        src='/homepage/overviewBg.jpg'
        alt='We give quality photography service'
        className='w-full h-full object-cover absolute top-0 left-0'
      />
      <div className='w-full h-full object-cover absolute top-0 left-0 bg-black bg-opacity-10 text-white' />
      <Typography variant='h1' className='absolute left-1/2 transform -translate-x-1/2 top-16'>
        Your Photography Experts
      </Typography>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex'>
        <Card
          imgSrc='/homepage/overview2.jpg'
          title='What Do We Do?'
          description='We are in the business of capturing the most precious moments of your life and turning them into timeless memories.'
        />
        <Card
          imgSrc='/homepage/overview2.jpg'
          title='How Do We Work?'
          description='Our work is a blend of passion, creativity, and professionalism. We approach each project with dedication, ensuring that every photograph tells a story.'
        />
        <Card
          imgSrc='/homepage/overview2.jpg'
          title='Why Choose Us?'
          description="Our team's experience and commitment guarantee that your moments will be captured with the utmost care and attention to detail."
        />
      </div>
    </section>
  )
}
