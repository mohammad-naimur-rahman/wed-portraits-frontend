import { useGetAllServicesQuery } from '@/redux/features/servicesApi'
import AddNewService from './AddNewService'

export default function WeddingServices() {
  const { data, isLoading } = useGetAllServicesQuery('category=Wedding')
  return (
    <section>
      <p>Hello</p>
      <div className='flex justify-end'>
        <AddNewService category='Wedding' />
      </div>
    </section>
  )
}
