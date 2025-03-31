import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BarChartData } from '@/types/chart-types';


export const useBarChartStore = create(
    persist<{
        barChartData: BarChartData[],
        setBarChartData: (data: BarChartData[]) => void
        clearBarChartData: () => void
    }>(
        (set) => ({
            barChartData: [],
            setBarChartData: (data) => set({ barChartData: data }),
            clearBarChartData: () => localStorage.removeItem('barChartData')
        }),
        {
            name: 'barChartData'
        }
    )
)