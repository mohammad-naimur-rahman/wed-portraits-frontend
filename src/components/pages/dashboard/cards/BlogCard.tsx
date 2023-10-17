import { IBlog } from '@/types/IBlog'

interface Props {
  blog: IBlog
}
export default function BlogCard({ blog }: Props) {
  console.log(blog)
  return <div>BlogCard</div>
}
