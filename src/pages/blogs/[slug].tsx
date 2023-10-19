import RootLayout from '@/components/layout/RootLayout'
import BlogCard from '@/components/pages/homepage/Blogs/BlogCard'
import ButtonExtended from '@/components/ui/buttonExtended'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import styles from '@/styles/markdown.module.scss'
import { IBlog } from '@/types/IBlog'
import { IResponse, ISingleResponse } from '@/types/IResponse'
import { fetcher } from '@/utils/fetcher'
import { qs } from '@/utils/form/qs'
import { FolderSearch } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Props {
  blog: ISingleResponse<IBlog>
  otherBlogs: IResponse<IBlog>
}

export default function BlogDetailsPage({ blog: blogData, otherBlogs }: Props) {
  const blog = blogData?.data
  const otherBlogsData = otherBlogs?.data
  const allOtherBlogs = otherBlogsData?.filter(b => b.id !== blog.id)
  return (
    <RootLayout title={blog?.title}>
      <main className='flex flex-col gap-10 p-5 mx-auto'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <Typography variant='h2' className='py-3 text-primary'>
            {blog?.title}
          </Typography>
          <Img src={blog?.image} alt={blog?.title} className='w-full h-auto' />

          <ReactMarkdown className={styles.markdown}>{blog?.content}</ReactMarkdown>
        </div>

        <Typography className='text-center pt-8 pb-4' variant='h2'>
          Other Blogs
        </Typography>

        <div className='grid grid-cols-1 md:grid-cols-2 container'>
          {allOtherBlogs?.map(blog => (
            <BlogCard key={blog?.id} blog={blog} />
          ))}
        </div>

        <div className='flex justify-center py-5'>
          <Link href='/blogs'>
            <ButtonExtended icon={<FolderSearch />} size='lg'>
              Browse All Blogs
            </ButtonExtended>
          </Link>
        </div>
      </main>
    </RootLayout>
  )
}

export async function getServerSideProps({ params }: any) {
  const blogQuery = { limit: 4 }
  const blog = await fetcher(`blogs/${params?.slug}`)
  const otherBlogs = await fetcher('blogs', qs(blogQuery))
  return {
    props: {
      blog,
      otherBlogs,
    },
  }
}
