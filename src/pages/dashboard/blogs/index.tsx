import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BlogCard from '@/components/pages/dashboard/cards/BlogCard'
import ButtonExtended from '@/components/ui/buttonExtended'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetAllBlogsQuery } from '@/redux/features/blogsApi'
import { IBlog } from '@/types/IBlog'
import { IUser } from '@/types/IUser'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'

interface Props {
  userData: IUser
}

function BlogsPage({ userData }: Props) {
  const { data, isFetching, isError, error } = useGetAllBlogsQuery(undefined)
  const blogs: IBlog[] = data?.data
  return (
    <DashboardLayout title='Blogs | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Blogs</Typography>
          <Link href='/dashboard/blogs/create'>
            <ButtonExtended icon={<FilePlus />}>Add New Blog</ButtonExtended>
          </Link>
        </div>

        {isFetching ? (
          <div className='grid grid-cols-card gap-7'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-[450px]' />
            ))}
          </div>
        ) : null}

        <div className='grid grid-cols-card gap-7'>
          {blogs?.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
      <NoContent isLoading={isFetching} data={data} content='Blog' />
    </DashboardLayout>
  )
}

export default withAuth(BlogsPage)
