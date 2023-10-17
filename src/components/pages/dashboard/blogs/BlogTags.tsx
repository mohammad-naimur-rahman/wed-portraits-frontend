import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface Props {
  blogTags: string[]
  setblogTags: Dispatch<SetStateAction<string[]>>
}

export default function BlogTags({ blogTags, setblogTags }: Props) {
  const [currentTag, setcurrentTag] = useState('')

  const addTags = (e: FormEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setblogTags([...blogTags, currentTag])
    setcurrentTag('')
  }

  return (
    <div className='space-y-3'>
      <Typography variant='h3'>Tags</Typography>
      <div className='flex flex-wrap gap-2'>
        {blogTags.map(tag => (
          <Button key={tag} className='rounded-full' variant='outline' type='button' size='sm'>
            {tag}
          </Button>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        <Input
          placeholder='Write a tag...'
          type='text'
          value={currentTag}
          onChange={e => setcurrentTag(e.target.value)}
          className='max-w-[220px]'
        />
        <Button onClick={addTags} type='button'>
          Add Tag
        </Button>
      </div>
    </div>
  )
}
