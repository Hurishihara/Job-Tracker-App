import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { api } from "@/util/axios-config"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { ArrowUpDown, BriefcaseBusiness, BriefcaseBusinessIcon, BuildingIcon, CalendarIcon, ClipboardIcon, ClockIcon, DeleteIcon, EyeIcon, LinkIcon, MapPinIcon, MoreHorizontal, NotepadTextIcon, PencilLineIcon } from "lucide-react"
import JobApplicationSheet from "./AddJobApplicationSheet"
import { useState } from "react"
import { JobApplicationDataWithId } from "@/schemas/formSchema"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,  } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle,  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export type JobApplication = {
    id: string,
    'Company Name': string,
    'Job Title': string,
    'Job Status': 'Pending' | 'Initial Interview' | 'Final Interview' | 'Job Offer' | 'Rejected',
    location: string,
    'Application Date': string,
    'Interview Date': string,
    'Job Type': 'Full-time' | 'Part-time' | 'Internship' | 'Contractual' | 'Freelance' | 'Temporary' | 'Gig' | 'Seasonal',
    'Application Method': string,
    'Job Link': string,
    notes: string,
}

export const columns: ColumnDef<JobApplication>[] = [
    {
        accessorKey: 'Company Name',
        header: () => <div className='font-primary font-bold'> Company Name </div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-semibold text-md'> {row.getValue('Company Name')} </div>
        } 
    },
    {
        accessorKey: 'Job Title',
        header: () => <div className='font-primary font-bold'> Job Title </div>,
        cell: ({ row }) => {
            return <div className='font-secondary'> {row.getValue('Job Title')} </div>
        } 
    },
    {
        accessorKey: 'Job Status',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status <ArrowUpDown className=' h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('Job Status') as string
            const badgeStyle = {
                backgroundColor:
                  status === 'Pending' ? 'rgba(255, 180, 3, 0.6)' :
                  status === 'Initial Interview' ? 'rgba(164, 170, 182, 0.6)' :
                  status === 'Final Interview' ? 'rgba(44, 204, 254, 0.6)' :
                  status === 'Job Offer' ? 'rgba(87, 240, 0, 0.6)' :
                  status === 'Rejected' ? 'rgba(254, 56, 57, 0.6)' : '#ccc',
                  
              };
            return <Badge style={badgeStyle} className='font-secondary font-semibold text-md text-black  rounded-[1rem]'>{status}</Badge>
        } 
    },
    {
        accessorKey: 'location',
        header: () => <div className='font-primary font-bold'> Location </div>,
        cell: ({ row }) => {
            return <div className='font-secondary text-md'> {row.getValue('location')} </div>
        } 
    },
    {
        accessorKey: 'Application Date',
        header: () => <div className='font-primary font-bold'> Application Date </div>,
        cell: ({ row }) => {
            const applicationDate = row.getValue('Application Date') as string
            if (!applicationDate) {
                return null
            }
            const formattedDate = formatDate(new Date(applicationDate), 'MM-dd-yyyy')
            return <div className='font-secondary text-md'> { formattedDate } </div>
        } 
    },
    {
        accessorKey: 'Interview Date',
        header: () => <div className='font-primary font-bold'> Interview Date </div>,
        cell: ({ row }) => {
            const interviewDate = row.getValue('Interview Date') as string
            if (!interviewDate) {
                return null
            }
            const formattedDate = formatDate(new Date(interviewDate), 'MM-dd-yyyy')
            return <div className='font-secondary text-md'> { formattedDate } </div>
        }
    },
    {
        accessorKey: 'Job Type',
        header: () => <div className='font-primary font-bold'> Job Type </div>,
        cell: ({ row }) => {
            return <div className='font-secondary text-md'> {row.getValue('Job Type')} </div>
        } 
    },
    {
        accessorKey: 'Application Method',
        header: () => <div className='font-primary font-bold'> Application Method </div>,
        cell: ({ row }) => {
            return <div className='font-secondary text-md'> {row.getValue('Application Method')} </div>
        }
    },
    {
        accessorKey: 'Job Link',
        header: () => <div className='font-primary font-bold'> Job Link </div>,
        cell: ({ row }) => {
            const jobLink = row.getValue('Job Link') as string
            return <a 
            href={jobLink} 
            target='_blank' 
            className="font-secondary text-md max-w-sm truncate relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-400 hover:after:w-full" >
                {jobLink}
            </a>
        } 
    },
    {
        accessorKey: 'notes',
        header: () => <div className='font-primary font-bold'> Notes </div>,
        cell: ({ row }) => {
            return <div className='font-secondary text-md max-w-xs truncate' > {row.getValue('notes')} </div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div> </div>,
        cell: ({ row }) =>  {
            const jobApplication = row.original
            const [ selectedJobApplication, setSelectedJobApplication ] = useState<JobApplicationDataWithId | undefined>(undefined)
            const [ isSheetOpen, setIsSheetOpen ] = useState(false)
            const [ isDialogOpen, setIsDialogOpen ] = useState(false)

            const deleteRow = async () => {
                await api.delete(`/api/job-application/delete-job-application/${jobApplication.id}`)
            }
            
            const openEditSheet = async () => {
                setSelectedJobApplication({
                    id: jobApplication.id,
                    companyName: jobApplication["Company Name"],
                    jobTitle: jobApplication["Job Title"],
                    jobStatus: jobApplication["Job Status"],
                    location: jobApplication.location,
                    applicationDate: new Date(jobApplication["Application Date"]),
                    interviewDate: new Date(jobApplication["Interview Date"]),
                    jobType: jobApplication["Job Type"],
                    applicationMethod: jobApplication["Application Method"],
                    jobLink: jobApplication["Job Link"],
                    notes: jobApplication.notes
                })
                setIsSheetOpen(!isSheetOpen)
            } 

            const openView = () => {
                setIsDialogOpen(!isDialogOpen)
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'> Open Menu</span>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='top' align='end' className='font-tertiary' >
                            <DropdownMenuLabel className='font-semibold'> Actions </DropdownMenuLabel>
                            <DropdownMenuItem className='text-muted-foreground font-medium cursor-pointer' onClick={openView}>
                                    <EyeIcon className='text-black' />
                                    View
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-muted-foreground font-medium' onClick={openEditSheet} >
                                    <div className='flex flex-row items-center gap-2'>
                                        <PencilLineIcon className='text-black' /> Edit
                                    </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-muted-foreground font-medium' onClick={deleteRow}>
                                <DeleteIcon className='text-black' /> 
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetContent side="left" className="p-3 min-w-[30rem]">
                                <SheetHeader>
                                    <SheetTitle>
                                        <BriefcaseBusiness style={{ height: 35, width: 35 }} className="text-gray-600" />
                                    </SheetTitle>
                                    <SheetTitle className='text-black font-primary font-bold text-xl'>
                                        Update an Existing Job Application
                                    </SheetTitle>
                                    <SheetDescription className='font-secondary font-semibold text-md'>
                                        Edit the form below to update an existing job application.
                                    </SheetDescription>
                                </SheetHeader>
                                <JobApplicationSheet jobApplication={selectedJobApplication} />
                            </SheetContent>
                        </Sheet>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  >
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
                                        value={jobApplication['Company Name']}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Job Title </label>
                                    <div className='flex flex-row items-center gap-2'>
                                    <BriefcaseBusinessIcon />
                                        <Input 
                                        className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        value={jobApplication['Job Title']}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Location </label>
                                    <div className='flex flex-row items-center gap-2'>
                                        <MapPinIcon />
                                        <Input className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        value={jobApplication['location']}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Application Date </label>
                                    <div className='flex flex-row items-center gap-2'>
                                    <CalendarIcon />
                                        <Input 
                                        className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        value={formatDate(new Date(jobApplication['Application Date'] as string), 'MM-dd-yyyy')}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Interview Date </label>
                                    <div className='flex flex-row items-center gap-2'>
                                    <CalendarIcon />
                                        <Input 
                                        className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        value={formatDate(new Date(jobApplication['Interview Date'] as string), 'MM-dd-yyyy')}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Job Type </label>
                                    <div className='flex flex-row items-center gap-2'>
                                        <ClockIcon />
                                        <Input 
                                        className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        value={jobApplication['Job Type']}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Application Method </label>
                                    <div className='flex flex-row items-center gap-2'>
                                        <ClipboardIcon />
                                        <Input 
                                        className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        value={jobApplication['Application Method']}
                                        readOnly />
                                    </div>
                                </div>
                                <div className='col-span-6 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Job Link </label>
                                    <div className='flex flex-row items-center gap-2'>
                                        <LinkIcon />
                                        <Input className='font-secondary font-semibold text-black p-5 bg-gray-100' 
                                        readOnly 
                                        value={jobApplication['Job Link']}
                                         />
                                    </div>
                                </div>
                                <div className='col-span-12 flex flex-col items-center gap-2'>
                                    <label className='font-primary font-bold max-w-sm text-muted-foreground'> Notes </label>
                                    <div className='flex flex-row items-center gap-2'>
                                        <NotepadTextIcon />
                                        <Textarea 
                                        className='font-secondary w-[25rem] resize-none font-semibold text-black p-5 bg-gray-100' 
                                        value={jobApplication['notes']}
                                        readOnly />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>  
                </>
            )
        }
    }
]