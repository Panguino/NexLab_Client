import { ALASKA_SOUNDING_SITES, CANADA_SOUNDING_SITES, CONUS_SOUNDING_SITES, MEXICO_SOUNDING_SITES } from './sites'

export const SOUNDING_REGION_CONUS = 'conus'
export const SOUNDING_REGION_ALASKA = 'ak'
export const SOUNDING_REGION_CANADA = 'can'
export const SOUNDING_REGION_MEXICO = 'mex'

interface SoundingRegion {
	label: string
	rotate: [number, number]
	scale: number
	sites: object
}

export const ALL_SOUNDING_REGIONS: { [key: string]: SoundingRegion } = {
	[SOUNDING_REGION_CONUS]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: CONUS_SOUNDING_SITES,
	},
	[SOUNDING_REGION_ALASKA]: {
		label: 'Alaska',
		rotate: [153, -63],
		scale: 3,
		sites: ALASKA_SOUNDING_SITES,
	},
	[SOUNDING_REGION_CANADA]: {
		label: 'Canada',
		rotate: [100.88, -60.02],
		scale: 2,
		sites: CANADA_SOUNDING_SITES,
	},
	[SOUNDING_REGION_MEXICO]: {
		label: 'Mexico & Caribbean',
		rotate: [87.78, -22.92],
		scale: 2,
		sites: MEXICO_SOUNDING_SITES,
	},
}
