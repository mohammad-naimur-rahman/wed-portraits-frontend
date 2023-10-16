import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { serviceCategoryArray } from '@/constants/dashboard/serviceCategoryArray'
import { initServiceQueries } from '@/constants/initServiceQueries'
import { qs } from '@/utils/form/qs'
import { Eraser, Search } from 'lucide-react'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import ButtonExtended from '../buttonExtended'

interface Props {
  query: IServiceQueries
  setquery: Dispatch<SetStateAction<IServiceQueries>>
  setqueryString: Dispatch<SetStateAction<string>>
}

export default function ServiceFilterFields({ query, setquery, setqueryString }: Props) {
  const initCategoryValues = serviceCategoryArray.map(categry => ({ value: categry, label: categry }))

  const categoryValues = [
    {
      value: 'all',
      label: 'All',
    },
    ...initCategoryValues,
  ]

  const statusValues = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'upcoming', label: 'Upcoming' },
  ]

  const sortByValues = [
    { value: 'createdAt', label: 'Date' },
    { value: 'price', label: 'Price' },
    { value: 'title', label: 'Title' },
  ]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const clearFields = () => {
    setquery(initServiceQueries)
    setqueryString('')
  }

  const handleQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs(query)
    setqueryString(queryStr)
  }

  return (
    <form onSubmit={handleQuery} className='flex flex-wrap gap-2 px-2 mt-5 justify-center pb-5'>
      <Input
        placeholder='🔍  Search with title'
        className='max-w-xs'
        value={query.search}
        onChange={e => setquery({ ...query, search: e.target.value })}
      />

      <Input
        placeholder='Minimum price'
        className='w-max min-w-[120px]'
        value={query.minPrice}
        type='number'
        onChange={e => setquery({ ...query, minPrice: Number(e.target.value) })}
      />

      <Input
        placeholder='Maximum price'
        className='w-max min-w-[120px]'
        value={query.maxPrice}
        type='number'
        onChange={e => setquery({ ...query, maxPrice: Number(e.target.value) })}
      />

      <Select
        value={query.category}
        onValueChange={value =>
          setquery({
            ...query,
            category: value as IServiceQueries['category'],
          })
        }>
        <SelectTrigger className='w-max min-w-[120px]'>
          <SelectValue placeholder='Category' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className='overflow-auto max-h-[50dvh]'>
            <SelectLabel>Category</SelectLabel>
            {categoryValues?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={query.status}
        onValueChange={value =>
          setquery({
            ...query,
            status: value as IServiceQueries['status'],
          })
        }>
        <SelectTrigger className='w-max min-w-[120px]'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className='overflow-auto max-h-[50dvh]'>
            <SelectLabel>Status</SelectLabel>
            {statusValues?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={query.sortBy}
        onValueChange={value =>
          setquery({
            ...query,
            sortBy: value as unknown as IServiceQueries['sortBy'],
          })
        }>
        <SelectTrigger className='w-max min-w-[120px]'>
          <SelectValue placeholder='Sort By' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className='overflow-auto max-h-[50dvh]'>
            <SelectLabel>Sort By</SelectLabel>
            {sortByValues?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={query.sortOrder}
        onValueChange={value =>
          setquery({
            ...query,
            sortOrder: value as unknown as IServiceQueries['sortOrder'],
          })
        }>
        <SelectTrigger className='w-max min-w-[120px]'>
          <SelectValue placeholder='Sort By' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className='overflow-auto max-h-[50dvh]'>
            <SelectLabel>Sort Order</SelectLabel>
            {sortOrderValues?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ButtonExtended icon={<Search />}>Search</ButtonExtended>
      <ButtonExtended type='button' variant='destructive' icon={<Eraser />} onClick={clearFields}>
        Clear Filter
      </ButtonExtended>
    </form>
  )
}
