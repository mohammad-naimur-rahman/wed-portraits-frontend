import { useGetProfileQuery } from '@/redux/features/userApi'
import { getAccessToken } from '@/utils/auth/getAccessToken'

export default function ProfilePage() {
  const token = getAccessToken()
  const { data } = useGetProfileQuery(token)
  console.log(data)
  return <div>ProfilePage</div>
}
