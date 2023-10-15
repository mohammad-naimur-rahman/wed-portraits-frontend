import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Typography from '@/components/ui/typography'
import { useGetUsersQuery, useUpdateProfileMutation } from '@/redux/features/userApi'
import { IError } from '@/types/IError'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface Props {
  userData: IUser
}

function AdminPage({ userData }: Props) {
  const token = getAccessToken()
  const { isLoading, isError, error, data } = useGetUsersQuery({ token, query: `admins=true` })
  const [updateProfile, { isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] =
    useUpdateProfileMutation()

  const users: IUser[] = data?.data

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isUpdateError) toast.error(errorMessage(updateError as IError))
    if (isUpdateSuccess) toast.success('Profile Updated Successfully')
  }, [isError, error, isUpdateError, isUpdateSuccess, updateError])

  return (
    <DashboardLayout title='Manage Admins | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <Typography variant='h2' className='text-center py-10'>
        All Admins
      </Typography>
      <Table className='max-w-4xl mx-auto'>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Delete User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(user => (
            <TableRow key={user?.id}>
              <TableCell className='font-medium'>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell> {transformRole(user?.role)}</TableCell>
              <TableCell>
                <Button variant={'destructive'} size='icon'>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-center py-10'>
        <Button> New Admin</Button>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminPage)
