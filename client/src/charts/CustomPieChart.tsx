import { useEffect, useMemo  } from 'react'
import { Card, CardHeader } from '../components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart'
import { Pie, PieChart, Label } from 'recharts'
import { api } from '../util/axios-config'
import { usePieChartStore } from '../store/pie-chart-store'


const chartConfig2 = {
    totalApplications: {
        label: 'Total Applications'
    },
    Pending: {
        label: 'Pending',
        color: '#ffb403'
    },
    InitialInterview: {
        label: 'Initial Interview',
        color: '#a4aab6'
    },
    FinalInterview: {
        label: 'Final Interview',
        color: '#2cccfe'
    },
    JobOffers: {
        label: 'Job Offers',
        color: '#57f000'
    },
    Rejected: {
        label: 'Rejected',
        color: '#fe3839'
    },
}

export type ChartDataType = {
    status: string,
    applications: number,
    fill: string,
}

const CustomPieChart = () => {
    const { pieChartData, setPieChartData } = usePieChartStore()
    const totalApplications = useMemo(() => {
        return pieChartData.reduce((acc, curr) => acc + curr.applications, 0)
    }, [pieChartData])

    const chartDataWithPercentage = useMemo(() => {
        if (pieChartData.length === 0) {
            return [
                {
                    status: 'No data available',
                    applications: 1,
                    fill: '#d3d3d3',
                    percentage: '0.00'
                }
            ]
        }

        return pieChartData.map((data) => ({
            ...data,
            percentage: ((data.applications / totalApplications) * 100).toFixed(2),
        }))
    }, [totalApplications, pieChartData])

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const res = await api.get('/chart-data/get-pie-chart-data')
                setPieChartData(res.data.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchChartData()
    }, [])

    return (
        <Card className='rounded-2xl shadow-xl' >
            <CardHeader className='text-xl font-bold font-primary'>
                Application Status Distribution
            </CardHeader>
            <div className='grid grid-cols-12 items-center justify-items-center gap-0 w-full p-[1.5rem]'>
                <div className='col-span-5'>
                    <ChartContainer config={chartConfig2} className='min-h-[200px] w-full'>
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent className='font-secondary' formatter={(value, name, item ) => {
                                return <div className='flex flex-row items-center gap-2.5 text-md font-semibold font-secondary'>
                                    <div className='w-2 h-2 rounded-full' style={{ backgroundColor: item.payload.fill }} />
                                        <span>{name}</span>
                                        <span>{item.payload.percentage}% </span>
                                    </div>
                            }} />} />
                            <Pie
                                data={chartDataWithPercentage}
                                dataKey='applications' // ✅ Fixed: Corrected key
                                nameKey='status'
                                innerRadius={70}
                                outerRadius={100}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor='middle'
                                                    dominantBaseline='middle'
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className='fill-foreground text-[2.5rem] font-semibold font-primary'
                                                    >
                                                        {totalApplications.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className='fill-muted-foreground font-semibold font-primary'
                                                    >
                                                        Total Applications
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
                <div className='col-span-7'>
                    <ul>
                        {chartDataWithPercentage.map(({ status, fill, percentage }) => (
                            <li key={status} className='flex flex-row items-center gap-1 p-[0.5rem]'>
                                <div className='w-2 h-2 rounded-full mr-3' style={{ backgroundColor: fill }} />
                                <span className='text-md font-semibold font-secondary'>{status}</span>
                                <span className='mx-2 border-b-2 border-dotted border-gray-300 w-20' />
                                <span className='text-md font-medium font-semibold font-secondary'> {percentage}% </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    )
}

export default CustomPieChart
