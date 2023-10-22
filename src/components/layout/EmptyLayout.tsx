import { ThemeProvider } from '@/lib/ThemeProvider'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from '../ui/scroll-to-top'

interface Props {
  title: string
  meta?: ReactNode
  children: ReactNode
  className?: string
}

export default function EmptyLayout({ title, meta, children, className }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {meta}
      </Head>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <div className={className}>{children}</div>
        <Toaster position='top-center' reverseOrder={false} />
        <ScrollToTop />
      </ThemeProvider>
    </>
  )
}
