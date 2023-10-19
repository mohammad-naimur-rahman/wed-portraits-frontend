import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IReview } from '@/types/IReview'

interface Props {
  testimonial: IReview
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className='space-y-3 p-3 text-center min-h-[400px] border rounded-md shadow-lg bg-secondary'>
      <div className='mx-auto w-20 h-20 rounded-full'>
        {testimonial?.user?.image ? (
          <Img
            src={testimonial?.user?.image!}
            alt={testimonial?.user?.name}
            className='w-full h-full object-cover rounded-full'
          />
        ) : (
          <Img src='/avatar.png' alt={testimonial?.user?.name} className='w-full h-full object-cover rounded-full' />
        )}
      </div>
      <Typography variant='h5' className='text-primary'>
        {testimonial?.user?.name}
      </Typography>
      <p>{testimonial?.reviewText}</p>
    </div>
  )
}
