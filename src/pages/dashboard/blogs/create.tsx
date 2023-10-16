import withAuth from '@/HOC/withAuth'
import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layout/DashboardLayout'
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
import dynamic from 'next/dynamic'
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
  const [createBlog, { isLoading, isError, error, isSuccess }] = useCreateBlogMutation()

  const [image, setimage] = useState('')
  const [blogContent, setblogContent] = useState('')

  const createServiceSchema = z.object({
    title: z.string(),
    tags: z.string().array(),
  })

  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
  })

  const onSubmit = (values: z.infer<typeof createServiceSchema>) => {
    if (!image) {
      toast.error('Image is required')
      return
    }

    createBlog({ payload: { ...values, image }, token: getAccessToken() })
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
      toast.success('Service Created Successfully!')
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

            <ImageUploaderComponent image={image} setimage={setimage} />

            <BlogEditor blogContent={blogContent} setblogContent={setblogContent} />
          </form>
        </Form>
      </section>

      <Overlay isOpen={isLoading} animationData={animationData} />
    </DashboardLayout>
  )
}

export default withAuth(BlogCreatePage)
