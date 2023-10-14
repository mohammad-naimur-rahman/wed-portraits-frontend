import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Spinner from '@/components/ui/icons/Spinner'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { envVars } from '@/configs'
import { IAuthUser } from '@/types/IAuthUser'
import { saveUserData } from '@/utils/auth/saveUserData'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import z from 'zod'

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email({
    message: 'Email is required!',
  }),
  password: z.string({ required_error: 'Password is required!' }).min(6, {
    message: 'Password must be at least 6 characters!',
  }),
})

interface Props {
  query: {
    redirected?: boolean
    prevPath?: string
  }
}

export default function LoginForm({ query }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true)
      const result = await axios.post(`${envVars.API_URL}/auth/login`, values)

      if (result?.data?.success) {
        setIsLoading(false)
        toast.success('Logged in successfully!')
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
      toast.error((err as Error)?.message)
    }
  }

  return (
    <section>
      <div className='flex justify-center items-center w-full mx-auto gap-5'>
        <h2 className='text-3xl text-center mr-3'>Login</h2>
        <Img src='/logo-light.png' alt='Wed Portraits' className='w-32' />
      </div>
      <p className='text-muted-foreground text-center py-5'>Enter your information below to login to your account</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-2.5 justify-center w-full sm:w-[300px] lg:w-[350px] mx-auto max-w-[350px]'>
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
          <Button type='submit' disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Login'}
          </Button>
        </form>
      </Form>

      <p className='flex items-center justify-center py-3'>
        Don&apos;t have an account?
        {query?.redirected ? (
          <Link href={`/signup?redirected=${query.redirected}&prevPath=${query.prevPath}`}>
            <Button variant='link'>Signup</Button>
          </Link>
        ) : (
          <Link href='/signup'>
            <Button variant='link'>Signup</Button>
          </Link>
        )}
      </p>
      <div className='flex pb-3 justify-center'>
        <Link href='/'>
          <Button variant='secondary'>
            <ArrowLeft className='w-4 h-4 mr-2' /> Go back home
          </Button>
        </Link>
      </div>
    </section>
  )
}
