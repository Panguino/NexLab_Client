import { calculateHazardTotals } from '@/util/hazardMapUtils'
import { ZustandStateSlice } from './useRootStore'

// Define the state shape
export interface IHazardsSlice {
	regionHazards: Record<string, any>
	activeHazards: Set<string>
	activeHazardTypes: Set<string>
	activeHazardLevels: Set<string>
	toggledHazards: Set<string>
	toggledHazardRows: Set<string>
	toggledHazardColumns: Set<string>
	hazardTotals: Record<string, any>
	tooltipContent: { alerts: any; feature: any }
	tooltipActive: boolean
	selectedCounty: Record<string, any>
	selectedAlert: number
	selectedRegion: string
	selectedView: string
	allHazards: Record<string, any>
	hazardRefreshInterval: number
	hazardRefreshActive: boolean
	isHazardActive: (hazardType: string, hazardLevel: string) => boolean
	setRegionHazards: (hazards: Record<string, any>) => void
	addActiveHazard: (hazard: string) => void
	removeActiveHazard: (hazard: string) => void
	clearActiveHazards: () => void
	addActiveHazardType: (type: string) => void
	removeActiveHazardType: (type: string) => void
	clearActiveHazardTypes: () => void
	addActiveHazardLevel: (level: string) => void
	removeActiveHazardLevel: (level: string) => void
	clearActiveHazardLevels: () => void
	isHazardToggled: (hazardType: string, hazardLevel: string) => boolean
	toggleHazard: (hazard: string) => void
	clearToggledHazards: () => void
	toggleHazardRow: (hazardRowId: string) => void
	clearToggledHazardRows: () => void
	toggleHazardColumn: (hazardColumnId: string) => void
	clearToggledHazardColumns: () => void
	setTooltipActive: (active: boolean) => void
	setTooltipContent: (content: { alerts: any; feature: any }) => void
	setSelectedCounty: (county: Record<string, any>) => void
	setSelectedAlert: (index: number) => void
	setSelectedRegion: (region: string) => void
	setSelectedView: (view: string) => void
	setAllHazards: (hazards: Record<string, any>) => void
	setHazardRefreshInterval: (interval: number) => void
	setHazardRefreshActive: (active: boolean) => void
}

// Update the createHazardsSlice function to use StateCreator
export const createHazardsSlice: ZustandStateSlice<IHazardsSlice> = (set, get) => ({
	isHazardActive: (hazardType, hazardLevel) => {
		const hazardId = `${hazardType} ${hazardLevel}`
		return (
			get().toggledHazards.has(hazardId) ||
			get().toggledHazardRows.has(hazardType) ||
			get().toggledHazardColumns.has(hazardLevel) ||
			get().activeHazards.has(hazardId) ||
			get().activeHazardTypes.has(hazardType) ||
			get().activeHazardLevels.has(hazardLevel) ||
			(get().activeHazards.size === 0 &&
				get().activeHazardTypes.size === 0 &&
				get().activeHazardLevels.size === 0 &&
				get().toggledHazards.size === 0 &&
				get().toggledHazardRows.size === 0 &&
				get().toggledHazardColumns.size === 0)
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
	isHazardToggled: (hazardType, hazardLevel) => {
		const hazardId = `${hazardType} ${hazardLevel}`
		return get().toggledHazards.has(hazardId) || get().toggledHazardRows.has(hazardType) || get().toggledHazardColumns.has(hazardLevel)
	},
	toggledHazards: new Set(),
	toggleHazard: (hazard) =>
		set((state) => {
			if (state.toggledHazards.has(hazard)) {
				const updatedToggledHazards = new Set(state.toggledHazards)
				updatedToggledHazards.delete(hazard)
				return { toggledHazards: updatedToggledHazards }
			} else {
				return { toggledHazards: new Set(state.toggledHazards).add(hazard) }
			}
		}),
	clearToggledHazards: () => set({ toggledHazards: new Set() }),
	toggledHazardRows: new Set(),
	toggleHazardRow: (hazardRowId) =>
		set((state) => {
			if (state.toggledHazardRows.has(hazardRowId)) {
				const updatedToggledHazardRows = new Set(state.toggledHazardRows)
				updatedToggledHazardRows.delete(hazardRowId)
				return { toggledHazardRows: updatedToggledHazardRows }
			} else {
				return { toggledHazardRows: new Set(state.toggledHazardRows).add(hazardRowId) }
			}
		}),
	clearToggledHazardRows: () => set({ toggledHazardRows: new Set() }),
	toggledHazardColumns: new Set(),
	toggleHazardColumn: (hazardColumnId) =>
		set((state) => {
			if (state.toggledHazardColumns.has(hazardColumnId)) {
				const updatedToggledHazardColumns = new Set(state.toggledHazardColumns)
				updatedToggledHazardColumns.delete(hazardColumnId)
				return { toggledHazardColumns: updatedToggledHazardColumns }
			} else {
				return { toggledHazardColumns: new Set(state.toggledHazardColumns).add(hazardColumnId) }
			}
		}),
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
	setSelectedRegion: (region) => set({ selectedRegion: region }),
	selectedView: 'map',
	setSelectedView: (view) => set({ selectedView: view }),
	allHazards: {},
	setAllHazards: (hazards) => set({ allHazards: hazards }),
	hazardRefreshInterval: 5,
	setHazardRefreshInterval: (interval) => set({ hazardRefreshInterval: interval }),
	hazardRefreshActive: true,
	setHazardRefreshActive: (active) => set({ hazardRefreshActive: active }),
})
