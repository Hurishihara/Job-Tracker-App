import CustomAreaChart from '../charts/CustomAreaChart';
import CustomBarChart from '../charts/CustomBarChart';
import CustomLineChart from '../charts/CustomLineChart';
import CustomPieChart from '../charts/CustomPieChart'

const Analytics = () => {
    return (
        <div className='grid grid-cols-12 gap-5 p-5'>
            <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-6 3xl:col-span-6">
                <CustomPieChart />
            </div>
            <div className='sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-6 3xl:col-span-6'>
                <CustomLineChart />
            </div>
            <div className='sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-6 3xl:col-span-6'>
                <CustomBarChart />
            </div>
            <div className='sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 2xl:col-span-6 3xl:col-span-6'>
                <CustomAreaChart />
            </div>
        </div>
    )
}

export default Analytics;