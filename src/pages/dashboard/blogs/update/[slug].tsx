import withAuth from '@/HOC/withAuth'
import animationData from '@/assets/lottie/updating.json'
import DashboardLayout from '@/components/layout/DashboardLayout'
import BlogTags from '@/components/pages/dashboard/blogs/BlogTags'
import ButtonExtended from '@/components/ui/buttonExtended'
import ImageUploaderComponent from '@/components/ui/dashboard/common/ImageUploaderComponent'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import Typography from '@/components/ui/typography'
import { useGetBlogQuery, useUpdateBlogMutation } from '@/redux/features/blogsApi'
import { IBlog } from '@/types/IBlog'
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

function BlogUpdatePage({ userData }: Props) {
  const { push, query } = useRouter()
  const { data } = useGetBlogQuery(query?.slug)

  const updateBlogSchema = z.object({
    title: z.string().optional(),
  })

  const [updateBlog, { isLoading, isError, error, isSuccess }] = useUpdateBlogMutation()

  const form = useForm<z.infer<typeof updateBlogSchema>>({
    resolver: zodResolver(updateBlogSchema),
  })

  useEffect(() => {
    if (data) {
      const blogData: IBlog = data?.data
      setimage(blogData?.image)
      setblogContent(blogData?.content)
      setblogTags(blogData?.tags)
      form.setValue('title', blogData?.title)
    }
  }, [data, form])

  const [image, setimage] = useState('')
  const [blogContent, setblogContent] = useState('')
  const [blogTags, setblogTags] = useState<string[]>([])

  const onSubmit = (values: z.infer<typeof updateBlogSchema>) => {
    if (!image) {
      toast.error('Image is required')
      return
    }

    if (!blogContent) {
      toast.error('Blog Content is required')
      return
    }

    updateBlog({
      id: data?.data?.id,
      payload: { ...values, image, content: blogContent, tags: blogTags },
      token: getAccessToken(),
    })
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
      setblogContent('')
      setblogTags([])
    }
  }, [isError, error, isSuccess, form, push])

  return (
    <DashboardLayout title='Blogs | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <Typography variant='h2' className='pb-8 text-center'>
          Update Blog
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
              Update Blog
            </ButtonExtended>
          </form>
        </Form>
      </section>

      <Overlay isOpen={isLoading} animationData={animationData} />
    </DashboardLayout>
  )
}

export default withAuth(BlogUpdatePage)
