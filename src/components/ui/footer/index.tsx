import { footerLinks, socialLinks } from '@/constants/footerLinks'
import Link from 'next/link'
import { Button } from '../button'
import Img from '../img'
import Typography from '../typography'

export default function Footer() {
  return (
    <footer className='relative w-full'>
      <Img
        src='/footer.jpg'
        alt='Wed portraits'
        className='w-full h-full object-cover absolute top-1/2 transform -translate-y-1/2 left-0 -z-20'
        sizes='100vw'
      />
      <div className='w-full h-full object-cover absolute top-0 left-0 text-white bg-gradient-to-r from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.8)] -z-10' />

      <div className='text-white max-w-4xl ml-auto p-10 z-10 flex flex-col h-full justify-end gap-10'>
        <div className='flex flex-col md:flex-row gap-10'>
          <Img src='/logo.png' alt='Wed portraits' className='h-28 w-auto self-center' />

          <div className='min-w-max space-y-5'>
            <Typography variant='h3'>Important Links</Typography>
            <ul>
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Button variant='link' className='text-white text-lg underline'>
                    <Link href={href}>{label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className='min-w-max space-y-5'>
            <Typography variant='h3'>Follow Us</Typography>
            <ul className='flex flex-row md:flex-row'>
              {socialLinks.map(({ icon, href }) => (
                <li key={href}>
                  <Button variant='link' size='icon' className='text-white text-lg underline'>
                    <a href={href} target='_blank'>
                      {icon}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Typography variant='h5' className='text-center font-light'>
          Copyright ©{new Date().getFullYear()} Wed Portraits, By{' '}
          <a
            href='https://www.linkedin.com/in/mohammad-naimur-rahman/'
            target='_blank'
            className='font-semibold italic'>
            Naimur
          </a>
        </Typography>
      </div>
    </footer>
  )
}
