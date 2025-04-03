import { SheetContent, SheetDescription, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import { BriefcaseBusinessIcon } from 'lucide-react'
import JobApplicationSheet from './JobApplicationSheet'

const AddJobApplication = ({
    open,
    onSheetChange,
}: {
    open: boolean
    onSheetChange: (open: boolean) => void
}) => {
    return (
        <Sheet open={open} onOpenChange={onSheetChange}>
            <SheetContent side='left' className='p-3 min-w-[30rem]'>
                <SheetHeader>
                    <SheetTitle>
                        <BriefcaseBusinessIcon style={{ height: 35, width: 35 }} className='text-gray-600' />
                    </SheetTitle>
                    <SheetTitle className='text-black font-primary font-bold text-xl'>
                        Create a New Job Application
                    </SheetTitle>
                    <SheetDescription className='font-secondary font semi-bold text-md'>
                        Fill out the form below to add a new job application to your list.
                    </SheetDescription>
                </SheetHeader>
                <JobApplicationSheet jobApplication={undefined} />
            </SheetContent>
        </Sheet>
    )
}

export default AddJobApplication