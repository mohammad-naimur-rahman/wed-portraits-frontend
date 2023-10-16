import ButtonExtended from '@/components/ui/buttonExtended'
import ImageUploader from '@/components/ui/dashboard/common/ImageUploader'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
import { useCreateServiceMutation } from '@/redux/features/servicesApi'
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

interface Props {
  category: 'Wedding' | 'Birthday' | 'Anniversary' | 'Others'
}
export default function AddNewService({ category }: Props) {
  const [createService, { isLoading, isSuccess, isError, error }] = useCreateServiceMutation()

  const [image, setimage] = useState('')

  const createServiceSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    price: z.coerce.number(),
    category: z.enum(serviceCategoryArray as [string, ...string[]]).default(category),
  })

  const form = useForm<z.infer<typeof createServiceSchema>>({
    resolver: zodResolver(createServiceSchema),
  })

  const onSubmit = (values: z.infer<typeof createServiceSchema>) => {
    if (!image) {
      toast.error('Image is required')
      return
    }

    createService({ payload: { ...values, image }, token: getAccessToken() })
    // changeRole({ email: values.email, token: getAccessToken(), role: 'admin' })
  }

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Service Created Successfully')
  }, [isError, error, isSuccess])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonExtended icon={<FilePlus2 />} type='submit'>
          Add New Service
        </ButtonExtended>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
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
            <ImageUploader image={image} setimage={setimage} />
            <DialogClose>
              <ButtonExtended icon={<FilePlus2 />} type='submit'>
                Add New Service
              </ButtonExtended>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
