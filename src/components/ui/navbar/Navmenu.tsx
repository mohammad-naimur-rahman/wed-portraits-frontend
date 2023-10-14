import Link from 'next/link'
import { Button } from '../button'

interface Props {
  navigationMenu: {
    href: string
    label: string
  }[]
}

export default function Navmenu({ navigationMenu }: Props) {
  return (
    <ul className="hidden md:flex items-center">
      {navigationMenu.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}>
            <Button variant="ghost">{label}</Button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
