import z from 'zod'

export const loginZSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email({
    message: 'Email is required!',
  }),
  password: z.string({ required_error: 'Password is required!' }).min(6, {
    message: 'Password must be at least 6 characters!',
  }),
})
