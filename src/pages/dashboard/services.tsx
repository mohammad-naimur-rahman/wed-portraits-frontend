import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import WeddingServices from '@/components/pages/dashboard/services/WeddingServices'

import { IUser } from '@/types/IUser'

interface Props {
  userData: IUser
}

function ProfilePage({ userData }: Props) {
  return (
    <DashboardLayout title='Services | Dashboard' userRole={userData?.role}>
      <WeddingServices />
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
