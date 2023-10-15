import {
  HelpCircle,
  Image as ImageIcon,
  Layers,
  ListTodo,
  ScrollText,
  ShieldCheck,
  Sticker,
  UserCog2,
  UserSquare,
} from 'lucide-react'

export const SuperAdminNavLinks = [
  {
    label: 'Profile',
    icon: <UserSquare />,
    href: '/dashboard/profile',
  },
  {
    label: 'Users',
    icon: <UserCog2 />,
    href: '/dashboard/users',
  },
  {
    label: 'Manage Admins',
    icon: <ShieldCheck />,
    href: '/dashboard/admins',
  },
  {
    label: 'Services',
    icon: <Layers />,
    href: '/dashboard/services',
  },
  {
    label: 'Bookings',
    icon: <ListTodo />,
    href: '/dashboard/bookings',
  },
  {
    label: 'Feedback',
    icon: <Sticker />,
    href: '/dashboard/feedbacks',
  },
  {
    label: 'Blog',
    icon: <ScrollText />,
    href: '/dashboard/blogs',
  },
  {
    label: 'FAQ',
    icon: <HelpCircle />,
    href: '/dashboard/faqs',
  },
  {
    label: 'Gallery',
    icon: <ImageIcon />,
    href: '/dashboard/gallery',
  },
]
