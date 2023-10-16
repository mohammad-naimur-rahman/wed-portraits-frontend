import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { IService } from '@/types/IService'
import { transformRole } from '@/utils/transformRole'

interface Props {
  service: IService
}

export default function ServiceCard({ service }: Props) {
  return (
    <div className='shadow-lg p-3 rounded-lg bg-secondary w-80 space-y-2'>
      <Img src={service?.image} alt={service?.title} />
      <Typography variant='h5'>{service?.title}</Typography>
      <Typography variant='body-small'>{service?.description}</Typography>
      <Button className='rounded-full' variant='outline' size='sm'>
        {service?.category}
      </Button>
      <div className='flex justify-between py-2'>
        <Typography variant='body' className='font-semibold text-primary'>
          {transformRole(service?.status)}
        </Typography>
        <Typography variant='h4'>${service?.price}</Typography>
      </div>
      <div className='flex justify-between'>
        <Button variant='default' size='sm'>
          Edit Service
        </Button>
        <Button variant='destructive' size='sm'>
          Delete Service
        </Button>
      </div>
    </div>
  )
}
