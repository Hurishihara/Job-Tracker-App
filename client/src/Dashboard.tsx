import CustomPieChart from "./CustomPieChart"
import CustomLineChart from "./CustomLineChart"
import CustomTable from "./applications/Page"


const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-4 p-[1.5rem] bg-gray-100">
            <div className="col-span-6">
                <CustomPieChart />
            </div>
            <div className='col-span-6'>
                <CustomLineChart />
            </div>
            <div className='col-span-12 min-h-[85vh]'>
                <CustomTable />
            </div>
        </div>
    )
}

export default Dashboard
