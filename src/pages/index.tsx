import RootLayout from '@/components/layout/RootLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Typography from '@/components/ui/typography'
import { serviceCategoryArray } from '@/constants/dashboard/serviceCategoryArray'

export default function Home() {
  return (
    <RootLayout title='Homepage'>
      <Typography variant='h2' className='py-8 text-center'>
        All Services
      </Typography>
      <Tabs defaultValue='Wedding'>
        <div className='flex w-full justify-center'>
          <TabsList className=''>
            {serviceCategoryArray?.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value='Wedding'>{/* <WeddingServices /> */}</TabsContent>
        <TabsContent value='Birthday'>Change your password here.</TabsContent>
        <TabsContent value='Anniversary'>Change your password here.</TabsContent>
        <TabsContent value='Others'>Change your password here.</TabsContent>
      </Tabs>
    </RootLayout>
  )
}
