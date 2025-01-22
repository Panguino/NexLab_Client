import { ALASKA_SITES, CANADA_SITES, CONUS_SITES, MEXICO_SITES } from './sites'

export const REGION_CONUS = 'conus'
export const REGION_ALASKA = 'ak'
export const REGION_CANADA = 'can'
export const REGION_MEXICO = 'mex'

export const ALL_REGIONS = {
	[REGION_CONUS]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: CONUS_SITES,
	},
	[REGION_ALASKA]: {
		label: 'Alaska',
		rotate: [153, -63],
		scale: 3,
		sites: ALASKA_SITES,
	},
	[REGION_CANADA]: {
		label: 'Canada',
		rotate: [-100.88, 60.02],
		scale: 2,
		sites: CANADA_SITES,
	},
	[REGION_MEXICO]: {
		label: 'Mexico & Caribbean',
		rotate: [-87.78, 22.92],
		scale: 2,
		sites: MEXICO_SITES,
	},
}
