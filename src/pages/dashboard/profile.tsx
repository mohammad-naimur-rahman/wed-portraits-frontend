import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Name from '@/components/pages/dashboard/profile/Name'
import ProfileImage from '@/components/pages/dashboard/profile/ProfileImage'
import TotalBookings from '@/components/pages/dashboard/profile/TotalBookings'
import UserEmail from '@/components/pages/dashboard/profile/UserEmail'
import UserRole from '@/components/pages/dashboard/profile/UserRole'
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
    if (isUpdateError) toast.error(errorMessage(updateError as IError))
    if (isUpdateSuccess) toast.success('Profile Updated Successfully')
  }, [isError, error, isUpdateError, isUpdateSuccess, updateError])

  return (
    <DashboardLayout title={`Profile | ${userData?.name}`} userRole={userData?.role} isError={isError} error={error}>
      <section className='flex flex-col text-center justify-center items-center'>
        <ProfileImage userData={userDetails} isLoading={isLoading} updateProfile={updateProfile} />
        <Name name={userDetails?.name} isLoading={isLoading} updateProfile={updateProfile} />
        <UserEmail email={userDetails?.email} isLoading={isLoading} updateProfile={updateProfile} />
        <UserRole role={userDetails?.role} isLoading={isLoading} />
        <TotalBookings userDetails={userDetails} isLoading={isLoading} />
      </section>
    </DashboardLayout>
  )
}

export default withAuth(ProfilePage)
