import { useState, useEffect } from "react"
import { columns, JobApplication } from "./Columns"
import { DataTable } from "./Data-Table"
import { api } from "@/util/axios-config"

const CustomTable = () => {
    const [data, setData] = useState<JobApplication[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/job-application/get-job-applications')
            setData(res.data.data)
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