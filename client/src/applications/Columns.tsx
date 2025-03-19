import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type JobApplication = {
    id: string,
    'Company Name': string,
    'Job Title': string,
    'Job Status': 'Pending' | 'Initial Interview' | 'Final Interview' | 'Job Offer' | 'Rejected',
    location: string,
    'Application Date': string,
    'Interview Date': string,
    'Job Type': string,
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
            return <div className='font-secondary text-md'> {row.getValue('notes')} </div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div> </div>,
        cell: ({ row }) =>  {
            const jobApplication = row.original
            
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'> Open Menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        <DropdownMenuLabel> Actions </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log('Edit', jobApplication)}> Edit </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', jobApplication)}> Delete </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]