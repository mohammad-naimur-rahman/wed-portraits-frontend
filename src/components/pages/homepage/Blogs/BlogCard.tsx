import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IBlog } from '@/types/IBlog'
import { useRouter } from 'next/router'

interface Props {
  blog: IBlog
}

export default function BlogCard({ blog }: Props) {
  const { push } = useRouter()
  return (
    <div className='p-4'>
      <div
        className='shadow-lg rounded-lg bg-secondary overflow-hidden flex flex-col justify-between h-full gap-4 cursor-pointer'
        onClick={() => push(`/blogs/${blog?.slug}`)}>
        <Img src={blog?.image} alt={blog?.title} className='aspect-video object-cover' />
        <Typography variant='h5' className='px-3 pt-2'>
          {blog?.title}
        </Typography>

        <div className='flex flex-wrap gap-2 px-3 pb-3'>
          {blog?.tags?.map(tag => (
            <Button key={tag} variant='default' size='sm' className='rounded-full'>
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
