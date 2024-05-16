import { Feature } from '@turf/turf'
import { create } from 'zustand'

// Define the state shape
interface HazardsState {
	fireActive: boolean
	winterActive: boolean
	marineActive: boolean
	tropicalActive: boolean
	hydroActive: boolean
	nonPrecipActive: boolean
	nonMetActive: boolean
	convectiveActive: boolean
	specialActive: boolean
	setFireActive: (active: boolean) => void
	toggleFireActive: () => void
	setWinterActive: (active: boolean) => void
	toggleWinterActive: () => void
	setMarineActive: (active: boolean) => void
	toggleMarineActive: () => void
	setTropicalActive: (active: boolean) => void
	toggleTropicalActive: () => void
	setHydroActive: (active: boolean) => void
	toggleHydroActive: () => void
	setNonPrecipActive: (active: boolean) => void
	toggleNonPrecipActive: () => void
	setNonMetActive: (active: boolean) => void
	toggleNonMetActive: () => void
	setConvectiveActive: (active: boolean) => void
	toggleConvectiveActive: () => void
	setSpecialActive: (active: boolean) => void
	toggleSpecialActive: () => void
	setAll: (active: boolean) => void
	tooltipContent: { alerts: null | []; feature: null | Feature }
	tooltipActive: boolean
	setTooltipActive: (active: boolean) => void
	setTooltipContent: (content: { alerts: null | []; feature: null | Feature }) => void
}

const useHazardsStore = create<HazardsState>((set) => ({
	fireActive: true,
	setFireActive: (active) => set({ fireActive: active }),
	toggleFireActive: () => set((state) => ({ fireActive: !state.fireActive })),
	winterActive: true,
	setWinterActive: (active) => set({ winterActive: active }),
	toggleWinterActive: () => set((state) => ({ winterActive: !state.winterActive })),
	marineActive: true,
	setMarineActive: (active) => set({ marineActive: active }),
	toggleMarineActive: () => set((state) => ({ marineActive: !state.marineActive })),
	tropicalActive: true,
	setTropicalActive: (active) => set({ tropicalActive: active }),
	toggleTropicalActive: () => set((state) => ({ tropicalActive: !state.tropicalActive })),
	hydroActive: true,
	setHydroActive: (active) => set({ hydroActive: active }),
	toggleHydroActive: () => set((state) => ({ hydroActive: !state.hydroActive })),
	nonPrecipActive: true,
	setNonPrecipActive: (active) => set({ nonPrecipActive: active }),
	toggleNonPrecipActive: () => set((state) => ({ nonPrecipActive: !state.nonPrecipActive })),
	nonMetActive: true,
	setNonMetActive: (active) => set({ nonMetActive: active }),
	toggleNonMetActive: () => set((state) => ({ nonMetActive: !state.nonMetActive })),
	convectiveActive: true,
	setConvectiveActive: (active) => set({ convectiveActive: active }),
	toggleConvectiveActive: () => set((state) => ({ convectiveActive: !state.convectiveActive })),
	specialActive: true,
	setSpecialActive: (active) => set({ specialActive: active }),
	toggleSpecialActive: () => set((state) => ({ specialActive: !state.specialActive })),
	setAll: (active) =>
		set({
			fireActive: active,
			winterActive: active,
			marineActive: active,
			tropicalActive: active,
			hydroActive: active,
			nonPrecipActive: active,
			nonMetActive: active,
			convectiveActive: active,
			specialActive: active
		}),
	tooltipContent: { alerts: null, feature: null },
	tooltipActive: false,
	setTooltipActive: (active) => set({ tooltipActive: active }),
	setTooltipContent: (content) => set({ tooltipContent: content })
}))

export default useHazardsStore
