import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { useGetAllFeedbacksQuery } from '@/redux/features/feedbacksApi'

import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'

interface Props {
  userData: IUser
}

function FeedbackPage({ userData }: Props) {
  const { data, isLoading, isError, error } = useGetAllFeedbacksQuery(getAccessToken())
  const feedbacks = data?.data
  return (
    <DashboardLayout title='Services | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <NoContent isLoading={isLoading} data={data} content='Feedback' />
    </DashboardLayout>
  )
}

export default withAuth(FeedbackPage)
