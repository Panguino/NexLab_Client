import { ALL_UPPERAIR_SECTORS } from './sectors'

export const UPPERAIR_REGION_CONUS = 'conus'

export const ALL_UPPERAIR_REGIONS = {
	[UPPERAIR_REGION_CONUS]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: ALL_UPPERAIR_SECTORS,
	},
}
