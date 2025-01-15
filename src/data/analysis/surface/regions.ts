import { LARGE_SECTORS, STATE_SECTORS } from './sectors'

export const REGION_SCALE_LARGE = 'regional'
export const REGION_SCALE_STATE = 'state'

export const ALL_REGIONS = {
	[REGION_SCALE_LARGE]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: LARGE_SECTORS,
	},
	[REGION_SCALE_STATE]: {
		label: 'Continental U.S.',
		rotate: [98, -40],
		scale: 2,
		sites: STATE_SECTORS,
	},
}
