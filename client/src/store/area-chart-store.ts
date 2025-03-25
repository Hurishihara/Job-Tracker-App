import { AreaChartData } from '@/types/chart-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAreaChartStore = create(
    persist<{
        areaChartData: AreaChartData[],
        setAreaChartData: (data: AreaChartData[]) => void
    }>(
        (set) => ({
            areaChartData: [],
            setAreaChartData: (data) => set({ areaChartData: data })
        }),
        {
            name: 'areaChartData'
        }
    )
)
