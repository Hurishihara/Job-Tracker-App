import CustomLineChart from "./charts/CustomLineChart"
import CustomPieChart from "./charts/CustomPieChart"
import CustomTable from "./applications/Page"

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-5 p-5">
            <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-6 3xl:col-span-6">
                <CustomPieChart />
            </div>
            <div className='sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-6 3xl:col-span-6'>
                <CustomLineChart />
            </div>
            <div className='col-span-12'>
                <CustomTable pageSize={5} />
            </div>
        </div>
    )
}

export default Dashboard
