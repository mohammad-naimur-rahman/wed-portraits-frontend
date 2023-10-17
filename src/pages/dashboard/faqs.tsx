import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AddNewFaq from '@/components/pages/dashboard/faqs/AddNewFaq'
import UpdateFaq from '@/components/pages/dashboard/faqs/UpdateFaq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useDeleteFaqMutation, useGetAllFaqsQuery } from '@/redux/features/faqsApi'
import { IError } from '@/types/IError'
import { IFaq } from '@/types/IFaq'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  userData: IUser
}

function BlogsPage({ userData }: Props) {
  const { data, isFetching, isError, error } = useGetAllFaqsQuery(undefined)
  const faqs: IFaq[] = data?.data

  const [deleteFaq, { isSuccess, isError: isDeleteError, error: deleteError }] = useDeleteFaqMutation()

  const [showPrompt, setshowPrompt] = useState(false)
  const [delelteId, setdelelteId] = useState<string | null>(null)

  useEffect(() => {
    if (isDeleteError) toast.error(errorMessage(deleteError as IError))
    if (isSuccess) toast.success('FAQ Deleted Successfully')
  }, [isDeleteError, deleteError, isSuccess])

  return (
    <DashboardLayout title='FAQs | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Frequently Asked Questions</Typography>
          <AddNewFaq />
        </div>

        {isFetching ? (
          <div className='flex flex-col gap-5 max-w-4xl'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-12' />
            ))}
          </div>
        ) : (
          <Accordion type='single' collapsible className='max-w-4xl mt-5'>
            {faqs?.map(faq => (
              <AccordionItem value={faq?.id} key={faq?.id} className='w-full'>
                <div className='flex items-center w-full justify-between'>
                  <AccordionTrigger>{faq?.question}</AccordionTrigger>
                  <div className='flex gap-2'>
                    <UpdateFaq faq={faq} />
                    <Button
                      variant='destructive'
                      size='icon'
                      className='min-w-[40px]'
                      onClick={() => {
                        setdelelteId(faq?.id)
                        setshowPrompt(true)
                      }}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                <AccordionContent>{faq?.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteFaq({
            id: delelteId,
            token: getAccessToken(),
          })
        }}
      />
      <NoContent isLoading={isFetching} data={data} content='FAQ' />
    </DashboardLayout>
  )
}

export default withAuth(BlogsPage)
