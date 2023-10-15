import { ListTodo, UserSquare } from 'lucide-react'

export const UserNavLinks = [
  {
    label: 'Profile',
    icon: <UserSquare />,
    href: '/dashboard/profile',
  },
  {
    label: 'My Bookings',
    icon: <ListTodo />,
    href: '/dashboard/my-bookings',
  },
]
