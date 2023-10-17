import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useDeleteReviewMutation, useGetAllReviewsQuery } from '@/redux/features/reviewApi'
import { IError } from '@/types/IError'
import { IReview } from '@/types/IReview'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  userData: IUser
}

function ReviewsPage({ userData }: Props) {
  const { data, isFetching, isError, error } = useGetAllReviewsQuery(getAccessToken())
  const reviews: IReview[] = data?.data

  const [deleteReview, { isSuccess, isError: isDeleteError, error: deleteError }] = useDeleteReviewMutation()

  const [showPrompt, setshowPrompt] = useState(false)
  const [delelteId, setdelelteId] = useState<string | null>(null)

  useEffect(() => {
    if (isDeleteError) toast.error(errorMessage(deleteError as IError))
    if (isSuccess) toast.success('FAQ Deleted Successfully')
  }, [isDeleteError, deleteError, isSuccess])

  return (
    <DashboardLayout title='Reviews | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Service Reviews</Typography>
        </div>

        {isFetching ? (
          <div className='flex flex-col gap-5 max-w-4xl'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-12' />
            ))}
          </div>
        ) : (
          <h1>Hello</h1>
        )}
      </section>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteReview({
            id: delelteId,
            token: getAccessToken(),
          })
        }}
      />
      <NoContent isLoading={isFetching} data={data} content='Review' />
    </DashboardLayout>
  )
}

export default withAuth(ReviewsPage)
