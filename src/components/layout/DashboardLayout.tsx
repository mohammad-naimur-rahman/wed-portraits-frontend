import { cn } from '@/lib/utils'
import { IError } from '@/types/IError'
import { errorMessage } from '@/utils/error'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ReactNode } from 'react'
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
  return (
    <EmptyLayout title={title} meta={meta}>
      <DashboardTopNav />
      <DashboardSideNav userRole={userRole} />
      <main className={cn(className, 'h-min-body mt-16 pl-[238px] pt-2 pr-2 pb-2')}>
        {isError ? <DashbaordErrorComponent errorMessage={errorMessage(error as IError)} /> : <>{children}</>}
      </main>
    </EmptyLayout>
  )
}
