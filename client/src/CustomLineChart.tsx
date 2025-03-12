import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./components/ui/chart";
import CustomLegendContent from "./CustomLegendContent";


const lineChartData = [
    { month: "Jan", Pending: 10, "Initial Interview": 5, "Final Interview": 2, "Job Offer": 0, Rejected: 3 },
    { month: "Feb", Pending: 10, "Initial Interview": 2, "Final Interview": 1, "Job Offer": 7, Rejected: 3 },
    { month: "Mar", Pending: 2, "Initial Interview": 7, "Final Interview": 3, "Job Offer": 1, Rejected: 1 },
    { month: "Apr", Pending: 5, "Initial Interview": 10,"Final Interview": 5, "Job Offer": 5, Rejected: 4 },
    { month: "May", Pending: 1,"Initial Interview": 10, "Final Interview": 5, "Job Offer": 2, Rejected: 6 },
    { month: "Jun", Pending: 3, "Initial Interview": 5, "Final Interview": 8, "Job Offer": 10, Rejected: 3 },
];

const chartData2 = [
    { status: "Pending", applications: 10, fill: "#ffb403" },
    { status: "Initial Interview", applications: 15, fill: "#a4aab6" },
    { status: "Final Interview", applications: 15, fill: "#2cccfe" },
    { status: "Job Offers", applications: 20, fill: "#57f000" },
    { status: "Rejected", applications: 5, fill: "#fe3839" },
]
  
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
    return (
        <Card className='rounded-2xl shadow-xl p-[1.5rem]'>
            <CardHeader className='text-xl font-bold font-primary'>
                Application Status Growth Over Time
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
                        <Legend verticalAlign='top' height={36} content={<CustomLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
  
  export default CustomLineChart;
  