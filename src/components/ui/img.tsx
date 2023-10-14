import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
}

export default function Img({ src, alt, width = 500, height = 500, sizes = '40vw', className, ...rest }: Props) {
  const [isLoading, setisLoading] = useState(true)
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      // style={{
      //   backgroundColor: isLoading ? 'red' : '',
      // }}
      className={cn('w-full h-auto block', className)}
      loading='lazy'
      onLoadingComplete={() => setisLoading(false)}
      {...rest}
    />
  )
}
