import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Footer from '../ui/footer'
import Navbar from '../ui/navbar'
import EmptyLayout from './EmptyLayout'

interface Props {
  title: string
  meta?: ReactNode
  children: ReactNode
  className?: string
}

export default function RootLayout({ title, meta, children, className }: Props) {
  return (
    <EmptyLayout title={title} meta={meta}>
      <Navbar />
      <main className={cn(className, 'h-min-body mt-16 min-h-screen-nav')}>{children}</main>
      <Footer />
    </EmptyLayout>
  )
}
