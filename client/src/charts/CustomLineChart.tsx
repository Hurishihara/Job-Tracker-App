import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import CustomLegendContent from "./CustomLegendContent";
import { useEffect } from "react";
import { api } from "../util/axios-config";
import { useLineChartStore } from "../store/line-chart-store";


const chartConfig2 = {
    totalApplications: {
        label: "Total Applications"
    },
    Pending: {
        label: "Pending",
        color: "#ffb403"
    },
    InitialInterview: {
        label: "Initial Interview",
        color: "#a4aab6"
    },
    FinalInterview: {
        label: "Final Interview",
        color: "#2cccfe"
    },
    JobOffers: {
        label: "Job Offers",
        color: "#57f000"
    },
    Rejected: {
        label: "Rejected",
        color: "#fe3839"
    },
}

const CustomLineChart = () => {
    const { lineChartData, setLineChartData } = useLineChartStore();

    const getCurrentHalfYearRange = () => {
        const currentMonth = new Date().getMonth() + 1;
        return currentMonth <= 6 ? { startMonth: 1, endMonth: 6 } : { startMonth: 7, endMonth: 12 };
    }
    
    useEffect(() => {
        const fetchLineChartData = async () => {
            try {
                const { startMonth, endMonth } = getCurrentHalfYearRange();
                const res = await api.get('/chart-data/get-line-chart-data', {
                    params: { startMonth, endMonth }
                })
                setLineChartData(res.data);
            }
            catch (err) {
                console.error('Error fetching line chart data:', err);
            }
        }
        fetchLineChartData();
    }, [])

    return (
        <Card className='rounded-2xl shadow-xl p-[1.5rem]'>
            <CardHeader className='text-xl font-bold font-primary'>
                Application Status Trends Over Time
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig2} className=' h-[250px] w-full'>
                    <LineChart accessibilityLayer data={lineChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis className='font-secondary font-semibold' dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line dataKey='Pending' type='natural' stroke='#ffb403' strokeWidth={2} dot={false} />
                        <Line dataKey='Initial Interview' type='natural' stroke='#a4aab6' strokeWidth={2} dot={false} />
                        <Line dataKey='Final Interview' type='natural' stroke='#2cccfe' strokeWidth={2} dot={false} />
                        <Line dataKey='Job Offer' type='natural' stroke='#57f000' strokeWidth={2} dot={false} />
                        <Line dataKey='Rejected' type='natural' stroke='#fe3839' strokeWidth={2} dot={false} />
                        <Legend  verticalAlign='top' height={60} wrapperStyle={{ paddingBottom: 10 }} content={<CustomLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
  
  export default CustomLineChart;
  