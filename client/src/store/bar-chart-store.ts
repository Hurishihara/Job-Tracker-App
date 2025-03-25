import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BarChartData } from '@/types/chart-types';


export const useBarChartStore = create(
    persist<{
        barChartData: BarChartData[],
        setBarChartData: (data: BarChartData[]) => void
    }>(
        (set) => ({
            barChartData: [],
            setBarChartData: (data) => set({ barChartData: data })
        }),
        {
            name: 'barChartData'
        }
    )
)