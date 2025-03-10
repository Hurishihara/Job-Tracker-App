import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

export type JobApplication = {
    id: string,
    companyName: string,
    jobTitle: string,
    status: 'Pending' | 'Initial Interview' | 'Final Interview' | 'Job Offer' | 'Rejected',
    location: string,
    applicationDate: string,
    interviewDate: string,
    jobType: string,
    applicationMethod: string,
    jobLink: string,
    notes: string,
}

const badgeColors = (status: string) => {
    switch (status) {
        case 'Pending':
            return '#ffb403'
        case 'Initial Interview':
            return '#a4aab6'
        case 'Final Interview':
            return '#2cccfe'
        case 'Job Offer':
            return '#57f000'
        case 'Rejected':
            return '#fe3839'
        default:
            return 'bg-gray-400 text-black'
    }
}

export const columns: ColumnDef<JobApplication>[] = [
    {
        accessorKey: 'companyName',
        header: () => <div className='font-secondary font-bold'> Company Name </div>,
        cell: ({ row }) => {
            return <div className='font-primary font-semibold text-md'> {row.getValue('companyName')} </div>
        } 
    },
    {
        accessorKey: 'jobTitle',
        header: () => <div className='font-secondary font-bold'> Job Title </div>,
        cell: ({ row }) => {
            return <div className='font-primary'> {row.getValue('jobTitle')} </div>
        } 
    },
    {
        accessorKey: 'status',
        header: () => <div className='font-secondary font-bold'> Status </div>,
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const badgeStyle = {
                backgroundColor:
                  status === 'Pending' ? 'rgba(255, 180, 3, 0.6)' :
                  status === 'Initial Interview' ? 'rgba(164, 170, 182, 0.6)' :
                  status === 'Final Interview' ? 'rgba(44, 204, 254, 0.6)' :
                  status === 'Job Offer' ? 'rgba(87, 240, 0, 0.6)' :
                  status === 'Rejected' ? 'rgba(254, 56, 57, 0.6)' : '#ccc',
                  
              };
            return <Badge style={badgeStyle} className='font-primary font-semibold text-md text-black  rounded-[1rem]'>{status}</Badge>
        } 
    },
    {
        accessorKey: 'location',
        header: () => <div className='font-secondary font-bold'> Location </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('location')} </div>
        } 
    },
    {
        accessorKey: 'applicationDate',
        header: () => <div className='font-secondary font-bold'> Application Date </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('applicationDate')} </div>
        } 
    },
    {
        accessorKey: 'interviewDate',
        header: () => <div className='font-secondary font-bold'> Interview Date </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('interviewDate')} </div>
        }
    },
    {
        accessorKey: 'jobType',
        header: () => <div className='font-secondary font-bold'> Job Type </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('jobType')} </div>
        } 
    },
    {
        accessorKey: 'applicationMethod',
        header: () => <div className='font-secondary font-bold'> Application Method </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('applicationMethod')} </div>
        }
    },
    {
        accessorKey: 'jobLink',
        header: () => <div className='font-secondary font-bold'> Job Link </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('jobLink')} </div>
        } 
    },
    {
        accessorKey: 'notes',
        header: () => <div className='font-secondary font-bold'> Notes </div>,
        cell: ({ row }) => {
            return <div className='font-primary text-md'> {row.getValue('notes')} </div>
        }
    },
]