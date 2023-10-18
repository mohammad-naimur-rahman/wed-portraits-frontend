import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useDeleteFeedbackMutation, useGetAllFeedbacksQuery } from '@/redux/features/feedbacksApi'
import { IError } from '@/types/IError'
import { IFeedback } from '@/types/IFeedback'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  userData: IUser
}

function FeedbackPage({ userData }: Props) {
  const { data, isFetching, isError, error } = useGetAllFeedbacksQuery(getAccessToken())
  const feedbacks: IFeedback[] = data?.data

  const [deleteFeedback, { isSuccess, isError: isDeleteError, error: deleteError }] = useDeleteFeedbackMutation()

  const [showPrompt, setshowPrompt] = useState(false)
  const [delelteId, setdelelteId] = useState<string | null>(null)

  useEffect(() => {
    if (isDeleteError) toast.error(errorMessage(deleteError as IError))
    if (isSuccess) toast.success('Feedback Deleted Successfully')
  }, [isDeleteError, deleteError, isSuccess])

  return (
    <DashboardLayout title='Services | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Feedbacks</Typography>
        </div>
        {isFetching ? (
          <div className='flex flex-col gap-5 max-w-4xl'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-12' />
            ))}
          </div>
        ) : (
          <Accordion type='single' collapsible className='max-w-4xl mt-5'>
            {feedbacks?.map(feedback => (
              <AccordionItem value={feedback?.id} key={feedback?.id} className='w-full'>
                <div className='flex items-center w-full justify-between'>
                  <AccordionTrigger>{feedback?.topic}</AccordionTrigger>
                  <div className='flex gap-2'>
                    <Button
                      variant='destructive'
                      size='icon'
                      className='min-w-[40px]'
                      onClick={() => {
                        setdelelteId(feedback?.id)
                        setshowPrompt(true)
                      }}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                <AccordionContent>{feedback?.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteFeedback({
            id: delelteId,
            token: getAccessToken(),
          })
        }}
      />
      <NoContent isLoading={isFetching} data={data} content='Feedback' />
    </DashboardLayout>
  )
}

export default withAuth(FeedbackPage)
