import { Feature } from '@turf/turf'
import { create } from 'zustand'

// Define the state shape
interface HazardsTooltipState {
	tooltipContent: { alerts: null | []; feature: null | Feature }
	tooltipActive: boolean
	setTooltipActive: (active: boolean) => void
	setTooltipContent: (content: { alerts: null | []; feature: null | Feature }) => void
}

const useHazardsTooltipStore = create<HazardsTooltipState>((set) => ({
	tooltipContent: { alerts: null, feature: null },
	tooltipActive: false,
	setTooltipActive: (active) => set({ tooltipActive: active }),
	setTooltipContent: (content) => set({ tooltipContent: content })
}))

export default useHazardsTooltipStore
