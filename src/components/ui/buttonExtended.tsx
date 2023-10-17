import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from './button'
import Spinner from './icons/Spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  isLoading?: boolean
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  className?: string
}

export default function ButtonExtended({
  children,
  icon,
  isLoading = false,
  variant = 'default',
  size = 'default',
  iconPosition = 'left',
  disabled,
  className,
  ...rest
}: Props) {
  return (
    <Button
      {...rest}
      disabled={isLoading || disabled}
      className={cn('min-w-[150px]', className)}
      variant={variant}
      size={size}>
      <div className='flex items-center gap-2'>
        {iconPosition === 'left' ? (
          <span>{isLoading ? <Spinner /> : <span>{icon ? <span className='w-5 h-5'>{icon}</span> : null}</span>}</span>
        ) : null}

        {isLoading ? '' : <span>{children}</span>}

        {iconPosition === 'right' ? (
          <span>{isLoading ? <Spinner /> : <span>{icon ? <span className='w-5 h-5'>{icon}</span> : null}</span>}</span>
        ) : null}
      </div>
    </Button>
  )
}
