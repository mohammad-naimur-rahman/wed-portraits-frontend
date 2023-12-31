import Reveal from '@/components/ui/reveal'
import Typography from '@/components/ui/typography'
import { IReview } from '@/types/IReview'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import TestimonialCard from './TestimonialCard'

interface Props {
  testimonials: IReview[]
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section className='container testimonial-slider-container'>
      <Reveal inViewClassName='animate-shrink'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          Testimonials
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          What our clients say about us
        </Typography>
      </Reveal>

      <Swiper
        effect='coverflow'
        grabCursor
        centeredSlides
        slidesPerView='auto'
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className='my-10'>
        {testimonials?.map(testimonial => (
          <SwiperSlide key={testimonial?.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
