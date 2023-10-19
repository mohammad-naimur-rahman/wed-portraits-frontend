import { IService } from '@/types/IService'
import ServiceCard from './ServiceCard'

interface Props {
  services: IService[]
}

export default function Services({ services }: Props) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 container'>
      {services?.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
