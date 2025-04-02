import { useState, useEffect } from "react"
import { columns, JobApplication } from "./Columns"
import { DataTable } from "./Data-Table"
import { api } from "@/util/axios-config"

const CustomTable = ({ pageSize }: any) => {
    const [data, setData] = useState<JobApplication[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/api/job-application/get-job-applications')
            setData(res.data.data)
        };

        fetchData()
    }, [])
    return (
        <DataTable columns={columns} data={data} pageSize={pageSize} />    
    )
}

export default CustomTable;