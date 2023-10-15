import ButtonExtended from '@/components/ui/buttonExtended'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { IUpdateIdData } from '@/types/IUpdateIdData'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { getUserId } from '@/utils/auth/getUserId'
import { FileSignature, Pen, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  email: string
  isLoading: boolean
  updateProfile: (payload: IUpdateIdData<IUser>) => void
}

export default function UserEmail({ email, isLoading, updateProfile }: Props) {
  const id = getUserId()
  const token = getAccessToken()
  const [updatedEmail, setupdatedEmail] = useState(email)
  const [editMode, seteditMode] = useState(false)

  useEffect(() => {
    setupdatedEmail(email)
  }, [email])

  const handleUpdateName = () => {
    seteditMode(false)
    updateProfile({ payload: { email: updatedEmail }, id, token })
  }

  if (isLoading) {
    return <Skeleton className='mb-2 w-64 h-5' />
  }

  return (
    <div className='flex items-center'>
      {editMode ? (
        <div className='flex items-center gap-3 py-5'>
          <Input placeholder='Edit your Name' value={updatedEmail} onChange={e => setupdatedEmail(e.target.value)} />
          <ButtonExtended icon={<FileSignature />} onClick={handleUpdateName}>
            Update
          </ButtonExtended>
          <X className='w-10 h-10 cursor-pointer' onClick={() => seteditMode(false)} />
        </div>
      ) : (
        <div className='flex items-center'>
          <p className='mb-2 text-lg text-secondary-foreground'>{email}</p>
          <Pen
            className='w-3.5 h-3.5 ml-2 -mt-1 text-primary cursor-pointer'
            onClick={() => seteditMode(prev => !prev)}
          />
        </div>
      )}
    </div>
  )
}
