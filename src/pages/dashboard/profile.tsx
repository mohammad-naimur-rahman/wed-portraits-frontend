import withAuth from '@/HOC/WithAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useGetProfileQuery } from '@/redux/features/userApi'
import { getAccessToken } from '@/utils/auth/getAccessToken'

function ProfilePage() {
  const token = getAccessToken()
  const { data } = useGetProfileQuery(token)
  console.log(data)
  return (
    <DashboardLayout title='Profile'>
      <p>Profile</p>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
