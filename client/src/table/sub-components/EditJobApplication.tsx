import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { JobApplicationDataWithId } from '@/schemas/formSchema'
import { BriefcaseBusinessIcon } from 'lucide-react'
import JobApplicationSheet from './JobApplicationSheet'

const EditJobApplicationSheet = ({
    open,
    onSheetChange,
    jobApplication
}: {
    open: boolean, 
    onSheetChange: (open: boolean) => void,
    jobApplication?: JobApplicationDataWithId
}) => {
    return (
        <Sheet open={open} onOpenChange={onSheetChange} >
            <SheetContent side='left' className='p-3 min-w-[30rem]'>
                <SheetHeader>
                    <SheetTitle>
                        <BriefcaseBusinessIcon style={{ height: 35, width: 35 }} className='text-gray-600' />
                    </SheetTitle>
                    <SheetTitle className='text-black font-primary font-bold text-xl'>
                        Update an Existing Job Application
                    </SheetTitle>
                    <SheetDescription className='font-secondary font-semibold text-md'>
                        Edit the form below to update an existing job application.
                    </SheetDescription>
                </SheetHeader>
                <JobApplicationSheet jobApplication={jobApplication} />
            </SheetContent>
        </Sheet>
    )
}

export default EditJobApplicationSheet