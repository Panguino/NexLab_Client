import { ALL_SECTORS } from './sectors'

const REGION_CONUS = 'conus'

export const ALL_REGIONS = {
	[REGION_CONUS]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: ALL_SECTORS,
	},
}
