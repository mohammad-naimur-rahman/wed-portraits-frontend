import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ServiceCard from '@/components/pages/dashboard/cards/ServiceCard'
import AddNewService from '@/components/pages/dashboard/services/AddNewService'
import { useGetAllServicesQuery } from '@/redux/features/servicesApi'
import { IService } from '@/types/IService'

import { IUser } from '@/types/IUser'

interface Props {
  userData: IUser
}

function ProfilePage({ userData }: Props) {
  const { data, isFetching } = useGetAllServicesQuery(undefined)
  const services: IService[] = data?.data

  return (
    <DashboardLayout title='Services | Dashboard' userRole={userData?.role}>
      <section>
        <div className='flex flex-wrap gap-6'>
          {services?.map(service => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
        <div className='flex justify-end'>
          <AddNewService />
        </div>
      </section>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
