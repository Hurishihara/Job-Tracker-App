export type ChartDataType = {
    status: string,
    applications: number,
    fill: string
}

export type LineChartData = {
    month: string,
    Pending: number,
    'Initial Interview': number,
    'Final Interview': number,
    'Job Offer': number,
    Rejected: number
}

export type BarChartData = {
    month: string,
    totalApplications: number
}

export type AreaChartData = {
    month: string,
    Days: number
}
