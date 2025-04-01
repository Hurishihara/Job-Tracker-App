import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { api } from "@/util/axios-config"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { ArrowUpDown, BriefcaseBusiness, Delete, MoreHorizontal, PencilLine } from "lucide-react"
import JobApplicationSheet from "./AddJobApplicationSheet"
import { useState } from "react"
import { JobApplicationDataWithId } from "@/schemas/formSchema"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
            return <div className='font-secondary text-md'> {row.getValue('Job Link')} </div>
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

            const deleteRow = async () => {
                await api.delete(`/job-application/delete-job-application/${jobApplication.id}`)
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
                setIsSheetOpen(true)
            } 
            return (
                <>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'> Open Menu</span>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent  side='bottom' align='end' className='font-tertiary' >
                            <DropdownMenuLabel className='font-semibold'> Actions </DropdownMenuLabel>
                            <DropdownMenuItem className='text-gray-600 font-medium' onClick={openEditSheet} >
                                <SheetTrigger asChild>
                                    <div className='flex flex-row items-center gap-2'>
                                        <PencilLine className='text-black' /> Edit
                                    </div>
                                </SheetTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-gray-600 font-medium' onClick={deleteRow}>
                                <Delete className='text-black' /> 
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                </>
            )
        }
    }
]