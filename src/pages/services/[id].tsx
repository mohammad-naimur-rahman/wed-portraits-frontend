import RootLayout from '@/components/layout/RootLayout'
import AllReviews from '@/components/pages/homepage/services/AllReviews'
import PostReview from '@/components/pages/homepage/services/PostReview'
import ServiceCard from '@/components/pages/homepage/services/ServiceCard'
import ButtonExtended from '@/components/ui/buttonExtended'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { useGetHasTakenServiceQuery } from '@/redux/features/bookingApi'
import { IResponse, ISingleResponse } from '@/types/IResponse'
import { IService } from '@/types/IService'
import { getUserId } from '@/utils/auth/getUserId'
import { fetcher } from '@/utils/fetcher'
import { qs } from '@/utils/form/qs'
import { FolderSearch } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  service: ISingleResponse<IService>
  otherServices: IResponse<IService>
}

export default function ServiceDetailsPage({ service: serviceData, otherServices: otherServicesData }: Props) {
  const service = serviceData?.data
  const otherServices = otherServicesData?.data
  const theOtherServices = otherServices?.filter(s => s.id !== service?.id)

  const [reviews, setreviews] = useState(service?.reviews)

  const { data } = useGetHasTakenServiceQuery({ serviceId: service?.id, userId: getUserId() })
  const canComment = data?.data?.length > 0

  return (
    <RootLayout title={service?.title}>
      <main>
        <section className='flex flex-col gap-8 p-5 max-w-4xl mx-auto'>
          <Typography variant='h2' className='text-primary'>
            {service?.title}
          </Typography>
          <Img src={service?.image} alt={service?.title} className='w-full h-auto' />
          <Typography variant='body'>{service?.description}</Typography>
          <div className='flex items-center justify-between'>
            <Typography variant='h4'>Category: {service?.category}</Typography>
            <Typography variant='h4'>Price: ${service?.price}</Typography>
          </div>

          {canComment ? <PostReview serviceId={service?.id} reviews={reviews} setreviews={setreviews} /> : null}

          <Typography variant='h3'>Reviews</Typography>
          {reviews?.length ? (
            <AllReviews reviews={reviews} />
          ) : (
            <p className='text-xl italic font-light text-secondary-foreground'>No reviews yet</p>
          )}
        </section>

        <section className='container'>
          <Typography variant='h2' className='p-5'>
            Other Services
          </Typography>

          <div className='grid grid-cols-1 md:grid-cols-2'>
            {theOtherServices?.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className='flex justify-center py-5'>
            <Link href='/services'>
              <ButtonExtended icon={<FolderSearch />} size='lg'>
                Browse All Services
              </ButtonExtended>
            </Link>
          </div>
        </section>
      </main>
    </RootLayout>
  )
}

export async function getServerSideProps({ params }: any) {
  const service = await fetcher(`services/${params?.id}`)
  const otherServicesQuery: Partial<IServiceQueries> = {
    limit: 5,
  }
  const otherServices = await fetcher('services', qs(otherServicesQuery))
  return {
    props: {
      service,
      otherServices,
    },
  }
}
