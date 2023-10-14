import { ReactNode } from 'react'
import Navbar from '../ui/navbar'
import EmptyLayout from './EmptyLayout'

interface Props {
  title: string
  children: ReactNode
}

export default function RootLayout({ title, children }: Props) {
  return (
    <EmptyLayout title={title}>
      <Navbar />
      <main className='h-min-body mt-16 min-h-screen-nav'>{children}</main>
    </EmptyLayout>
  )
}
