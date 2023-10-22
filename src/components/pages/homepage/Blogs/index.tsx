import ButtonExtended from '@/components/ui/buttonExtended'
import Reveal from '@/components/ui/reveal'
import Typography from '@/components/ui/typography'
import { IBlog } from '@/types/IBlog'
import { FolderSearch } from 'lucide-react'
import Link from 'next/link'
import BlogCard from './BlogCard'

interface Props {
  blogs: IBlog[]
}

export default function Blogs({ blogs }: Props) {
  return (
    <section className='container py-10'>
      <Reveal inViewClassName='animate-shrink'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          Blogs
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          Read Our Blogs
        </Typography>
      </Reveal>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {blogs?.map(blog => (
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
    </section>
  )
}
