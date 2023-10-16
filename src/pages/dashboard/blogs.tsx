import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { useGetAllBlogsQuery } from '@/redux/features/blogsApi'
import { IUser } from '@/types/IUser'

interface Props {
  userData: IUser
}

function BlogsPage({ userData }: Props) {
  const { data, isLoading, isError, error } = useGetAllBlogsQuery(undefined)
  const feedbacks = data?.data
  return (
    <DashboardLayout title='Services | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <NoContent isLoading={isLoading} data={data} content='Feedback' />
    </DashboardLayout>
  )
}

export default withAuth(BlogsPage)
