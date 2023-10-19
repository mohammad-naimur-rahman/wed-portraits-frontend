import ButtonExtended from '@/components/ui/buttonExtended'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import Typography from '@/components/ui/typography'
import { useCreateReviewMutation } from '@/redux/features/reviewApi'
import { IError } from '@/types/IError'
import { IReview } from '@/types/IReview'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { getUserId } from '@/utils/auth/getUserId'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star, Stars } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import StarRatingComponent from 'react-star-rating-component'
import { z } from 'zod'

interface Props {
  serviceId: string
  reviews: IReview[]
  setreviews: React.Dispatch<React.SetStateAction<IReview[]>>
}

export default function PostReview({ serviceId, reviews, setreviews }: Props) {
  const { asPath } = useRouter()
  const [postReview, { data, isError, error, isSuccess }] = useCreateReviewMutation()

  const createReviewZSchema = z.object({
    reviewText: z.string(),
  })

  const [starRating, setstarRating] = useState(0)

  const form = useForm<z.infer<typeof createReviewZSchema>>({
    resolver: zodResolver(createReviewZSchema),
  })

  const onSubmit = (values: z.infer<typeof createReviewZSchema>) => {
    if (!starRating) {
      toast.error('Please give a star rating!')
    }
    postReview({
      payload: { ...values, service: serviceId, user: getUserId(), rating: starRating },
      token: getAccessToken(),
    })
  }

  useEffect(() => {
    if (isError) {
      form.reset()
      toast.error(errorMessage(error as IError))
    }
    if (isSuccess) {
      form.reset()
      toast.success('Review Posted Successfully!')
      setreviews([data?.data as IReview, ...reviews])
    }
  }, [isError, error, isSuccess, form])

  return (
    <div className='space-y-4'>
      <Typography variant='h3'>Post a review</Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <StarRatingComponent
            // @ts-ignore
            className='star-rating'
            name='rate1'
            starCount={5}
            value={starRating}
            renderStarIcon={() => <Star />}
            onStarClick={(rating: number) => setstarRating(rating)}
          />
          <FormField
            control={form.control}
            name='reviewText'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder='Review Text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {getAccessToken() ? (
            <ButtonExtended icon={<Stars />} type='submit' className='self-start'>
              Post Review
            </ButtonExtended>
          ) : (
            <Link href={`/login?redirected=true&prevPath=${asPath}`}>
              <ButtonExtended icon={<Stars />} className='self-start'>
                Login to Post Review
              </ButtonExtended>
            </Link>
          )}
        </form>
      </Form>
    </div>
  )
}
