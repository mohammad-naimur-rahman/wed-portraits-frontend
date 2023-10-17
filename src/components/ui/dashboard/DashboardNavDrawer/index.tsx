import { Sheet, SheetContent } from '@/components/ui/sheet'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import Img from '../../img'
import { Separator } from '../../separator'
import NavLinks from '../DashboardSideNav/NavLinks'

interface Props {
  open: boolean
  setopen: Dispatch<SetStateAction<boolean>>
  userRole: 'user' | 'admin' | 'super_admin'
}

export function DashboardNavDrawer({ open, setopen, userRole }: Props) {
  return (
    <Sheet open={open} onOpenChange={setopen}>
      <SheetContent className='w-[220px] p-0' side='left'>
        <nav className='flex flex-col min-h-screen gap-3 h-screen'>
          <Link href='/'>
            <Img src='/logo.png' alt='Wed Portraits' className='w-full h-auto px-5' />
          </Link>
          <Separator />
          <NavLinks userRole={userRole} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
