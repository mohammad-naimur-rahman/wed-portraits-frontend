import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Spinner from '@/components/ui/icons/Spinner'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { envVars } from '@/configs'
import { IAuthUser } from '@/types/IAuthUser'
import { IError } from '@/types/IError'
import { saveUserData } from '@/utils/auth/saveUserData'
import { errorMessage } from '@/utils/error'
import { signupZSchema } from '@/validation/auth/signupZSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface Props {
  query: {
    redirected?: boolean
    prevPath?: string
  }
}

export default function SignupForm({ query }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const form = useForm<z.infer<typeof signupZSchema>>({
    resolver: zodResolver(signupZSchema),
  })

  const onSubmit = async (values: z.infer<typeof signupZSchema>) => {
    const { name, email, password, repeatPassword } = values
    if (password !== repeatPassword) {
      toast.error('Passwords do not match!')
      return
    }

    try {
      setIsLoading(true)

      const result = await axios.post(`${envVars.API_URL}/auth/signup`, { email, name, password })

      if (result?.data?.success) {
        setIsLoading(false)
        toast.success('Signed up successfully!')
        const authData: IAuthUser = result?.data?.data
        saveUserData(authData)
        if (query?.redirected) {
          push(query?.prevPath!)
        } else {
          push('/')
        }
      }
    } catch (err) {
      setIsLoading(false)
      toast.error(errorMessage(err as IError))
    }
  }
  return (
    <section>
      <div className='flex justify-center items-center w-full mx-auto'>
        <h2 className='text-3xl text-center mr-3'>Signup</h2>
        <Img src='/logo.png' alt='Wed Portraits' className='w-48' />
      </div>
      <p className='text-muted-foreground text-center py-5'>Enter your information below to create your account</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-2.5 justify-center w-full sm:w-[300px] lg:w-[350px] mx-auto max-w-[350px]'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter your full name' {...field} disabled={isLoading} />
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
                  <Input placeholder='Enter your email' {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='password' placeholder='Enter your password' {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='repeatPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='password' placeholder='Repeat your password' {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  Password must have 1 capital letter, 1 number, 1 special character, and be at least 6 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading} className='mt-3'>
            {isLoading ? <Spinner /> : 'Signup'}
          </Button>
        </form>
      </Form>
    </section>
  )
}
