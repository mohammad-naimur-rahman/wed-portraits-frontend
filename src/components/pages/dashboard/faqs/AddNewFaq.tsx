import animationData from '@/assets/lottie/savingFile.json'
import ButtonExtended from '@/components/ui/buttonExtended'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import { Textarea } from '@/components/ui/textarea'
import { useCreateFaqMutation } from '@/redux/features/faqsApi'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilePlus2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export default function AddNewFaq() {
  const [createFaq, { isLoading, isSuccess, isError, error }] = useCreateFaqMutation()

  const createFaqSchema = z.object({
    question: z.string(),
    answer: z.string(),
  })

  const form = useForm<z.infer<typeof createFaqSchema>>({
    resolver: zodResolver(createFaqSchema),
  })

  const onSubmit = (values: z.infer<typeof createFaqSchema>) => {
    createFaq({ payload: values, token: getAccessToken() })
  }

  useEffect(() => {
    if (isError) {
      form.reset()
      toast.error(errorMessage(error as IError))
    }
    if (isSuccess) {
      form.reset()
      toast.success('FAQ Created Successfully!')
    }
  }, [isError, error, isSuccess, form])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended icon={<FilePlus2 />} type='submit'>
            Add New FAQ
          </ButtonExtended>
        </DialogTrigger>
        <DialogContent className='max-w-2xl overflow-auto max-h-[calc(100dvh_-_20px)]'>
          <DialogHeader>
            <DialogTitle>Add New FAQ</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='question'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Question' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='answer'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder='Answer' {...field} className='min-h-[150px]' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose>
                <ButtonExtended icon={<FilePlus2 />} type='submit'>
                  Add New Faq
                </ButtonExtended>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Overlay isOpen={isLoading} animationData={animationData} />
    </>
  )
}
