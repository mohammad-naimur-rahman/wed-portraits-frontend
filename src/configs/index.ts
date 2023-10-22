import z from 'zod'

const envVarsSchema = z.object({
  API_URL: z.string(),
  CLOUDINARY_UPLOAD_PRESET: z.string(),
  CLOUDINARY_CLOUDNAME: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
})

export const envVars = envVarsSchema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_CLOUDNAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
})
