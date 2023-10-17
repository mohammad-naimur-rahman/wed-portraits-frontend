import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import GalleryCard from '@/components/pages/dashboard/cards/GalleryCard'
import AddNewImage from '@/components/pages/dashboard/gallery/AddNewImage'
import NoContent from '@/components/ui/dashboard/common/NoContent'
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
        <div className='columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-5 space-y-5 break-inside-avoid-column'>
          {gallery?.map(image => (
            <GalleryCard key={image?.id} image={image} />
          ))}
        </div>
      </section>

      <NoContent isLoading={isFetching} data={data} content='Image' />
    </DashboardLayout>
  )
}

export default withAuth(GalleryPage)
