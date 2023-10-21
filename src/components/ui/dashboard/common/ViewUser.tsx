import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { IUser } from '@/types/IUser'
import { transformRole } from '@/utils/transformRole'
import Img from '../../img'
import Typography from '../../typography'

interface Props {
  user: IUser
}

export default function ViewUser({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className='text-primary font-semibold cursor-pointer text-base'>{user?.name}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center mb-4 text-2xl'>{user?.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription className='flex flex-col items-center gap-3'>
          <div className='w-40 h-40'>
            {user?.image ? (
              <Img className='object-cover rounded-full' src={user.image} alt={user.name} />
            ) : (
              <Img className='object-cover rounded-full' src='/avatar.png' alt={user.name} />
            )}
          </div>

          <Typography variant='body'>{user?.email}</Typography>
          {user.role !== 'user' ? (
            <Typography variant='h5'>Role: {transformRole(user?.role)}</Typography>
          ) : (
            <Typography variant='h5'>Total Bookings: {user.bookings.length}</Typography>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
