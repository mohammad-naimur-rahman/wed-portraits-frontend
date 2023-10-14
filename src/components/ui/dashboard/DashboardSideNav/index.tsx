import Link from 'next/link'
import Img from '../../img'
import { Separator } from '../../separator'

export default function DashboardSideNav() {
  return (
    <nav className='flex flex-col py-3 border-right border-[1px] min-h-screen fixed top-0 left-0 w-[230px] bg-secondary gap-3 h-screen'>
      <Link href='/'>
        <Img src='/logo.png' alt='Wed Portraits' className='w-full h-auto px-5' />
      </Link>

      <Separator />

      {/*TODO: add reusable navlinks here, seperated for user, admin and super admin */}
      {/* <NavLinks /> */}
    </nav>
  )
}
