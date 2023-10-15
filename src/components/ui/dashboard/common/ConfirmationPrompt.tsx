import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { CheckCircle, XCircle } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import ButtonExtended from '../../buttonExtended'

interface Props {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  cb: () => void
}

export default function ConfirmationPrompt({ open, onOpenChange, cb }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader className='sm:text-center'>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter className='items-center sm:justify-center gap-5 mt-10'>
          <DialogClose>
            <ButtonExtended icon={<CheckCircle />} className='px-12' onClick={cb}>
              Yes
            </ButtonExtended>
          </DialogClose>
          <DialogClose>
            <ButtonExtended icon={<XCircle />} variant='destructive' className='px-12'>
              No
            </ButtonExtended>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
