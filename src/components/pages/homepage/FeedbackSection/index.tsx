import Reveal from '@/components/ui/reveal'
import Typography from '@/components/ui/typography'
import FeedbackForm from './FeedbackForm'

export default function FeedbackSection() {
  return (
    <section className='container py-10'>
      <Reveal inViewClassName='animate-shrink'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          You say, We listen
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          Give us feedback to improve us more
        </Typography>
      </Reveal>

      <FeedbackForm />
    </section>
  )
}
