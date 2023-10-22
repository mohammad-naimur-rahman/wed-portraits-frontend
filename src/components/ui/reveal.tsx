import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface Props {
  children: ReactNode
  className?: string
  inViewClassName: string
}

const Reveal = ({ children, className, inViewClassName }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  return (
    <div
      ref={ref}
      className={cn(className, {
        [inViewClassName]: isVisible,
      })}>
      {children}
    </div>
  )
}

export default Reveal
