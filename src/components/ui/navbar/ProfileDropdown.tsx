import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { initUserData } from '@/constants/initUserData'
import { useGetProfileQuery } from '@/redux/features/userApi'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { LayoutDashboard, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Img from '../img'
import LogoutButton from './LogoutButton'

export default function ProfileDropdown() {
  const { data } = useGetProfileQuery(getAccessToken())

  const [userData, setuserData] = useState(initUserData)

  useEffect(() => {
    if (data?.data) {
      setuserData(data.data)
    }
  }, [data])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-10 w-10'>
            {userData?.image ? (
              <AvatarImage src={userData?.image} alt={userData?.name} />
            ) : (
              <Img src='/avatar.png' alt='User' sizes='10vw' width={100} height={100} />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        {userData?.id ? (
          <>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{userData?.name}</p>
                <p className='text-sm leading-none text-muted-foreground'>{userData?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        ) : (
          <Link href='/login'>
            <DropdownMenuItem className='cursor-pointer'>
              <LogIn className='w-4 h-4 mr-2' /> Login
            </DropdownMenuItem>
          </Link>
        )}

        {userData?.id ? (
          <>
            <DropdownMenuGroup>
              <Link href='/dashboard/profile'>
                <DropdownMenuItem className='cursor-pointer'>
                  <LayoutDashboard className='w-4 h-4 mr-2' />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <LogoutButton setuserData={setuserData} />
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
