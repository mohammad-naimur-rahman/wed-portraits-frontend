import { Facebook, Instagram, Twitter } from 'lucide-react'
import { ReactNode } from 'react'

interface IFooterLink {
  label: string
  href: string
}

export const footerLinks: IFooterLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'Signup',
    href: '/signup',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Blogs',
    href: '/blogs',
  },
]

interface ISocialLink {
  icon: ReactNode
  href: string
}

export const socialLinks: ISocialLink[] = [
  {
    icon: <Facebook />,
    href: 'https://facebook.com/naimurrrrrrr',
  },
  {
    icon: <Twitter />,
    href: 'https://twitter.com/naimurrrrr',
  },
  {
    icon: <Instagram />,
    href: 'https://instagram.com/naimurrrrrrr',
  },
]
