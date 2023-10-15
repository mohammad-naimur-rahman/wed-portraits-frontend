import animationData from '@/assets/lottie/imageUploading.json'
import Img from '@/components/ui/img'
import Overlay from '@/components/ui/overlay'
import { Skeleton } from '@/components/ui/skeleton'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { getUserId } from '@/utils/auth/getUserId'
import { imageUploader } from '@/utils/imageUploader'
import { CookieValueTypes } from 'cookies-next'
import { Camera } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

interface Props {
  isLoading: boolean
  userData: IUser
  updateProfile: (payload: { payload: Partial<IUser>; id: string; token: CookieValueTypes }) => void
}

export default function ProfileImage({ isLoading, userData, updateProfile }: Props) {
  const id = getUserId()
  const token = getAccessToken()
  const [isUploading, setisUploading] = useState(false)

  const uploadButtonRef = useRef(null)
  const handleUpdateProfilePicture = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault()

    try {
      setisUploading(true)

      const imageInfo = await imageUploader(e)

      setisUploading(false)

      updateProfile({
        payload: {
          image: imageInfo,
        },
        id,
        token,
      })
    } catch (err) {
      setisUploading(false)
      toast.error('Image upload failed!')
    }
  }

  if (isLoading) {
    return <Skeleton className='w-36 h-36 rounded-full overflow-hidden mb-5 mt-10' />
  }

  return (
    <div className='w-36 h-36 rounded-full overflow-hidden mb-5 mt-10'>
      <span className='relative w-full h-full inline-block group border rounded-full'>
        {userData?.image ? (
          <Img src={userData.image} alt={userData.name} className='w-full h-full aspect-square object-cover' />
        ) : (
          <Img src='/avatar.png' alt={userData?.name} />
        )}
        <button
          type='button'
          className='absolute bottom-0 left-0 w-full -mb-1 pb-3 pt-2 flex items-center justify-center bg-primary text-slate-100 gap-1.5 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity'
          onClick={() => {
            if (uploadButtonRef.current) {
              ;(uploadButtonRef.current as HTMLInputElement).click()
            }
          }}>
          <p className='text-sm'>{userData?.image ? 'Update' : 'Upload'}</p>
          <Camera className='w-4 h-4' />
        </button>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          ref={uploadButtonRef}
          onChange={handleUpdateProfilePicture}
        />
      </span>
      <Overlay animationData={animationData} isOpen={isUploading} />
    </div>
  )
}
