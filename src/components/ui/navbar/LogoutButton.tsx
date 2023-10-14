import { deleteCookie } from 'cookies-next'

import { initUserData } from '@/constants/initUserData'
import { ICookieUser } from '@/types/ICookieUser'
import { LogOut } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { DropdownMenuItem, DropdownMenuSeparator } from '../dropdown-menu'

interface Props {
  setuserData: Dispatch<SetStateAction<ICookieUser>>
}

export default function LogoutButton({ setuserData }: Props) {
  const handleLogout = () => {
    toast.success('Logged out successfully!')
    deleteCookie('userData')
    deleteCookie('refreshToken')
    deleteCookie('accessToken')
    setuserData(initUserData)
  }
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
        <span className='flex items-center'>
          <LogOut className='w-4 h-4 mr-2' /> Log out
        </span>
      </DropdownMenuItem>
    </>
  )
}
