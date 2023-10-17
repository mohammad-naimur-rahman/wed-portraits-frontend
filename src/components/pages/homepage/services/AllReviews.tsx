import { IReview } from '@/types/IReview'
import Review from './Review'

interface Props {
  reviews: IReview[]
}

export default function AllReviews({ reviews }: Props) {
  console.log(reviews)
  return (
    <div>
      {reviews?.map(review => (
        <Review review={review} key={review?.id} />
      ))}
    </div>
  )
}
