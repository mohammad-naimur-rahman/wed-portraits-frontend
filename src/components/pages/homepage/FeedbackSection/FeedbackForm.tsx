import ButtonExtended from '@/components/ui/buttonExtended'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateFeedbackMutation } from '@/redux/features/feedbacksApi'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export default function FeedbackForm() {
  const { asPath } = useRouter()

  const [postFeedback, { isLoading, isSuccess, isError, error }] = useCreateFeedbackMutation()

  const feedbackZSchema = z.object({
    topic: z.string(),
    description: z.string(),
  })

  const form = useForm<z.infer<typeof feedbackZSchema>>({
    resolver: zodResolver(feedbackZSchema),
  })

  const onSubmit = async (values: z.infer<typeof feedbackZSchema>) => {
    postFeedback({ payload: values, token: getAccessToken() })
    form.reset()
  }

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage(error as IError))
    }
    if (isSuccess) {
      toast.success('Feedback Sent Successfully!')
    }
  }, [isError, error, isSuccess, form])

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 justify-center w-full max-w-3xl mx-auto'>
          <FormField
            control={form.control}
            name='topic'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder='Write the topic' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Enter your details' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {getAccessToken() ? (
            <ButtonExtended icon={<MessageSquare />} type='submit' className='self-start' disabled={isLoading}>
              Post Feedback
            </ButtonExtended>
          ) : (
            <Link href={`/login?redirected=true&prevPath=${asPath}`}>
              <ButtonExtended icon={<MessageSquare />} className='self-start'>
                Login to Post Feedback
              </ButtonExtended>
            </Link>
          )}
        </form>
      </Form>
    </div>
  )
}
