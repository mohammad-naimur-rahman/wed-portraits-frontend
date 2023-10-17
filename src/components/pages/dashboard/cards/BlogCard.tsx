import { Button } from '@/components/ui/button'
import ButtonExtended from '@/components/ui/buttonExtended'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useDeleteBlogMutation } from '@/redux/features/blogsApi'
import { IBlog } from '@/types/IBlog'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { PenSquare, Trash } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import PreviewBlog from '../blogs/PreviewBlog'

interface Props {
  blog: IBlog
}
export default function BlogCard({ blog }: Props) {
  const [deleteBlog, { isError, error, isSuccess }] = useDeleteBlogMutation()

  const [showPrompt, setshowPrompt] = useState(false)
  const [delelteId, setdelelteId] = useState<string | null>(null)

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Service Deleted Successfully')
  }, [isError, error, isSuccess])

  return (
    <div className='shadow-lg rounded-lg bg-secondary overflow-hidden flex flex-col justify-between'>
      <Img src={blog?.image} alt={blog?.title} className='w-full h-auto mx-auto aspect-video object-cover' />
      <Typography variant='h5' className='px-3 pt-2'>
        {blog?.title}
      </Typography>

      <div className='flex flex-wrap gap-2 px-3 pt-3'>
        {blog?.tags?.map(tag => (
          <Button className='rounded-full self-start' variant='outline' size='sm' key={tag}>
            {tag}
          </Button>
        ))}
      </div>

      <div className='px-3 pt-5'>
        <PreviewBlog blog={blog} />
      </div>

      <div className='flex flex-col gap-1 p-3 pt-5'>
        <div className='flex justify-between flex-wrap gap-3'>
          <Link href={`/dashboard/blogs/${blog?.id}`}>
            <ButtonExtended icon={<PenSquare />} size='sm'>
              Edit Blog
            </ButtonExtended>
          </Link>
          <ButtonExtended
            icon={<Trash />}
            variant='destructive'
            size='sm'
            onClick={() => {
              setdelelteId(blog?.id)
              setshowPrompt(true)
            }}>
            Delete Blog
          </ButtonExtended>
        </div>
      </div>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteBlog({
            id: delelteId,
            token: getAccessToken(),
          })
        }}
      />
    </div>
  )
}
