import { envVars } from '@/configs'
import axios from 'axios'
import { ChangeEvent } from 'react'
import { toast } from 'react-hot-toast'

export const imageUploader = async (e: ChangeEvent<HTMLInputElement>) => {
  e.preventDefault()
  const inputElement = e.target as HTMLInputElement

  let imgURL: string = ''

  if (inputElement.files && inputElement.files.length > 0) {
    try {
      toast.success('Image uploading...')
      const formData = new FormData()
      formData.append('file', inputElement.files[0])
      formData.append('upload_preset', envVars.CLOUDINARY_UPLOAD_PRESET)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${envVars.CLOUDINARY_CLOUDNAME}/image/upload`,
        formData
      )

      if (res.status === 200) {
        imgURL = res.data.secure_url
      } else {
        toast.error('Image upload failed!')
      }
    } catch (err) {
      toast.error('Image upload failed!')
    }
  }

  return imgURL
}
