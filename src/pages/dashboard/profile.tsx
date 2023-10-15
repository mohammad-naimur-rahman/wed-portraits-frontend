import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileImage from '@/components/pages/dashboard/profile/ProfileImage'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/userApi'
import { IError } from '@/types/IError'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface Props {
  userData: IUser
}

function ProfilePage({ userData }: Props) {
  const token = getAccessToken()
  const { isLoading, isError, error, data } = useGetProfileQuery(token)

  const [updateProfile, { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] =
    useUpdateProfileMutation()

  const userDetails: IUser = data?.data

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isUpdateError) toast.error(errorMessage(error as IError))
    if (isUpdateSuccess) toast.success('Profile Updated Successfully')
  }, [isError, error, isUpdateError, isUpdateSuccess, updateError])

  return (
    <DashboardLayout title={`Profile | ${userData?.name}`} userRole={userData?.role} isError={isError} error={error}>
      <div className='flex flex-col text-center justify-center items-center'>
        <ProfileImage userData={userDetails} isLoading={isLoading} updateProfile={updateProfile} />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
