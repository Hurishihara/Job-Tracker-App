import { useEffect, useMemo  } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
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

    const getCurrentHalfYearRange = () => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        return currentMonth <= 6 ? { startMonth: 1, endMonth: 6, rangeText: `January - June ${currentYear}` } : { startMonth: 7, endMonth: 12, rangeText: `July - December ${currentYear}` };
    }

    const { startMonth, endMonth, rangeText } = getCurrentHalfYearRange();

    const chartDataWithPercentage = useMemo(() => {
        if (pieChartData.length === 0) {
            return [
                {
                    status: 'Pending',
                    applications: 1,
                    fill: '#ffb403',
                    percentage: '0.00'
                },
                {
                    status: 'Initial Interview',
                    applications: 1,
                    fill: '#a4aab6',
                    percentage: '0.00'
                },
                {
                    status: 'Final Interview',
                    applications: 1,
                    fill: '#2cccfe',
                    percentage: '0.00'
                },
                {
                    status: 'Job Offer',
                    applications: 1,
                    fill: '#57f000',
                    percentage: '0.00'
                },
                {
                    status: 'Rejected',
                    applications: 1,
                    fill: '#fe3839',
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
                const res = await api.get('/chart-data/get-pie-chart-data', {
                    params: { startMonth, endMonth }
                })
                setPieChartData(res.data.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchChartData()
    }, [])

    return (
        <Card className='rounded-2xl shadow-xl w-full' >
            <CardHeader className='text-2xl font-primary'>
                <CardTitle> Application Distribution </CardTitle>
                <CardDescription> { rangeText } </CardDescription>
            </CardHeader>
            <div className='grid grid-cols-12 items-center justify-items-center gap-0 w-full p-[1.5rem]'>
                <div className='col-span-5'>
                    <ChartContainer config={chartConfig2} className='min-h-[200px] w-full'>
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent className='font-secondary' formatter={(_, name, item ) => {
                                return <div className='flex flex-row items-center gap-2.5 text-md font-semibold font-secondary'>
                                    <div className='w-2 h-2 rounded-full' style={{ backgroundColor: item.payload.fill }} />
                                        <span>{name}</span>
                                        <span>{item.payload.percentage}% </span>
                                    </div>
                            }} />} />
                            <Pie
                                data={chartDataWithPercentage}
                                dataKey='applications'
                                nameKey='status'
                                innerRadius={60}
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
