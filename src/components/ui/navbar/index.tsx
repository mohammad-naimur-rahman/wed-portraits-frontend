import Link from 'next/link'
import Img from '../img'
import Cart from './Cart'
import MobileNavmenu from './MobileNavmenu'
import Navmenu from './Navmenu'
import ProfileDropdown from './ProfileDropdown'
import { ThemeSwitcher } from './ThemeSwitcher'

const navigationMenu = [
  {
    href: '/all-services',
    label: 'All Services',
  },
  {
    href: '/categories/wedding',
    label: 'Wedding',
  },
  {
    href: '/categories/anniversery',
    label: 'Discussions',
  },
]

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-5 py-3 h-16 fixed top-0 left-0 w-full gap-5 backdrop-blur-lg z-10'>
      <Link href='/'>
        <Img src='/logo.png' alt="Reader's cafe" className='h-16 w-auto py-1' sizes='10vw' width={192} height={80} />
      </Link>
      <Navmenu navigationMenu={navigationMenu} />
      <div className='flex items-center gap-5'>
        <Cart />
        <ThemeSwitcher />
        <ProfileDropdown />
        <MobileNavmenu navigationMenu={navigationMenu} />
      </div>
    </nav>
  )
}
