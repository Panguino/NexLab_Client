import { calculateHazardTotals } from '@/util/hazardMapUtils'

export const createHazardsSlice = (set, get) => ({
	isHazardActive: (hazardType, hazardLevel) => {
		const hazardId = `${hazardType} ${hazardLevel}`
		return (
			get().activeHazards.has(hazardId) ||
			get().activeHazardTypes.has(hazardType) ||
			get().activeHazardLevels.has(hazardLevel) ||
			(get().activeHazards.size === 0 && get().activeHazardTypes.size === 0 && get().activeHazardLevels.size === 0)
		)
	},
	//
	regionHazards: {},
	setRegionHazards: (hazards) => set({ regionHazards: hazards, hazardTotals: calculateHazardTotals(hazards) }),
	//
	activeHazards: new Set(),
	addActiveHazard: (hazard) => set((state) => ({ activeHazards: new Set(state.activeHazards).add(hazard) })),
	removeActiveHazard: (hazard) =>
		set((state) => {
			const updatedActiveHazards = new Set(state.activeHazards)
			updatedActiveHazards.delete(hazard)
			return { activeHazards: updatedActiveHazards }
		}),
	clearActiveHazards: () => set({ activeHazards: new Set() }),
	activeHazardTypes: new Set(),
	addActiveHazardType: (type) => set((state) => ({ activeHazardTypes: new Set(state.activeHazardTypes).add(type) })),
	removeActiveHazardType: (type) =>
		set((state) => {
			const updatedActiveHazardTypes = new Set(state.activeHazardTypes)
			updatedActiveHazardTypes.delete(type)
			return { activeHazardTypes: updatedActiveHazardTypes }
		}),
	clearActiveHazardTypes: () => set({ activeHazardTypes: new Set() }),
	activeHazardLevels: new Set(),
	addActiveHazardLevel: (level) => set((state) => ({ activeHazardLevels: new Set(state.activeHazardLevels).add(level) })),
	removeActiveHazardLevel: (level) =>
		set((state) => {
			const updatedActiveHazardLevels = new Set(state.activeHazardLevels)
			updatedActiveHazardLevels.delete(level)
			return { activeHazardLevels: updatedActiveHazardLevels }
		}),
	clearActiveHazardLevels: () => set({ activeHazardLevels: new Set() }),
	//
	toggledHazards: new Set(),
	toggleHazard: (hazard) =>
		set((state) => ({
			toggledHazards: state.toggledHazards.has(hazard)
				? new Set(state.toggledHazards).delete(hazard)
				: new Set(state.toggledHazards).add(hazard)
		})),
	addToggledHazard: (hazard) => set((state) => ({ toggledHazards: new Set(state.toggledHazards).add(hazard) })),
	removeToggledHazard: (hazard) => set((state) => ({ toggledHazards: new Set(state.toggledHazards).delete(hazard) })),
	clearToggledHazards: () => set({ toggledHazards: new Set() }),
	toggledHazardRows: new Set(),
	toggleHazardRowOn: (hazard) => set((state) => ({ toggledHazardRows: new Set(state.toggledHazardRows).add(hazard) })),
	toggleHazardRowOff: (hazard) => set((state) => ({ toggledHazardRows: new Set(state.toggledHazardRows).delete(hazard) })),
	clearToggledHazardRows: () => set({ toggledHazardRows: new Set() }),
	toggledHazardColumns: new Set(),
	toggleHazardColumnOn: (hazard) => set((state) => ({ toggledHazardColumns: new Set(state.toggledHazardColumns).add(hazard) })),
	toggleHazardColumnOff: (hazard) => set((state) => ({ toggledHazardColumns: new Set(state.toggledHazardColumns).delete(hazard) })),
	clearToggledHazardColumns: () => set({ toggledHazardColumns: new Set() }),
	//
	hazardTotals: {},
	tooltipContent: { alerts: null, feature: null },
	tooltipActive: false,
	setTooltipActive: (active) => set({ tooltipActive: active }),
	setTooltipContent: (content) => set({ tooltipContent: content }),
	selectedCounty: {},
	setSelectedCounty: (county) => set({ selectedCounty: county, selectedAlert: 0 }),
	selectedAlert: 0,
	setSelectedAlert: (index) => set({ selectedAlert: index }),
	selectedRegion: 'conus',
	setSelectedRegion: (region) => set({ selectedRegion: region })
})

/*
export const createHazardsSlice = (set, get) => ({
	// Ready to refactor the sets
	activeHazards: new Set(),
	addActiveHazard: (hazard) => set((state) => ({ activeHazards: new Set(state.activeHazards).add(hazard) })),
	removeActiveHazard: (hazard) => set((state) => ({ activeHazards: new Set(state.activeHazards).delete(hazard) })),
	clearActiveHazards: () => set({ activeHazards: new Set() }),
	toggledHazards: [],
	toggleHazard: (hazard) =>
		set((state) => {
			if (state.toggledHazards.includes(hazard)) {
				return { toggledHazards: [...state.toggledHazards].filter((h) => h !== hazard) }
			}
			return { toggledHazards: [...state.toggledHazards, hazard] }
		}),
	clearToggledHazards: () => set({ toggledHazards: [] }),
	hazardTotals: [],
	setHazardTotals: (totals) => set({ hazardTotals: totals }),
	tooltipContent: { alerts: null, feature: null },
	tooltipActive: false,
	setTooltipActive: (active) => set({ tooltipActive: active }),
	setTooltipContent: (content) => set({ tooltipContent: content }),
	selectedCounty: {},
	setSelectedCounty: (county) => set({ selectedCounty: county, selectedAlert: 0 }),
	selectedAlert: 0,
	setSelectedAlert: (index) => set({ selectedAlert: index }),
	selectedRegion: 'conus',
	setSelectedRegion: (region) => set({ selectedRegion: region })
})*/
