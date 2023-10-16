import { cn } from '@/lib/utils'
import { qs } from '@/utils/form/qs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import ButtonExtended from '../buttonExtended'

interface Props {
  query: any
  setquery: Dispatch<SetStateAction<any>>
  data: {
    data: object[]
    meta: {
      total: number
      page: number
      limit: number
    }
  }
  setqueryString: Dispatch<SetStateAction<string>>
}

export default function PaginationFields<T, K>({ query, setquery, data, setqueryString }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [query.page])
  const next = () => {
    setquery({ ...query, page: query?.page + 1 })
    const queryStr = qs({ ...query, page: query?.page + 1 })
    setqueryString(queryStr)
  }

  const previous = () => {
    setquery({ ...query, page: query?.page - 1 })
    const queryStr = qs({ ...query, page: query?.page - 1 })
    setqueryString(queryStr)
  }

  const isNextButtonDisabled = (): boolean => {
    const totalPages = Math.ceil(data?.meta?.total / data?.meta?.limit)
    return data?.meta?.page >= totalPages
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-1 py-10', {
        hidden: !data?.data?.length,
      })}>
      <ButtonExtended
        className='min-w-[200px]'
        variant='outline'
        icon={<ChevronLeft />}
        disabled={data?.meta?.page <= 1}
        onClick={previous}>
        Previous
      </ButtonExtended>
      <ButtonExtended
        className='min-w-[200px]'
        variant='outline'
        icon={<ChevronRight />}
        iconPosition='right'
        disabled={isNextButtonDisabled()}
        onClick={next}>
        Next
      </ButtonExtended>
    </div>
  )
}
