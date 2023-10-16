import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../button'
import { ThemeSwitcher } from '../../navbar/ThemeSwitcher'
import DashboardSearchBox from './DashboardSearchBox'

export default function DashboardTopNav() {
  return (
    <nav className='flex items-center justify-between px-5 py-3 h-16 fixed top-0 left-0 w-full gap-5 pl-[250px] backdrop-blur-lg border-b'>
      <Link href='/'>
        <Button className='rounded-full' variant='secondary'>
          <ArrowLeft className='w-5 h-5 mr-2' /> Go back home
        </Button>
      </Link>
      <DashboardSearchBox />
      <ThemeSwitcher className='w-[152px] text-right' />
    </nav>
  )
}
