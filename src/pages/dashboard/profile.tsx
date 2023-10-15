import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useGetProfileQuery } from '@/redux/features/userApi'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'

interface Props {
  userData: IUser
}

function ProfilePage({ userData }: Props) {
  const token = getAccessToken()
  const { data } = useGetProfileQuery(token)
  // console.log(data)

  return (
    <DashboardLayout title='Profile' userRole={userData?.role}>
      <p>Profile</p>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
