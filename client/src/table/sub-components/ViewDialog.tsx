import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { JobApplicationDataWithId } from '@/schemas/formSchema';
import { formatDate } from 'date-fns';
import { BriefcaseBusinessIcon, BuildingIcon, CalendarIcon, ClipboardIcon, ClockIcon, LinkIcon, MapPinIcon, NotepadTextIcon } from 'lucide-react';


const ViewDialog = ({
    open, 
    onDialogChange,
    jobApplication
}: {
    open: boolean, 
    onDialogChange: (open: boolean) => void,
    jobApplication?: JobApplicationDataWithId
}) => {
    return (
        <Dialog open={open} onOpenChange={onDialogChange}  >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-primary font-bold text-xl'> Job Application Details </DialogTitle>
                        <DialogDescription className='font-secondary font-semibold text-md'>
                            View the details of the job application.
                        </DialogDescription>
                </DialogHeader>
                <Separator className='my-2' /> 
                <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Company name </label>
                        <div className='flex flex-row items-center gap-2'>
                            <BuildingIcon />
                            <Input 
                            className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.companyName} 
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Job Title </label>
                        <div className='flex flex-row items-center gap-2'>
                            <BriefcaseBusinessIcon />
                            <Input 
                            className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.jobTitle}
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Location </label>
                        <div className='flex flex-row items-center gap-2'>
                            <MapPinIcon />
                            <Input className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.location}
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Application Date </label>
                        <div className='flex flex-row items-center gap-2'>
                        <CalendarIcon />
                            <Input 
                            className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.applicationDate ? formatDate(new Date(jobApplication.applicationDate), 'MM-dd-yyyy') : ''}
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Interview Date </label>
                        <div className='flex flex-row items-center gap-2'>
                        <CalendarIcon />
                            <Input 
                            className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.applicationDate ? formatDate(new Date(jobApplication.applicationDate), 'MM-dd-yyyy') : ''}
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Job Type </label>
                        <div className='flex flex-row items-center gap-2'>
                            <ClockIcon />
                            <Input 
                            className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.jobType}
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Application Method </label>
                        <div className='flex flex-row items-center gap-2'>
                            <ClipboardIcon />
                            <Input 
                            className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.applicationMethod}
                            readOnly />
                        </div>
                    </div>
                    <div className='col-span-6 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Job Link </label>
                        <div className='flex flex-row items-center gap-2'>
                            <LinkIcon />
                            <Input className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                            readOnly 
                            value={jobApplication?.jobLink}
                            />
                        </div>
                    </div>
                    <div className='col-span-12 flex flex-col items-center gap-2'>
                        <label className='font-primary font-bold max-w-sm text-muted-foreground'> Notes </label>
                        <div className='flex flex-row items-center gap-2'>
                            <NotepadTextIcon />
                            <Textarea 
                            className='font-secondary w-[25rem] resize-none font-semibold text-black p-5 bg-gray-100' 
                            value={jobApplication?.notes}
                            readOnly />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>    
    )
    
}

export default ViewDialog;