import { ALL_UPPERAIR_LEVEL_PRODUCTS } from './levels'

export const UPPERAIR_SECTOR_CONUS = 'US'
export const UPPERAIR_SECTOR_CANADA = 'Canada'
export const UPPERAIR_SECTOR_DEFAULT = UPPERAIR_SECTOR_CONUS

export const ALL_UPPERAIR_SECTORS = {
	[UPPERAIR_SECTOR_CONUS]: {
		name: 'Continental U.S.',
		type: 'Geobox',
		coordinates: [
			[-140, 10],
			[-50, 60],
		],
		levels: ALL_UPPERAIR_LEVEL_PRODUCTS,
	},
	[UPPERAIR_SECTOR_CANADA]: {
		name: 'Canada',
		type: 'Geobox',
		coordinates: [
			[-145.08, 41.71],
			[-13.54, 70.87],
		],
		levels: ALL_UPPERAIR_LEVEL_PRODUCTS,
	},
}
