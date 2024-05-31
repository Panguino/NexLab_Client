import { Feature } from '@turf/turf'
import { create } from 'zustand'

// Define the state shape
interface HazardsState {
	activeHazard: string
	setActiveHazard: (activeHazard: string) => void
	hazardTotals: number[]
	setHazardTotals: (totals: number[]) => void
	tooltipContent: { alerts: null | []; feature: null | Feature }
	tooltipActive: boolean
	setTooltipActive: (active: boolean) => void
	setTooltipContent: (content: { alerts: null | []; feature: null | Feature }) => void
}

const useHazardsStore = create<HazardsState>((set) => ({
	activeHazard: '',
	setActiveHazard: (active) => set({ activeHazard: active }),
	hazardTotals: [],
	setHazardTotals: (totals) => set({ hazardTotals: totals }),
	tooltipContent: { alerts: null, feature: null },
	tooltipActive: false,
	setTooltipActive: (active) => set({ tooltipActive: active }),
	setTooltipContent: (content) => set({ tooltipContent: content })
}))

export default useHazardsStore
