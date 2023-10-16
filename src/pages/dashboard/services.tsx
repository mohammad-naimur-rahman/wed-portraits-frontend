import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ServiceCard from '@/components/pages/dashboard/cards/ServiceCard'
import AddNewService from '@/components/pages/dashboard/services/AddNewService'
import ServiceFilterFields from '@/components/ui/common/ServiceFilterFields'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { initServiceQueries } from '@/constants/initServiceQueries'
import { useGetAllServicesQuery } from '@/redux/features/servicesApi'
import { IService } from '@/types/IService'

import { IUser } from '@/types/IUser'
import { qs } from '@/utils/form/qs'
import { useState } from 'react'

interface Props {
  userData: IUser
}

function ProfilePage({ userData }: Props) {
  const [query, setquery] = useState(initServiceQueries)
  const [queryString, setqueryString] = useState(qs(initServiceQueries))

  const { data, isFetching } = useGetAllServicesQuery(queryString)
  const services: IService[] = data?.data

  return (
    <DashboardLayout title='Services | Dashboard' userRole={userData?.role}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Services</Typography>
          <AddNewService />
        </div>

        <ServiceFilterFields query={query} setquery={setquery} setqueryString={setqueryString} />

        {isFetching ? (
          <div className='grid grid-cols-card gap-7'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-[500px]' />
            ))}
          </div>
        ) : null}
        <div className='grid grid-cols-card gap-7'>
          {services?.map(service => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      </section>

      <NoContent isLoading={isFetching} data={data} content='Service' />
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
