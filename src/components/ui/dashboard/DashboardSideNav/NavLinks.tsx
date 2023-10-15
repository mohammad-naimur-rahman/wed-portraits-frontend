import { dashboardNavLinks } from '@/constants/dashboard/DashboardnavLinks'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Separator } from '../../separator'

interface Props {
  userRole: 'user' | 'admin' | 'super_admin'
}

export default function NavLinks({ userRole }: Props) {
  const { pathname } = useRouter()
  const navLinks = dashboardNavLinks(userRole)

  return (
    <div className='flex flex-col gap-2 overflow-y-auto px-5'>
      {navLinks?.map(link => (
        <div key={link.label}>
          <Link href={link.href || '/'}>
            <span
              className={clsx('flex items-center gap-4 hover:underline py-4', {
                'text-primary': pathname === link.href,
              })}>
              <span className='w-5 h-5'>{link.icon}</span>
              <span className='font-semibold'>{link.label}</span>
            </span>
          </Link>
          <Separator />
        </div>
      ))}
    </div>
  )
}
