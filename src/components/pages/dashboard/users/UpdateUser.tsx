import animationData from '@/assets/lottie/updating.json'
import { Button } from '@/components/ui/button'
import ButtonExtended from '@/components/ui/buttonExtended'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import { useUpdateUserMutation } from '@/redux/features/userApi'
import { IError } from '@/types/IError'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilePlus2, PenSquare } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface Props {
  user: IUser
  disabled: boolean
}

export default function UpdateUser({ user, disabled }: Props) {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation()

  const updateUserZSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const form = useForm<z.infer<typeof updateUserZSchema>>({
    resolver: zodResolver(updateUserZSchema),
    defaultValues: {
      name: user?.name,
      email: user.email,
    },
  })

  const onSubmit = (values: z.infer<typeof updateUserZSchema>) => {
    updateUser({ payload: values, token: getAccessToken(), id: user?.id })
  }

  useEffect(() => {
    if (isError) {
      form.reset()
      toast.error(errorMessage(error as IError))
    }
    if (isSuccess) {
      form.reset()
      toast.success('User Updated Successfully!')
    }
  }, [isError, error, isSuccess, form])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='min-w-[40px] ml-3' size='icon' disabled={disabled}>
            <PenSquare />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl overflow-auto max-h-[calc(100dvh_-_20px)]'>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose>
                <ButtonExtended icon={<FilePlus2 />} type='submit'>
                  Update User
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
