import Link from 'next/link'
import Img from '../../img'
import { Separator } from '../../separator'
import NavLinks from './NavLinks'

interface Props {
  userRole: 'user' | 'admin' | 'super_admin'
}

export default function DashboardSideNav({ userRole }: Props) {
  return (
    <nav className='hidden lg:flex flex-col py-3 border-right border-[1px] min-h-screen fixed top-0 left-0 w-[230px] bg-secondary gap-3 h-screen'>
      <Link href='/'>
        <Img src='/logo.png' alt='Wed Portraits' className='w-full h-auto px-5' />
      </Link>
      <Separator />
      <NavLinks userRole={userRole} />
    </nav>
  )
}
