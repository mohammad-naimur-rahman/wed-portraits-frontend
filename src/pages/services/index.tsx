import RootLayout from '@/components/layout/RootLayout'
import ServiceCard from '@/components/pages/homepage/services/ServiceCard'
import PaginationFields from '@/components/ui/common/PaginationFields'
import ServiceFilterFields from '@/components/ui/common/ServiceFilterFields'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { initServiceQueries } from '@/constants/initServiceQueries'
import { useGetAllServicesQuery } from '@/redux/features/servicesApi'
import { IResponse } from '@/types/IResponse'
import { IService } from '@/types/IService'
import { fetcher } from '@/utils/fetcher'
import { qs } from '@/utils/form/qs'
import { useEffect, useState } from 'react'

interface Props {
  services: IResponse<IService>
}

export const initQuery: IServiceQueries = {
  ...initServiceQueries,
  status: 'active',
}

export default function ServicesPage({ services }: Props) {
  const [query, setquery] = useState(initQuery)
  const [queryString, setqueryString] = useState(qs(initQuery))

  const { data, isFetching } = useGetAllServicesQuery(queryString)
  const newServices: IService[] = data?.data

  const [allServices, setallServices] = useState(services?.data)

  useEffect(() => {
    if (newServices) {
      setallServices(newServices)
    }
  }, [newServices])

  return (
    <RootLayout title='Services | Wed Portraits'>
      <main className='container space-y-3 min-h-[calc(100vh_-_64px)]'>
        <Typography variant='h2' className='py-5'>
          All Services
        </Typography>

        <ServiceFilterFields
          query={query}
          setquery={setquery}
          setqueryString={setqueryString}
          isFromDashboard={false}
        />

        {isFetching ? (
          <div className='grid grid-cols-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden' />
            ))}
          </div>
        ) : null}

        <div className='grid grid-cols-1 md:grid-cols-2'>
          {allServices?.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <PaginationFields data={data} query={query} setquery={setquery} setqueryString={setqueryString} />

        <NoContent isLoading={isFetching} data={data} content='Service' />
      </main>
    </RootLayout>
  )
}

export async function getStaticProps() {
  const services = await fetcher('services', qs(initQuery))
  return {
    props: {
      services,
    },
    revalidate: 60,
  }
}
