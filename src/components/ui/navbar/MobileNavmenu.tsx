import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'

interface Props {
  navigationMenu: {
    href: string
    label: string
  }[]
}

export default function MobileNavmenu({ navigationMenu }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="block md:hidden">
        <AlignJustify className="w-6 h-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {navigationMenu.map(({ href, label }) => (
          <DropdownMenuItem className="cursor-pointer" key={href}>
            <Link href={href}>{label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
