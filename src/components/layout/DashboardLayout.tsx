import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import DashboardSideNav from '../ui/dashboard/DashboardSideNav'
import DashboardTopNav from '../ui/dashboard/DashboardTopNav'
import EmptyLayout from './EmptyLayout'

interface Props {
  title: string
  children: ReactNode
  meta?: ReactNode
  className?: string
  userRole: 'user' | 'admin' | 'super_admin'
}

export default function DashboardLayout({ title, children, meta, className, userRole }: Props) {
  return (
    <EmptyLayout title={title} meta={meta}>
      <DashboardTopNav />
      <DashboardSideNav userRole={userRole} />
      <main className={cn(className, 'h-min-body mt-16 pl-[238px] p-2')}>{children}</main>
    </EmptyLayout>
  )
}
