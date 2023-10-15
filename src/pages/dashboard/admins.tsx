import withAuth from '@/HOC/withAuth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AssignNewAdmin from '@/components/pages/dashboard/admins/AssignNewAdmin'
import { Button } from '@/components/ui/button'
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
  const { isError, error, data } = useGetUsersQuery({ token, query: `admins=true` })

  const users: IUser[] = data?.data

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
                <Button variant='default'>Change Role</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-center py-10'>
        <AssignNewAdmin />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminPage)
