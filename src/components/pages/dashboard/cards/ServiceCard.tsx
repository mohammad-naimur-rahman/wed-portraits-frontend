import { Button } from '@/components/ui/button'
import ButtonExtended from '@/components/ui/buttonExtended'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useDeleteServiceMutation } from '@/redux/features/servicesApi'
import { IError } from '@/types/IError'
import { IService } from '@/types/IService'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { PenSquare, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  service: IService
}

export default function ServiceCard({ service }: Props) {
  const [deleteService, { isError, error, isSuccess }] = useDeleteServiceMutation()

  const [showPrompt, setshowPrompt] = useState(false)
  const [delelteId, setdelelteId] = useState<string | null>(null)

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isSuccess) toast.success('Service Deleted Successfully')
  }, [isError, error, isSuccess])

  return (
    <div className='shadow-lg rounded-lg bg-secondary overflow-hidden flex flex-col justify-between'>
      <Img src={service?.image} alt={service?.title} className='w-full h-auto mx-auto aspect-video object-cover' />
      <Typography variant='h5' className='px-3 pt-2'>
        {service?.title}
      </Typography>
      <Typography variant='body-small' className='px-3 text-justify'>
        {service?.description}
      </Typography>
      <Button className='rounded-full self-start mt-1' variant='outline' size='sm'>
        {service?.category}
      </Button>

      <div className='flex flex-col gap-1 p-3'>
        <div className='flex justify-between py-2'>
          <Typography variant='body' className='font-semibold text-primary'>
            {transformRole(service?.status)}
          </Typography>
          <Typography variant='h4'>${service?.price}</Typography>
        </div>
        <div className='flex justify-between flex-wrap gap-3'>
          <ButtonExtended icon={<PenSquare />} variant='default' size='sm'>
            Edit Service
          </ButtonExtended>
          <ButtonExtended
            icon={<Trash />}
            variant='destructive'
            size='sm'
            onClick={() => {
              setdelelteId(service?.id)
              setshowPrompt(true)
            }}>
            Delete Service
          </ButtonExtended>
        </div>
      </div>
      <ConfirmationPrompt
        open={showPrompt}
        onOpenChange={setshowPrompt}
        cb={() => {
          deleteService({
            id: delelteId,
            token: getAccessToken(),
          })
        }}
      />
    </div>
  )
}
