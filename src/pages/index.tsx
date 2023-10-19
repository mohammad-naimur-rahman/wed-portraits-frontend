import RootLayout from '@/components/layout/RootLayout'
import Blogs from '@/components/pages/homepage/Blogs'
import Faq from '@/components/pages/homepage/Faq'
import FeedbackSection from '@/components/pages/homepage/FeedbackSection'
import Gallery from '@/components/pages/homepage/Gallery'
import HomepageHeader from '@/components/pages/homepage/HomepageHeader'
import Overview from '@/components/pages/homepage/Overview'
import Testimonials from '@/components/pages/homepage/Testimonials'
import Services from '@/components/pages/homepage/services'
import ButtonExtended from '@/components/ui/buttonExtended'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Typography from '@/components/ui/typography'
import { serviceCategoryArray } from '@/constants/dashboard/serviceCategoryArray'
import { IBlog } from '@/types/IBlog'
import { IFaq } from '@/types/IFaq'
import { IGallery } from '@/types/IGallery'
import { IResponse } from '@/types/IResponse'
import { IReview } from '@/types/IReview'
import { IService } from '@/types/IService'
import { fetcher } from '@/utils/fetcher'
import { qs } from '@/utils/form/qs'
import { FolderSearch } from 'lucide-react'
import Link from 'next/link'

interface Props {
  services: IResponse<IService>
  weddingServices: IResponse<IService>
  anniversaryServices: IResponse<IService>
  birthdayServices: IResponse<IService>
  otherServices: IResponse<IService>
  upcomingServices: IResponse<IService>
  gallery: IResponse<IGallery>
  testimonials: IResponse<IReview>
  blogs: IResponse<IBlog>
  faqs: IResponse<IFaq>
}

export default function Home({
  services,
  weddingServices,
  anniversaryServices,
  birthdayServices,
  otherServices,
  upcomingServices,
  gallery,
  testimonials,
  blogs,
  faqs,
}: Props) {
  const allServices = services?.data
  const allWeddingServices = weddingServices?.data
  const allAnniversaryServices = anniversaryServices?.data
  const allBirthdayServices = birthdayServices?.data
  const allOtherServices = otherServices?.data
  const allUpcomingServices = upcomingServices?.data

  const galleryPictures = gallery?.data
  const allTestimonials = testimonials?.data
  const allBlogs = blogs?.data
  const allFaqs = faqs?.data

  return (
    <RootLayout title='Wed Portraits'>
      <HomepageHeader />
      <Overview />

      <Typography className='text-center pt-8 pb-4' variant='h1'>
        Our Services
      </Typography>
      <Typography variant='h3' className='text-center pb-8'>
        Some of our services
      </Typography>
      <Tabs defaultValue='All Categories'>
        <div className='flex w-full justify-center'>
          <TabsList className=''>
            {['All Categories', ...serviceCategoryArray]?.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value='All Categories'>
          <Services services={allServices} />
        </TabsContent>
        <TabsContent value='Wedding'>
          <Services services={allWeddingServices} />
        </TabsContent>
        <TabsContent value='Birthday'>
          <Services services={allBirthdayServices} />
        </TabsContent>
        <TabsContent value='Anniversary'>
          <Services services={allAnniversaryServices} />
        </TabsContent>
        <TabsContent value='Others'>
          <Services services={allOtherServices} />
        </TabsContent>
      </Tabs>
      <div className='flex justify-center py-5'>
        <Link href='/services'>
          <ButtonExtended icon={<FolderSearch />} size='lg'>
            Browse All Services
          </ButtonExtended>
        </Link>
      </div>

      <Typography className='text-center pt-8 pb-4' variant='h1'>
        Upcoming Services
      </Typography>
      <Typography variant='h3' className='text-center pb-8'>
        Some of our upcoming services
      </Typography>
      <Services services={allUpcomingServices} />
      <div className='flex justify-center py-5'>
        <Link href='/services'>
          <ButtonExtended icon={<FolderSearch />} size='lg'>
            Browse All Services
          </ButtonExtended>
        </Link>
      </div>

      <Gallery images={galleryPictures} />
      <Testimonials testimonials={allTestimonials} />
      <Blogs blogs={allBlogs} />
      <Faq faqs={allFaqs} />
      <FeedbackSection />
    </RootLayout>
  )
}

export async function getStaticProps() {
  const allQuery: Partial<IServiceQueries> = {
    status: 'active',
    page: 1,
    limit: 4,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }
  const weddingQuery: Partial<IServiceQueries> = { ...allQuery, category: 'Wedding' }
  const anniversaryQuery: Partial<IServiceQueries> = { ...allQuery, category: 'Anniversary' }
  const birthdayQuery: Partial<IServiceQueries> = { ...allQuery, category: 'Birthday' }
  const othersQuery: Partial<IServiceQueries> = { ...allQuery, category: 'Others' }
  const upcomingQuery: Partial<IServiceQueries> = {
    status: 'upcoming',
    limit: 4,
  }
  const blogQuery = { limit: 4 }

  const services = await fetcher('services', qs(allQuery))
  const weddingServices = await fetcher('services', qs(weddingQuery))
  const anniversaryServices = await fetcher('services', qs(anniversaryQuery))
  const birthdayServices = await fetcher('services', qs(birthdayQuery))
  const otherServices = await fetcher('services', qs(othersQuery))
  const upcomingServices = await fetcher('services', qs(upcomingQuery))
  const gallery = await fetcher('galleries')
  const testimonials = await fetcher('reviews/testimonials')
  const blogs = await fetcher('blogs', qs(blogQuery))
  const faqs = await fetcher('faqs')
  return {
    props: {
      services,
      weddingServices,
      anniversaryServices,
      birthdayServices,
      otherServices,
      upcomingServices,
      gallery,
      testimonials,
      blogs,
      faqs,
    },
    revalidate: 60,
  }
}
