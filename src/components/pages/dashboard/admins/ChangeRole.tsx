import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useChangeRoleMutation } from '@/redux/features/userApi'
import { IError } from '@/types/IError'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { SelectGroup } from '@radix-ui/react-select'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface Props {
  email: string
  role: 'user' | 'admin' | 'super_admin'
  disabled: boolean
}
export default function ChangeRole({ email, role, disabled }: Props) {
  const [changeRole, { isSuccess, isError, error }] = useChangeRoleMutation()

  const adminZSChema = z.object({
    role: z.enum(['user', 'admin', 'super_admin']).default(role),
  })
  const onSubmit = async (values: z.infer<typeof adminZSChema>) => {
    changeRole({ email, token: getAccessToken(), role: values.role })
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
        <Button disabled={disabled}>Change Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Role' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Choose Role</SelectLabel>
                          <SelectItem value='user'>User</SelectItem>
                          <SelectItem value='admin'>Admin</SelectItem>
                          <SelectItem value='super_admin'>Super Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type='submit'>Change Role</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
