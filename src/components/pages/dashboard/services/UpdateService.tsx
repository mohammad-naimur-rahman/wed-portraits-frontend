import animationData from '@/assets/lottie/updating.json'
import ButtonExtended from '@/components/ui/buttonExtended'
import ImageUploaderComponent from '@/components/ui/dashboard/common/ImageUploaderComponent'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { serviceCategoryArray } from '@/constants/dashboard/serviceCategoryArray'
import { useUpdateServiceMutation } from '@/redux/features/servicesApi'
import { IError } from '@/types/IError'
import { IService } from '@/types/IService'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { PenSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface Props {
  service: IService
}

export default function UpdateService({ service }: Props) {
  const [updateService, { isLoading, isSuccess, isError, error }] = useUpdateServiceMutation()

  const [image, setimage] = useState(service.image)

  const createServiceSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    status: z.enum(['active', 'inactive', 'upcoming']),
    category: z.enum(serviceCategoryArray as [string, ...string[]]),
  })

  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      title: service?.title,
      description: service?.description,
      price: service?.price,
      status: service?.status,
      category: service?.category,
    },
  })

  const onSubmit = (values: z.infer<typeof createServiceSchema>) => {
    if (!image) {
      toast.error('Image is required')
      return
    }

    updateService({ id: service.id, payload: { ...values, image }, token: getAccessToken() })
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended icon={<PenSquare />} size='sm'>
            Edit Service
          </ButtonExtended>
        </DialogTrigger>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Update Service</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
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
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder='Description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Category' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Category</SelectLabel>
                            {serviceCategoryArray.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Price' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder='Status' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Choose Status</SelectLabel>
                            <SelectItem value='active'>Active</SelectItem>
                            <SelectItem value='inactive'>Inactive</SelectItem>
                            <SelectItem value='upcoming'>Upcoming</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageUploaderComponent image={image} setimage={setimage} />
              <DialogClose>
                <ButtonExtended icon={<PenSquare />} type='submit'>
                  Update Service
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
