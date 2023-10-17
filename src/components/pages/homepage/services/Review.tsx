import Typography from '@/components/ui/typography'
import { IReview } from '@/types/IReview'
import { Star } from 'lucide-react'
import StarRatingComponent from 'react-star-rating-component'

interface Props {
  review: IReview
}

export default function Review({ review }: Props) {
  return (
    <div className='py-3'>
      <div className='flex gap-5'>
        <Typography variant='h5'>{review?.user?.name}</Typography>
        <StarRatingComponent
          // @ts-ignore
          className='star-rating [& label]:!cursor-default'
          name='reviewStar'
          starCount={5}
          value={review?.rating}
          renderStarIcon={() => <Star />}
        />
      </div>
      <p className='text-lg pt-2'>{review?.reviewText}</p>
    </div>
  )
}
