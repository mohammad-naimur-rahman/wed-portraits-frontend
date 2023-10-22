import Img from '@/components/ui/img'
import Reveal from '@/components/ui/reveal'
import Typography from '@/components/ui/typography'

interface CardProps {
  imgSrc: string
  title: string
  description: string
}

function Card({ imgSrc, title, description }: CardProps) {
  return (
    <div className='w-full sm:w-2/3 min-[950px]:w-[300px] xl:w-[400px] h-[350px] xl:h-[300px] relative'>
      <Img src={imgSrc} alt='Overview 1' className='w-full h-full object-cover absolute top-0 left-0' />
      <div className='w-full h-full absolute top-0 left-0 bg-opacity-40 bg-black' />
      <div className='w-full h-full transform absolute top-0 left-0 flex items-center justify-center flex-col p-5 text-center gap-4 text-white'>
        <Typography variant='h3'>{title}</Typography>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function Overview() {
  return (
    <section className='py-10'>
      <Reveal inViewClassName='animate-shrink'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          Overview
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          How We Work
        </Typography>
      </Reveal>

      <div className='flex flex-col min-[950px]:flex-row items-center justify-center'>
        <Card
          imgSrc='/homepage/overview1.jpg'
          title='What Do We Do?'
          description='We are in the business of capturing the most precious moments of your life and turning them into timeless memories.'
        />
        <Card
          imgSrc='/homepage/overview2.jpg'
          title='How Do We Work?'
          description='Our work is a blend of passion, creativity, and professionalism. We approach each project with dedication, ensuring that every photograph tells a story.'
        />
        <Card
          imgSrc='/homepage/overview3.jpg'
          title='Why Choose Us?'
          description="Our team's experience and commitment guarantee that your moments will be captured with the utmost care and attention to detail."
        />
      </div>
    </section>
  )
}
