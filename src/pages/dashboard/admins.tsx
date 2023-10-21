import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AssignNewAdmin from '@/components/pages/dashboard/admins/AssignNewAdmin'
import ChangeRole from '@/components/pages/dashboard/admins/ChangeRole'
import ViewUser from '@/components/ui/dashboard/common/ViewUser'
import Img from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Typography from '@/components/ui/typography'
import { useGetUsersQuery } from '@/redux/features/userApi'
import { IUser } from '@/types/IUser'
import { getAccessToken } from '@/utils/auth/getAccessToken'
import { transformRole } from '@/utils/transformRole'

interface Props {
  userData: IUser
}

function AdminPage({ userData }: Props) {
  const token = getAccessToken()
  const { isLoading, isError, error, data } = useGetUsersQuery({ token, query: `admins=true` })

  const users: IUser[] = data?.data

  return (
    <DashboardLayout title='Manage Admins | Dashboard' userRole={userData?.role} isError={isError} error={error}>
      <Typography variant='h2' className='text-center py-10'>
        All Admins
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
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Change Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(user => (
              <TableRow key={user?.id}>
                <TableCell>
                  {user?.image ? (
                    <Img
                      className='min-w-[56px] w-14 h-14 object-cover rounded-full'
                      src={user.image}
                      alt={user.name}
                    />
                  ) : (
                    <Img
                      className='min-w-[56px] w-14 h-14 object-cover rounded-full'
                      src='/avatar.png'
                      alt={user.name}
                    />
                  )}
                </TableCell>
                <TableCell className='font-medium'>
                  <ViewUser user={user} />
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell> {transformRole(user?.role)}</TableCell>
                <TableCell>
                  <ChangeRole disabled={user?.role === 'super_admin'} email={user?.email} role={user?.role} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className='flex justify-center py-10'>
        <AssignNewAdmin />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminPage)
