import ButtonExtended from '@/components/ui/buttonExtended'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useChangeRoleMutation } from '@/redux/features/userApi'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { ShieldPlus } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
export default function AssignNewAdmin() {
  const [changeRole, { isLoading, isSuccess, isError, error }] = useChangeRoleMutation()

  const adminZSChema = z.object({
    email: z.string().email(),
  })
  const onSubmit = async (values: z.infer<typeof adminZSChema>) => {
    changeRole({ email: values.email, token: getAccessToken(), role: 'admin' })
  }

  const form = useForm<z.infer<typeof adminZSChema>>({
    resolver: zodResolver(adminZSChema),
  })

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Admin Assigned Successfully')
  }, [isError, error, isSuccess])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonExtended icon={<ShieldPlus />} type='button' size='sm'>
          Assign New Admin
        </ButtonExtended>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="New admin's Email" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
              <ButtonExtended icon={<ShieldPlus />} type='submit'>
                Assign as Admin
              </ButtonExtended>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
