import { create } from 'zustand'

// Define the state shape
interface HazardsState {
	activeHazard: string
	setActiveHazard: (activeHazard: string) => void
	hazardTotals: number[]
	setHazardTotals: (totals: number[]) => void
}

const useHazardsStore = create<HazardsState>((set) => ({
	activeHazard: '',
	setActiveHazard: (active) => set({ activeHazard: active }),
	hazardTotals: [],
	setHazardTotals: (totals) => set({ hazardTotals: totals })
}))

export default useHazardsStore
