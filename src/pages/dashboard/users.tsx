import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import UpdateUser from '@/components/pages/dashboard/users/UpdateUser'
import { Button } from '@/components/ui/button'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Typography from '@/components/ui/typography'
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/features/userApi'
import { IError } from '@/types/IError'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { getUserData } from '@/utils/auth/getUserData'
import { errorMessage } from '@/utils/error'
import { transformRole } from '@/utils/transformRole'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  userData: IUser
}

function UsersPage({ userData }: Props) {
  const token = getAccessToken()
  const userDetails = getUserData()
  const [showDeletePromt, setshowDeletePromt] = useState(false)
  const [deleteUserId, setdeleteUserId] = useState('')
  const { isLoading, isError, error, data } = useGetUsersQuery({ token })

  const [deleteUser, { isSuccess, isError: isDeleteError, error: deleteError }] = useDeleteUserMutation()

  const users: IUser[] = data?.data

  useEffect(() => {
    if (isError) toast.error(errorMessage(error as IError))
    if (isDeleteError) toast.error(errorMessage(deleteError as IError))
    if (isSuccess) toast.success('User Deleted Successfully')
  }, [isError, isDeleteError, error, deleteError, isSuccess])

  return (
    <DashboardLayout title='All Users | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <Typography className='text-center py-10' variant='h2'>
        All Users
      </Typography>
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className='w-full max-w-4xl mx-auto h-10 my-2' />
          ))}
        </>
      ) : (
        <Table className='max-w-4xl mx-auto'>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className='w-40'>Total Bookings</TableHead>
              <TableHead>Update User</TableHead>
              <TableHead>Delete User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(user => (
              <TableRow key={user?.id}>
                <TableCell className='font-medium'>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell> {transformRole(user?.role)}</TableCell>
                <TableCell className='text-right'>{user?.bookings?.length}</TableCell>
                <TableCell>
                  <UpdateUser user={user} disabled={user?.role !== 'user'} />
                </TableCell>
                <TableCell>
                  <Button
                    variant={'destructive'}
                    size='icon'
                    disabled={
                      user?.role === 'super_admin' &&
                      (userDetails?.role === 'admin' || userDetails?.role === 'super_admin')
                    }
                    onClick={() => {
                      setdeleteUserId(user?.id)
                      setshowDeletePromt(true)
                    }}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmationPrompt
        open={showDeletePromt}
        onOpenChange={setshowDeletePromt}
        cb={() => deleteUser({ id: deleteUserId, token })}
      />
    </DashboardLayout>
  )
}

export default withAuth(UsersPage)
