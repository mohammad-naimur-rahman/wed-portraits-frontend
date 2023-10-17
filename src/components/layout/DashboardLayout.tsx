import { cn } from '@/lib/utils'
import { IError } from '@/types/IError'
import { errorMessage } from '@/utils/error'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ReactNode, useState } from 'react'
import { DashboardNavDrawer } from '../ui/dashboard/DashboardNavDrawer'
import DashboardSideNav from '../ui/dashboard/DashboardSideNav'
import DashboardTopNav from '../ui/dashboard/DashboardTopNav'
import DashbaordErrorComponent from '../ui/dashboard/common/DashbaordErrorComponent'
import EmptyLayout from './EmptyLayout'

interface Props {
  title: string
  children: ReactNode
  meta?: ReactNode
  className?: string
  userRole: 'user' | 'admin' | 'super_admin'
  isError?: boolean
  error?: FetchBaseQueryError | SerializedError | undefined
}

export default function DashboardLayout({ title, children, meta, className, userRole, isError, error }: Props) {
  const [open, setopen] = useState(false)
  return (
    <EmptyLayout title={title} meta={meta}>
      <DashboardTopNav setopen={setopen} />
      <DashboardSideNav userRole={userRole} />
      <DashboardNavDrawer userRole={userRole} open={open} setopen={setopen} />
      <main className={cn(className, 'h-min-body mt-16 pl-2 lg:pl-[238px] pt-2 pr-2 pb-2')}>
        {isError ? <DashbaordErrorComponent errorMessage={errorMessage(error as IError)} /> : <>{children}</>}
      </main>
    </EmptyLayout>
  )
}
