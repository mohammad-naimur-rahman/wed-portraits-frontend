import { Skeleton } from '@/components/ui/skeleton'
import { transformRole } from '@/utils/transformRole'

interface Props {
  role: string
  isLoading: boolean
}
export default function UserRole({ role, isLoading }: Props) {
  if (isLoading) {
    return <Skeleton className='mb-5 w-64 h-5' />
  }
  return (
    <>
      {role !== 'user' ? (
        <p>
          <span className='font-semibold'>Role:</span> {transformRole(role)}
        </p>
      ) : null}
    </>
  )
}
