import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useAreaChartStore } from '@/store/area-chart-store'
import { useEffect } from 'react'
import { api } from '@/util/axios-config'
const chartData = [
  { month: 'January', Days: 0 },
  { month: 'February', Days: 0 },
  { month: 'March', Days: 0 },
  { month: 'April', Days: 0 },
  { month: 'May', Days: 0 },
  { month: 'June', Days: 0 },
]

const chartConfig = {
  Days: {
    label: 'Days',
    color: '#1f9d55',
  },
} satisfies ChartConfig

const CustomAreaChart = () => {

  const { areaChartData, setAreaChartData } = useAreaChartStore()
  const getCurrentHalfYearRange = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    return currentMonth <= 6 ? { startMonth: 1, endMonth: 6, rangeText: `January - June ${currentYear}` } : { startMonth: 7, endMonth: 12, rangeText: `July - December ${currentYear}` };
  }

  const { startMonth, endMonth, rangeText } = getCurrentHalfYearRange();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/chart-data/get-area-chart-data', {
          params: { startMonth, endMonth }
        })
        const formattedData = res.data.map((item: { month: string, Days: number }) => ({
          month: item.month,
          Days: Number(item.Days)
        }))
        console.log(formattedData)
        setAreaChartData(formattedData)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card className='rounded-2xl shadow-xl'>
      <CardHeader className='text-2xl font-primary'>
        <CardTitle> Average Application Progression Time </CardTitle>
        <CardDescription>
          { rangeText } | From initial application to final interview.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={areaChartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              className='font-secondary font-semibold'
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' className='font-secondary font-semibold' />}
            />
            <Area
              dataKey='Days'
              type='natural'
              fill='#a4aab6'
              stroke='#a4aab6'
              strokeWidth={2.5}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CustomAreaChart