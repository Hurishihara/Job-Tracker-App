import { useState, useEffect } from "react"
import { columns, JobApplication } from "./Columns"
import { DataTable } from "./Data-Table"


const getData = async (): Promise<JobApplication[]> => {
    return [
        {
            id: '1',
            companyName: 'Google',
            jobTitle: 'Software Engineer',
            status: 'Pending',
            location: 'Mountain View, CA',
            applicationDate: '2021-01-01',
            interviewDate: '',
            jobType: 'Full-time',
            applicationMethod: 'Online',
            jobLink: 'https://careers.google.com/jobs/results/',
            notes: 'Applied online'
        },
        {
            id: '2',
            companyName: 'Facebook',
            jobTitle: 'Product Manager',
            status: 'Initial Interview',
            location: 'Menlo Park, CA',
            applicationDate: '2021-01-02',
            interviewDate: '2021-01-10',
            jobType: 'Full-time',
            applicationMethod: 'Referral',
            jobLink: 'https://www.facebook.com/careers/jobs/',
            notes: 'Referred by friend'
        },
        {
            id: '3',
            companyName: 'Amazon',
            jobTitle: 'Data Scientist',
            status: 'Final Interview',
            location: 'Seattle, WA',
            applicationDate: '2021-01-03',
            interviewDate: '2021-01-15',
            jobType: 'Full-time',
            applicationMethod: 'Recruiter',
            jobLink: 'https://www.amazon.jobs/en/',
            notes: 'Recruiter reached out'
        },
        {
            id: '4',
            companyName: 'Microsoft',
            jobTitle: 'Software Engineer',
            status: 'Job Offer',
            location: 'Redmond, WA',
            applicationDate: '2021-01-04',
            interviewDate: '2021-01-20',
            jobType: 'Full-time',
            applicationMethod: 'Online',
            jobLink: 'https://careers.microsoft.com/us/en',
            notes: 'Received offer'
        },
        {
            id: '5',
            companyName: 'Apple',
            jobTitle: 'Product Designer',
            status: 'Rejected',
            location: 'Cupertino, CA',
            applicationDate: '2021-01-05',
            interviewDate: '',
            jobType: 'Full-time',
            applicationMethod: 'Online',
            jobLink: 'https://www.apple.com/jobs/us/',
            notes: 'Application rejected'
        },
        {
            id: '6',
            companyName: 'Netflix',
            jobTitle: 'Data Analyst',
            status: 'Pending',
            location: 'Los Gatos, CA',
            applicationDate: '2021-01-06',
            interviewDate: '',
            jobType: 'Full-time',
            applicationMethod: 'Online',
            jobLink: 'https://jobs.netflix.com/',
            notes: 'Applied online'
        },
        {
            id: '7',
            companyName: 'Uber',
            jobTitle: 'Product Manager',
            status: 'Initial Interview',
            location: 'San Francisco, CA',
            applicationDate: '2021-01-07',
            interviewDate: '2021-01-25',
            jobType: 'Full-time',
            applicationMethod: 'Recruiter',
            jobLink: 'https://www.uber.com/us/en/careers/',
            notes: 'Recruiter reached out'
        },
        {
            id: '8',
            companyName: 'Airbnb',
            jobTitle: 'Software Engineer',
            status: 'Final Interview',
            location: 'San Francisco, CA',
            applicationDate: '2021-01-08',
            interviewDate: '2021-02-01',
            jobType: 'Full-time',
            applicationMethod: 'Online',
            jobLink: 'https://careers.airbnb.com/',
            notes: 'Applied online'
        },
        {
            id: '9',
            companyName: 'Lyft',
            jobTitle: 'Data Scientist',
            status: 'Job Offer',
            location: 'San Francisco, CA',
            applicationDate: '2021-01-09',
            interviewDate: '2021-02-10',
            jobType: 'Full-time',
            applicationMethod: 'Recruiter',
            jobLink: 'https://www.lyft.com/careers',
            notes: 'Received offer'
        },
        {
            id: '10',
            companyName: 'Twitter',
            jobTitle: 'Product Designer',
            status: 'Rejected',
            location: 'San Francisco, CA',
            applicationDate: '2021-01-10',
            interviewDate: '',
            jobType: 'Full-time',
            applicationMethod: 'Online',
            jobLink: 'https://careers.twitter.com/en.html',
            notes: 'Application rejected'
        },
    ]
}

const CustomTable = () => {
    const [data, setData] = useState<JobApplication[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await getData()
            setData(result)
        };

        fetchData()
    }, [])
    return (
        <div className='container mx-auto py-5'>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default CustomTable;