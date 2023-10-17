import animationData from '@/assets/lottie/savingFile.json'
import ButtonExtended from '@/components/ui/buttonExtended'
import ImageUploaderComponent from '@/components/ui/dashboard/common/ImageUploaderComponent'
import { DatePicker } from '@/components/ui/date-picker'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import Overlay from '@/components/ui/overlay'
import { useCreateGalleryMutation } from '@/redux/features/galleryApi'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilePlus2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export default function AddNewImage() {
  const [createGallery, { isLoading, isSuccess, isError, error }] = useCreateGalleryMutation()

  const [image, setimage] = useState('')

  const createGallerySchema = z.object({
    date: z.date(),
  })

  const form = useForm<z.infer<typeof createGallerySchema>>({
    resolver: zodResolver(createGallerySchema),
  })

  const onSubmit = (values: z.infer<typeof createGallerySchema>) => {
    if (!image) {
      toast.error('Image is required')
      return
    }

    createGallery({ payload: { ...values, image }, token: getAccessToken() })
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
      toast.success('Gallery Image Added Successfully!')
    }
  }, [isError, error, isSuccess, form])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended icon={<FilePlus2 />} type='submit'>
            Add New Image
          </ButtonExtended>
        </DialogTrigger>
        <DialogContent className='max-w-2xl overflow-auto max-h-[calc(100dvh_-_20px)]'>
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <ImageUploaderComponent image={image} setimage={setimage} />

              <DatePicker form={form} label='Capture Date' name='date' />

              <DialogClose>
                <ButtonExtended icon={<FilePlus2 />} type='submit'>
                  Add New Image
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
