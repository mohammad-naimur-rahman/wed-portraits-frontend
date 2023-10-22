import { cn } from '@/lib/utils'
import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './button'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const viewportHeight = window.innerHeight
    const toggleVisibility = () => {
      window.scrollY > viewportHeight ? setIsVisible(true) : setIsVisible(false)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
  }

  return (
    <Button
      className={cn('fixed bottom-5 w-14 h-14 right-5 rounded-full outline-none opacity-0 -z-20', {
        'opacity-100 z-10 animate-fade-up animate-once animate-duration-500': isVisible,
      })}
      onClick={scrollToTop}
      size='icon'
      variant='default'>
      <ChevronUp className='w-10 h-10' strokeWidth={1.5} />
    </Button>
  )
}

export default ScrollToTop
