import withAuth from '@/HOC/withAuth'
import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BlogTags from '@/components/pages/dashboard/blogs/BlogTags'
import ButtonExtended from '@/components/ui/buttonExtended'
import ImageUploaderComponent from '@/components/ui/dashboard/common/ImageUploaderComponent'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import Typography from '@/components/ui/typography'
import { useCreateBlogMutation } from '@/redux/features/blogsApi'
import { IError } from '@/types/IError'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePlus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const BlogEditor = dynamic(() => import('@/components/pages/dashboard/blogs/BlogEditor'), {
  ssr: false,
})

interface Props {
  userData: IUser
}

function BlogCreatePage({ userData }: Props) {
  const { push } = useRouter()
  const [createBlog, { isLoading, isError, error, isSuccess }] = useCreateBlogMutation()

  const [image, setimage] = useState('')
  const [blogContent, setblogContent] = useState('')
  const [blogTags, setblogTags] = useState<string[]>([])

  const createServiceSchema = z.object({
    title: z.string(),
  })

  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
  })

  const onSubmit = (values: z.infer<typeof createServiceSchema>) => {
    if (!image) {
      toast.error('Image is required')
      return
    }

    if (!blogContent) {
      toast.error('Blog Content is required')
      return
    }

    createBlog({ payload: { ...values, image, content: blogContent, tags: blogTags }, token: getAccessToken() })
  }

  useEffect(() => {
    if (isError) {
      form.reset()
      setimage('')
      toast.error(errorMessage(error as IError))
    }
    if (isSuccess) {
      form.reset()
      setimage('')
      toast.success('Blog Created Successfully!')
      push('/dashboard/blogs')
    }
  }, [isError, error, isSuccess, form])

  return (
    <DashboardLayout title='Blogs | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <Typography variant='h2' className='pb-8 text-center'>
          Create Blog
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3 max-w-4xl mx-auto'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUploaderComponent image={image} setimage={setimage} imageClassName='!max-w-md' />

            <BlogEditor blogContent={blogContent} setblogContent={setblogContent} />

            <BlogTags blogTags={blogTags} setblogTags={setblogTags} />

            <ButtonExtended icon={<FilePlus />} className='self-end'>
              Create Blog
            </ButtonExtended>
          </form>
        </Form>
      </section>

      <Overlay isOpen={isLoading} animationData={animationData} />
    </DashboardLayout>
  )
}

export default withAuth(BlogCreatePage)
