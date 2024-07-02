export const createHazardsSlice = (set, get) => ({
	activeHazard: '',
	setActiveHazard: (active) => set({ activeHazard: active }),
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
	selectedRegion: 'us',
	setSelectedRegion: (region) => set({ selectedRegion: region })
})
