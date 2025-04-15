import { ALL_UPPERAIR_SECTORS } from './sectors'

export const UPPERAIR_REGION_CONUS = 'northAmerica'
export const UPPERAIR_REGION_DEFAULT = UPPERAIR_REGION_CONUS

interface UpperAirRegion {
	label: string
	rotate: [number, number]
	scale: number
	sites: string[]
}

export const ALL_UPPERAIR_REGIONS: { [key: string]: UpperAirRegion } = {
	[UPPERAIR_REGION_CONUS]: {
		label: 'North America',
		rotate: [95, -45],
		scale: 1.3,
		sites: Object.keys(ALL_UPPERAIR_SECTORS).map((key) => key),
	},
}
