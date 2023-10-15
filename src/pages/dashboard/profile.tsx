import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileImage from '@/components/pages/dashboard/profile/ProfileImage'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/userApi'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'

interface Props {
  userData: IUser
}

function ProfilePage({ userData }: Props) {
  const token = getAccessToken()
  const { data, isLoading } = useGetProfileQuery(token)

  const [
    updateProfile,
    { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError },
  ] = useUpdateProfileMutation()
  // console.log(data)

  const userDetails: IUser = data?.data

  return (
    <DashboardLayout title={`Profile | ${userData?.name}`} userRole={userData?.role}>
      <div className='flex flex-col text-center justify-center items-center'>
        <ProfileImage userData={userDetails} isLoading={isLoading} updateProfile={updateProfile} />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
