import { Button } from '@/components/ui/button'
import ButtonExtended from '@/components/ui/buttonExtended'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { PlusCircle, X } from 'lucide-react'
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

  const removeTag = (tag: string) => {
    setblogTags(blogTags.filter(t => t !== tag))
  }

  return (
    <div className='space-y-3'>
      <Typography variant='h3'>Tags</Typography>
      <div className='flex flex-wrap gap-3'>
        {blogTags.map(tag => (
          <div key={tag} className='flex items-center gap-2 border rounded-full pl-3 bg-secondary'>
            <p className='font-semibold'>{tag}</p>
            <Button className='rounded-full' variant='outline' type='button' size='icon' onClick={() => removeTag(tag)}>
              <X />
            </Button>
          </div>
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
        <ButtonExtended icon={<PlusCircle />} onClick={addTags} type='button'>
          Add Tag
        </ButtonExtended>
      </div>
    </div>
  )
}
