import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ButtonExtended from '@/components/ui/buttonExtended'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetAllFaqsQuery } from '@/redux/features/faqsApi'
import { IFaq } from '@/types/IFaq'
import { IUser } from '@/types/IUser'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'

interface Props {
  userData: IUser
}

function BlogsPage({ userData }: Props) {
  const { data, isFetching, isError, error } = useGetAllFaqsQuery(undefined)
  const faqs: IFaq[] = data?.data
  return (
    <DashboardLayout title='FAQs | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Frequently Asked Questions</Typography>
          <Link href='/dashboard/blogs/create'>
            <ButtonExtended icon={<FilePlus />}>Add New FAQ</ButtonExtended>
          </Link>
        </div>

        {isFetching ? (
          <div className='grid grid-cols-card gap-7'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-[450px]' />
            ))}
          </div>
        ) : null}

        <Accordion type='single' collapsible>
          {faqs?.map(faq => (
            <AccordionItem value={faq?.id} key={faq?.id}>
              <AccordionTrigger>{faq?.question}</AccordionTrigger>
              <AccordionContent>{faq?.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <NoContent isLoading={isFetching} data={data} content='FAQ' />
    </DashboardLayout>
  )
}

export default withAuth(BlogsPage)
