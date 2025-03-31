import { LineChartData } from "@/types/chart-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLineChartStore = create(
    persist<{
        lineChartData: LineChartData[],
        setLineChartData: (data: LineChartData[]) => void
        clearLineChartData: () => void
    }>(
        (set) => ({
            lineChartData: [],
            setLineChartData: (data) => set({ lineChartData: data }),
            clearLineChartData: () => localStorage.removeItem('lineChartData')
        }),
        {
            name: 'lineChartData'
        }
    )
)