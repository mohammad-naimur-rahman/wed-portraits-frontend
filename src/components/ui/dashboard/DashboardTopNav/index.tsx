import { AlignJustify, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../../button'
import { ThemeSwitcher } from '../../navbar/ThemeSwitcher'
import DashboardSearchBox from './DashboardSearchBox'

interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
}

export default function DashboardTopNav({ setopen }: Props) {
  return (
    <nav className='flex items-center justify-between px-5 py-3 h-16 fixed top-0 left-0 w-full gap-5 pl-5 lg:pl-[250px] backdrop-blur-lg border-b'>
      <Link href='/'>
        <Button className='rounded-full' variant='secondary'>
          <ArrowLeft className='w-5 h-5 mr-2' /> Go back home
        </Button>
      </Link>
      <DashboardSearchBox />
      <div className='flex items-center w-[152px] justify-end gap-4'>
        <ThemeSwitcher className='text-right' />
        <AlignJustify onClick={() => setopen(prev => !prev)} className='block lg:hidden cursor-pointer' />
      </div>
    </nav>
  )
}
