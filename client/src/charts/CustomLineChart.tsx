import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import CustomLegendContent from "./CustomLegendContent";
import { useEffect } from "react";
import { api } from "../util/axios-config";
import { useLineChartStore } from "../store/line-chart-store";


const chartConfig2 = {
    Pending: {
        label: "Pending",
        color: '#F59E0B' // amber
    },
    InitialInterview: {
        label: "Initial Interview",
        color: '#10B981' // emerald green
    },
    FinalInterview: {
        label: "Final Interview",
        color: '#2563EB' // muted royal blue
    },
    JobOffers: {
        label: "Job Offers",
        color: '#FACC15' // gold
    },
    Rejected: {
        label: "Rejected",
        color: '#EF4444' // muted red
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
        <Card className='rounded-2xl shadow-xl'>
            <CardHeader className='text-xl font-primary'>
                <CardTitle> Application Trends Over Time </CardTitle>
                <CardDescription> January - June 2025 </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig2} className='h-[250px] w-full'>
                    <LineChart accessibilityLayer data={lineChartData} margin={{ left: 12, right: 12, bottom: 12 }} >
                        <CartesianGrid vertical={false} />
                        <XAxis className='font-secondary font-semibold' dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line dataKey='Pending' type='natural' stroke='#F59E0B' strokeWidth={2} dot={false} />
                        <Line dataKey='Initial Interview' type='natural' stroke='#10B981' strokeWidth={2} dot={false} />
                        <Line dataKey='Final Interview' type='natural' stroke='#2563EB' strokeWidth={2} dot={false} />
                        <Line dataKey='Job Offer' type='natural' stroke='#FACC15' strokeWidth={2} dot={false} />
                        <Line dataKey='Rejected' type='natural' stroke='#EF4444'  strokeWidth={2} dot={false} />
                        <Legend  verticalAlign='top' height={60} wrapperStyle={{ borderBottom: 20}} content={<CustomLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
  
  export default CustomLineChart;
  