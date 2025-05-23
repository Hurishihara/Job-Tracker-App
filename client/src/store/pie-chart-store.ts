import { ChartDataType } from '@/types/chart-types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePieChartStore = create(
    persist<{
        pieChartData: ChartDataType[],
        setPieChartData: (data: ChartDataType[]) => void
        clearPieChartData: () => void
    }>(
        (set) => ({
            pieChartData: [],
            setPieChartData: (data) => set({ pieChartData: data }),
            clearPieChartData: () => localStorage.removeItem('pieChartData')
        }),
        {
            name: 'pieChartData',
        }
    )
)