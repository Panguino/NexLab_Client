import { ALL_SITES } from './sites'

export const NEXRAD_REGION_CONUS_ID = 'CONUS'
export const NEXRAD_REGION_ALASKA_ID = 'ALASKA'
export const NEXRAD_REGION_HAWAII_ID = 'HAWAII'
export const NEXRAD_REGION_PUERTO_ID = 'PUERTO'
export const NEXRAD_REGION_GUAM_ID = 'GUAM'

export const DEFAULT_NEXRAD_REGION = NEXRAD_REGION_CONUS_ID

interface NexradRegion {
	label: string
	rotate: [number, number]
	scale: number
	sites: string[]
}

export const NEXRAD_REGIONS: { [key: string]: NexradRegion } = {
	[NEXRAD_REGION_CONUS_ID]: {
		label: 'Continental US',
		rotate: [98, -40],
		scale: 2,
		sites: ALL_SITES,
	},
	[NEXRAD_REGION_ALASKA_ID]: {
		label: 'Alaska',
		rotate: [153, -63],
		scale: 3,
		sites: ALL_SITES,
	},
	[NEXRAD_REGION_HAWAII_ID]: {
		label: 'Hawaii',
		rotate: [157, -21],
		scale: 5,
		sites: ALL_SITES,
	},
	[NEXRAD_REGION_PUERTO_ID]: {
		label: 'Puerto Rico',
		rotate: [66, -18],
		scale: 5,
		sites: ALL_SITES,
	},
	[NEXRAD_REGION_GUAM_ID]: {
		label: 'Guam',
		rotate: [-145, -13.5],
		scale: 25,
		sites: ALL_SITES,
	},
}
