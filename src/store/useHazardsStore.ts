import { create } from 'zustand'

const useHazardsStore = create((set) => ({
	fireActive: true,
	setFireActive: (active) => set({ fireActive: active }),
	toggleFireActive: () => set((state) => ({ bears: !state.fireActive })),
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
	//bears: 0,
	//increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	//removeAllBears: () => set({ bears: 0 }),
	tooltipContent: { alerts: null, feature: null },
	tooltipActive: false,
	tooltipPosition: { x: 0, y: 0 },
	setTooltipPosition: (position) => set({ tooltipPosition: position }),
	setTooltipActive: (active) => set({ tooltipActive: active }),
	setTooltipContent: (content) => set({ tooltipContent: content })
}))

export default useHazardsStore
