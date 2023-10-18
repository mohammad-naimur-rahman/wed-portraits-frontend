import RootLayout from '@/components/layout/RootLayout'
import BlogCard from '@/components/pages/homepage/Blogs/BlogCard'
import Typography from '@/components/ui/typography'
import { IBlog } from '@/types/IBlog'
import { IResponse } from '@/types/IResponse'
import { fetcher } from '@/utils/fetcher'

interface Props {
  blogs: IResponse<IBlog>
}

export default function Blogs({ blogs }: Props) {
  const allBlogs: IBlog[] = blogs?.data
  return (
    <RootLayout title='Blogs | Wed Portraits'>
      <section className='container py-5'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          All Blogs
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          Read Our Blogs
        </Typography>

        <div className='grid grid-cols-2'>
          {allBlogs?.map(blog => (
            <BlogCard key={blog?.id} blog={blog} />
          ))}
        </div>
      </section>
    </RootLayout>
  )
}

export async function getStaticProps() {
  const blogs = await fetcher('blogs')
  return {
    props: {
      blogs,
    },
    revalidate: 60,
  }
}
