import { ALASKA_SOUNDING_SITES, CANADA_SOUNDING_SITES, CONUS_SOUNDING_SITES, MEXICO_SOUNDING_SITES } from './sites'

const REGION_CONUS = 'conus'
const REGION_ALASKA = 'ak'
const REGION_CANADA = 'can'
const REGION_MEXICO = 'mex'

export const ALL_SOUNDING_REGIONS = {
	[REGION_CONUS]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: CONUS_SOUNDING_SITES,
	},
	[REGION_ALASKA]: {
		label: 'Alaska',
		rotate: [153, -63],
		scale: 3,
		sites: ALASKA_SOUNDING_SITES,
	},
	[REGION_CANADA]: {
		label: 'Canada',
		rotate: [-100.88, 60.02],
		scale: 2,
		sites: CANADA_SOUNDING_SITES,
	},
	[REGION_MEXICO]: {
		label: 'Mexico & Caribbean',
		rotate: [-87.78, 22.92],
		scale: 2,
		sites: MEXICO_SOUNDING_SITES,
	},
}
