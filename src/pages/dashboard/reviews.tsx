import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ReviewCard from '@/components/pages/dashboard/cards/ReviewCard'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetAllReviewsQuery } from '@/redux/features/reviewApi'
import { IReview } from '@/types/IReview'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'

interface Props {
  userData: IUser
}

function ReviewsPage({ userData }: Props) {
  const { data, isFetching, isError, error } = useGetAllReviewsQuery(getAccessToken())

  const reviews: IReview[] = data?.data

  return (
    <DashboardLayout title='Reviews | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Service Reviews</Typography>
        </div>

        {isFetching ? (
          <div className='flex flex-col gap-5 max-w-4xl'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-32' />
            ))}
          </div>
        ) : (
          <div className='space-y-3'>
            {reviews.map(review => (
              <ReviewCard key={review?.id} review={review} />
            ))}
          </div>
        )}
      </section>
      <NoContent isLoading={isFetching} data={data} content='Review' />
    </DashboardLayout>
  )
}

export default withAuth(ReviewsPage)
