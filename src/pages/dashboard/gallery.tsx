import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AddNewImage from '@/components/pages/dashboard/gallery/AddNewImage'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import Img from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetAllGalleryQuery } from '@/redux/features/galleryApi'
import { IGallery } from '@/types/IGallery'

import { IUser } from '@/types/IUser'

interface Props {
  userData: IUser
}

function GalleryPage({ userData }: Props) {
  const { data, isFetching, error, isError } = useGetAllGalleryQuery(undefined)
  const gallery: IGallery[] = data?.data

  return (
    <DashboardLayout title='Gallery | Dashboard' userRole={userData?.role} error={error} isError={isError}>
      <section className='p-5'>
        <div className='flex justify-between items-center pb-5'>
          <Typography variant='h2'>All Gallery Images</Typography>
          <AddNewImage />
        </div>

        {isFetching ? (
          <div className='grid grid-cols-card gap-7'>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className='shadow-lg rounded-lg bg-secondary overflow-hidden h-[500px]' />
            ))}
          </div>
        ) : null}
        <div className='columns-3 space-y-5'>
          {gallery?.map(image => (
            <Img src={image?.image} alt={image?.id} key={image?.id} />
          ))}
        </div>
      </section>

      <NoContent isLoading={isFetching} data={data} content='Image' />
    </DashboardLayout>
  )
}

export default withAuth(GalleryPage)
