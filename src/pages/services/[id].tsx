import RootLayout from '@/components/layout/RootLayout'
import AllReviews from '@/components/pages/homepage/services/AllReviews'
import PostReview from '@/components/pages/homepage/services/PostReview'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { ISingleResponse } from '@/types/IResponse'
import { IService } from '@/types/IService'
import { fetcher } from '@/utils/fetcher'
import { useState } from 'react'

interface Props {
  service: ISingleResponse<IService>
}

export default function ServiceDetailsPage({ service: serviceData }: Props) {
  const service = serviceData?.data
  console.log(service.reviews)
  const [reviews, setreviews] = useState(service?.reviews)
  return (
    <RootLayout title={service?.title}>
      <main className='flex flex-col gap-8 p-5 max-w-4xl mx-auto'>
        <Typography variant='h2'>{service?.title}</Typography>
        <Img src={service?.image} alt={service?.title} className='w-full h-auto' />
        <Typography variant='body'>{service?.description}</Typography>
        <div className='flex items-center justify-between'>
          <Typography variant='h4'>Category: {service?.category}</Typography>
          <Typography variant='h4'>Price: ${service?.price}</Typography>
        </div>

        <PostReview serviceId={service?.id} reviews={reviews} setreviews={setreviews} />

        <Typography variant='h3'>Reviews</Typography>
        {reviews?.length ? (
          <AllReviews reviews={reviews} />
        ) : (
          <p className='text-xl italic font-light text-secondary-foreground'>No reviews yet</p>
        )}
      </main>
    </RootLayout>
  )
}

export async function getServerSideProps({ params }: any) {
  const service = await fetcher(`services/${params?.id}`)
  return {
    props: {
      service,
    },
  }
}
