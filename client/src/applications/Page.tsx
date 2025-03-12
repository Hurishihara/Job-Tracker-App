import { useState, useEffect } from "react"
import { columns, JobApplication } from "./Columns"
import { DataTable } from "./Data-Table"


const getData = async (): Promise<JobApplication[]> => {
    return [
        {
            id: '1',
            'Company Name': 'Google',
            'Job Title': 'Software Engineer',
            status: 'Pending',
            location: 'Mountain View, CA',
            'Application Date': '2021-01-01',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://careers.google.com/jobs/results/',
            notes: 'Applied online'
        },
        {
            id: '2',
            'Company Name': 'Facebook',
            'Job Title': 'Product Manager',
            status: 'Initial Interview',
            location: 'Menlo Park, CA',
            'Application Date': '2021-01-02',
            'Interview Date': '2021-01-10',
            'Job Type': 'Full-time',
            'Application Method': 'Referral',
            'Job Link': 'https://www.facebook.com/careers/jobs/',
            notes: 'Referred by friend'
        },
        {
            id: '3',
            'Company Name': 'Amazon',
            'Job Title': 'Data Scientist',
            status: 'Final Interview',
            location: 'Seattle, WA',
            'Application Date': '2021-01-03',
            'Interview Date': '2021-01-15',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://www.amazon.jobs/en/',
            notes: 'Recruiter reached out'
        },
        {
            id: '4',
            'Company Name': 'Microsoft',
            'Job Title': 'Software Engineer',
            status: 'Job Offer',
            location: 'Redmond, WA',
            'Application Date': '2021-01-04',
            'Interview Date': '2021-01-20',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://careers.microsoft.com/us/en',
            notes: 'Received offer'
        },
        {
            id: '5',
            'Company Name': 'Apple',
            'Job Title': 'Product Designer',
            status: 'Rejected',
            location: 'Cupertino, CA',
            'Application Date': '2021-01-05',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://www.apple.com/jobs/us/',
            notes: 'Application rejected'
        },
        {
            id: '6',
            'Company Name': 'Netflix',
            'Job Title': 'Data Analyst',
            status: 'Pending',
            location: 'Los Gatos, CA',
            'Application Date': '2021-01-06',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://jobs.netflix.com/',
            notes: 'Applied online'
        },
        {
            id: '7',
            'Company Name': 'Uber',
            'Job Title': 'Product Manager',
            status: 'Initial Interview',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-07',
            'Interview Date': '2021-01-25',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://www.uber.com/us/en/careers/',
            notes: 'Recruiter reached out'
        },
        {
            id: '8',
            'Company Name': 'Airbnb',
            'Job Title': 'Software Engineer',
            status: 'Final Interview',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-08',
            'Interview Date': '2021-02-01',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://careers.airbnb.com/',
            notes: 'Applied online'
        },
        {
            id: '9',
            'Company Name': 'Lyft',
            'Job Title': 'Data Scientist',
            status: 'Job Offer',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-09',
            'Interview Date': '2021-02-10',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://www.lyft.com/careers',
            notes: 'Received offer'
        },
        {
            id: '10',
            'Company Name': 'Twitter',
            'Job Title': 'Product Designer',
            status: 'Rejected',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-10',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://careers.twitter.com/en.html',
            notes: 'Application rejected'
        },
        {
            id: '11',
            'Company Name': 'Pinterest',
            'Job Title': 'Data Analyst',
            status: 'Pending',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-11',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://careers.pinterest.com/',
            notes: 'Applied online'
        },
        {
            id: '12',
            'Company Name': 'Salesforce',
            'Job Title': 'Software Engineer',
            status: 'Initial Interview',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-12',
            'Interview Date': '2021-02-15',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://www.salesforce.com/company/careers/',
            notes: 'Recruiter reached out'
        },
        {
            id: '13',
            'Company Name': 'Slack',
            'Job Title': 'Product Manager',
            status: 'Final Interview',
            location: 'San Francisco, CA',
            'Application Date': '2021-01-13',
            'Interview Date': '2021-02-20',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://slack.com/intl/en-ca/careers',
            notes: 'Applied online'
        },
        {
            id: '14',
            'Company Name': 'Zoom',
            'Job Title': 'Software Engineer',
            status: 'Job Offer',
            location: 'San Jose, CA',
            'Application Date': '2021-01-14',
            'Interview Date': '2021-02-25',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://zoom.us/careers',
            notes: 'Received offer'
        },
        {
            id: '15',
            'Company Name': 'TikTok',
            'Job Title': 'Product Designer',
            status: 'Rejected',
            location: 'Los Angeles, CA',
            'Application Date': '2021-01-15',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://www.tiktok.com/jobs/',
            notes: 'Application rejected'
        },
        {
            id: '16',
            'Company Name': 'Snapchat',
            'Job Title': 'Data Analyst',
            status: 'Pending',
            location: 'Los Angeles, CA',
            'Application Date': '2021-01-16',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://www.snap.com/en-US/jobs/',
            notes: 'Applied online'
        },
        {
            id: '17',
            'Company Name': 'Spotify',
            'Job Title': 'Software Engineer',
            status: 'Initial Interview',
            location: 'Los Angeles, CA',
            'Application Date': '2021-01-17',
            'Interview Date': '2021-03-01',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://www.spotifyjobs.com/',
            notes: 'Recruiter reached out'
        },
        {
            id: '18',
            'Company Name': 'Shopify',
            'Job Title': 'Product Manager',
            status: 'Final Interview',
            location: 'Los Angeles, CA',
            'Application Date': '2021-01-18',
            'Interview Date': '2021-03-10',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://www.shopify.com/careers',
            notes: 'Applied online'
        },
        {
            id: '19',
            'Company Name': 'Reddit',
            'Job Title': 'Software Engineer',
            status: 'Job Offer',
            location: 'Los Angeles, CA',
            'Application Date': '2021-01-19',
            'Interview Date': '2021-03-15',
            'Job Type': 'Full-time',
            'Application Method': 'Recruiter',
            'Job Link': 'https://www.redditinc.com/careers',
            notes: 'Received offer'
        },
        {
            id: '20',
            'Company Name': 'LinkedIn',
            'Job Title': 'Product Designer',
            status: 'Rejected',
            location: 'Los Angeles, CA',
            'Application Date': '2021-01-20',
            'Interview Date': '',
            'Job Type': 'Full-time',
            'Application Method': 'Online',
            'Job Link': 'https://www.linkedin.com/jobs/',
            notes: 'Application rejected'
        }
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