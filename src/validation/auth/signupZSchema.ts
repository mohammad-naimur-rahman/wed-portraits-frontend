import { signupRegex } from '@/constants/regex'
import z from 'zod'

export const signupZSchema = z.object({
  email: z.string().email({ message: 'Email is required!' }),
  password: z.string().refine(val => signupRegex.test(val)),
  repeatPassword: z.string().refine(val => signupRegex.test(val)),
  name: z.string(),
})
