import ButtonExtended from '@/components/ui/buttonExtended'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import styles from '@/styles/markdown.module.scss'
import { IBlog } from '@/types/IBlog'
import { CornerDownRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Props {
  blog: IBlog
}

export default function PreviewBlog({ blog }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonExtended className='!rounded-full' icon={<CornerDownRight />}>
          Preview Blog
        </ButtonExtended>
      </DialogTrigger>
      <DialogContent className='max-w-4xl overflow-auto max-h-[calc(100dvh_-_20px)]'>
        <DialogHeader>
          <DialogTitle>{blog?.title}</DialogTitle>
        </DialogHeader>
        <ReactMarkdown className={styles.markdown}>{blog?.content}</ReactMarkdown>
      </DialogContent>
    </Dialog>
  )
}
