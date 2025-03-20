import CustomLineChart from "./charts/CustomLineChart"
import CustomPieChart from "./charts/CustomPieChart"
import CustomTable from "./applications/Page"

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-4 p-[1.5rem]">
            <div className="col-span-6">
                <CustomPieChart />
            </div>
            <div className='col-span-6'>
                <CustomLineChart />
            </div>
            <div className='col-span-12'>
                <CustomTable />
            </div>
        </div>
    )
}

export default Dashboard
