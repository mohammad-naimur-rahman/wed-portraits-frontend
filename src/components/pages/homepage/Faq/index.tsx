import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Reveal from '@/components/ui/reveal'
import Typography from '@/components/ui/typography'
import { IFaq } from '@/types/IFaq'

interface Props {
  faqs: IFaq[]
}

export default function Faq({ faqs }: Props) {
  return (
    <section className='container py-10'>
      <Reveal inViewClassName='animate-shrink'>
        <Typography className='text-center pt-8 pb-4' variant='h1'>
          Frequetly Asked Questions
        </Typography>
        <Typography variant='h3' className='text-center pb-8'>
          Your question, we answer
        </Typography>
      </Reveal>

      <Accordion type='single' collapsible className='max-w-4xl mx-auto'>
        {faqs?.map(faq => (
          <AccordionItem value={faq?.id} key={faq?.id} className='w-full'>
            <AccordionTrigger>{faq?.question}</AccordionTrigger>
            <AccordionContent>{faq?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
