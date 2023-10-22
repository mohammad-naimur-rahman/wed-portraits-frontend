import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import Img from '../img'
import Cart from './Cart'
import MobileNavmenu from './MobileNavmenu'
import Navmenu from './Navmenu'
import ProfileDropdown from './ProfileDropdown'
import { ThemeSwitcher } from './ThemeSwitcher'

const navigationMenu = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/services',
    label: 'Services',
  },
  {
    href: '/blogs',
    label: 'Blogs',
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Cart />
            </TooltipTrigger>
            <TooltipContent>
              <p>Cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ThemeSwitcher />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme Switcher</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ProfileDropdown />
            </TooltipTrigger>
            <TooltipContent>
              <p>Profile Menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <MobileNavmenu navigationMenu={navigationMenu} />
      </div>
    </nav>
  )
}
