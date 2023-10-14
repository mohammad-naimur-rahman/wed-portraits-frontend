import { deleteCookie } from 'cookies-next'

import { LogOut } from 'lucide-react'
import { DropdownMenuItem, DropdownMenuSeparator } from '../dropdown-menu'

export default function LogoutButton() {
  const handleLogout = () => {
    deleteCookie('userData')
    deleteCookie('refreshToken')
    deleteCookie('accessToken')
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
