import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ServiceCard from '@/components/pages/dashboard/cards/ServiceCard'
import AddNewService from '@/components/pages/dashboard/services/AddNewService'
import Typography from '@/components/ui/typography'
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
      <section className='p-5'>
        <div className='flex justify-between items-center pb-8'>
          <Typography variant='h2'>All Services</Typography>
          <AddNewService />
        </div>
        <div className='grid grid-cols-card gap-7'>
          {services?.map(service => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
