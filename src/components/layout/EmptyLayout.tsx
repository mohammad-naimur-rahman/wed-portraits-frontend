import { ThemeProvider } from '@/lib/ThemeProvider'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
  title: string
  meta?: ReactNode
  children: ReactNode
}

export default function EmptyLayout({ title, meta, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {meta}
      </Head>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <div>{children}</div>
        <Toaster position='top-center' reverseOrder={false} />
      </ThemeProvider>
    </>
  )
}
