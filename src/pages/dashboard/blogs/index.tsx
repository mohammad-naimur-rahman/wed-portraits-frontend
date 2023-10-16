import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ButtonExtended from '@/components/ui/buttonExtended'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import Typography from '@/components/ui/typography'
import { useGetAllBlogsQuery } from '@/redux/features/blogsApi'
import { IUser } from '@/types/IUser'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'

interface Props {
  userData: IUser
}

function BlogsPage({ userData }: Props) {
  const { data, isLoading, isError, error } = useGetAllBlogsQuery(undefined)
  const blogs = data?.data
  return (
    <DashboardLayout title='Blogs | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Blogs</Typography>
          <Link href='/dashboard/blogs/create'>
            <ButtonExtended icon={<FilePlus />}>Add New Blog</ButtonExtended>
          </Link>
        </div>
      </section>
      <NoContent isLoading={isLoading} data={data} content='Blog' />
    </DashboardLayout>
  )
}

export default withAuth(BlogsPage)
