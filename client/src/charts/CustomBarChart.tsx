import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect } from "react"
import { api } from "@/util/axios-config"
import { useBarChartStore } from "@/store/bar-chart-store"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  totalApplications: {
    label: "Total Applications",
    color: '#3B82F6',
  },
} satisfies ChartConfig

const CustomBarChart = () => {

  const { barChartData, setBarChartData } = useBarChartStore()
  const getCurrentHalfYearRange = () => {
    const currentMonth = new Date().getMonth() + 1;
    return currentMonth <= 6 ? { startMonth: 1, endMonth: 6 } : { startMonth: 7, endMonth: 12 };
  }

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { startMonth, endMonth } = getCurrentHalfYearRange();
        const res = await api.get('/chart-data/get-bar-chart-data', {
          params: { startMonth, endMonth }
        })
        setBarChartData(res.data)
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchChartData()
  }, [])

  return (
    <Card className='rounded-2xl shadow-xl'>
      <CardHeader className='text-2xl font-primary'>
        <CardTitle>Monthly Total Applications</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={barChartData}
            margin={{
              top: 24,
              left: 12,
              right: 12,
              bottom: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className='font-secondary font-semibold'
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className='font-secondary font-semibold' />}
            />
            <Bar dataKey="totalApplications" fill="#a4aab6" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="font-secondary font-semibold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CustomBarChart
