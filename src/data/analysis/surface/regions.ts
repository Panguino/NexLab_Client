import { LARGE_SURFACE_SECTORS, STATE_SURFACE_SECTORS } from './sectors'

export const REGION_SCALE_LARGE = 'regional'
export const REGION_SCALE_STATE = 'states'

interface SurfaceMapsRegion {
	label: string
	rotate: [number, number]
	scale: number
	sites: string[]
}

export const ALL_SURFACE_REGIONS: { [key: string]: SurfaceMapsRegion } = {
	[REGION_SCALE_LARGE]: {
		label: 'Regional Sectors',
		rotate: [98, -40],
		scale: 2,
		sites: Object.keys(LARGE_SURFACE_SECTORS).map((key) => key),
	},
	[REGION_SCALE_STATE]: {
		label: 'State & Local Sectors',
		rotate: [98, -40],
		scale: 2,
		sites: Object.keys(STATE_SURFACE_SECTORS).map((key) => key),
	},
}
