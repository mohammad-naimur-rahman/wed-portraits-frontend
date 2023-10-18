import ButtonExtended from '@/components/ui/buttonExtended'
import { Separator } from '@/components/ui/separator'
import Typography from '@/components/ui/typography'
import { useDeleteReviewMutation } from '@/redux/features/reviewApi'
import { IError } from '@/types/IError'
import { IReview } from '@/types/IReview'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { Star, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import StarRatingComponent from 'react-star-rating-component'

interface Props {
  review: IReview
}

export default function ReviewCard({ review }: Props) {
  const [deleteReview, { isError, error, isSuccess }] = useDeleteReviewMutation()

  console.log(isSuccess)

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Review Deleted Successfully!')
  }, [isError, error, isSuccess])

  return (
    <div className='border rounded-md p-3 space-y-2'>
      <Link href={`/services/${review?.service?.id}`}>
        <Typography variant='body' className='text-primary font-semibold'>
          {review?.service?.title}
        </Typography>
      </Link>
      <Separator />

      <div className='flex gap-10 items-center'>
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
      <p>{review?.reviewText}</p>
      <ButtonExtended
        icon={<Trash2 />}
        variant='destructive'
        type='button'
        onClick={() => deleteReview({ id: review?.id, token: getAccessToken() })}>
        Delete Review
      </ButtonExtended>
    </div>
  )
}
