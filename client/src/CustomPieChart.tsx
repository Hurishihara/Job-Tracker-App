import { useMemo } from "react"
import { Card, CardHeader } from "./components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./components/ui/chart"
import { Pie, PieChart, Label } from "recharts"

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

const CustomPieChart = () => {
    const totalApplications = useMemo(() => {
        return chartData2.reduce((acc, curr) => acc + curr.applications, 0)
    }, [])

    return (
        <Card className='rounded-2xl shadow-xl' >
            <CardHeader className='text-xl font-semibold font-secondary'>
                Application by Status
            </CardHeader>
            <div className='grid grid-cols-12 items-center justify-items-center gap-0 w-full p-[1.5rem]'>
                <div className='col-span-6'>
                    <ChartContainer config={chartConfig2} className="min-h-[200px] w-full">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Pie
                                data={chartData2}
                                dataKey="applications" // ✅ Fixed: Corrected key
                                nameKey="status"
                                innerRadius={70}
                                outerRadius={100}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-[2.5rem] font-semibold font-primary"
                                                    >
                                                        {totalApplications.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground font-semibold font-primary"
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
                <div className='col-span-6'>
                    <ul>
                        {chartData2.map(({ status, applications, fill }) => (
                            <li key={status} className='flex flex-row items-center gap-1 p-[0.5rem]'>
                                <div className='w-2 h-2 rounded-full mr-3' style={{ backgroundColor: fill }} />
                                <span className='text-md font-semibold font-primary'>{status}</span>
                                <span className='mx-2 border-b-2 border-dotted border-gray-300 w-20' />
                                <span className='text-md font-medium font-semibold font-primary'> {applications} </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    )
}

export default CustomPieChart
