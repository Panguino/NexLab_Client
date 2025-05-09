import { ALL_SATRAD_DYNAMIC_OVERLAYS, ALL_SATRAD_STATIC_OVERLAYS } from './overlays'
import { SATRAD_PRODUCTS } from './products'

// Continental Sectors
const SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_ID = 'conus'
const SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_SOUTH_ID = 'southconus'
const SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_ID = 'w_conus'
const SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_SOUTH_ID = 'w_southconus'
const SATRAD_SECTOR_CONTINENTAL_ALASKA_ID = 'Alaska'
const SATRAD_SECTOR_CONTINENTAL_ARGENTINA_ID = 'argentina'
const SATRAD_SECTOR_CONTINENTAL_BRAZIL_ID = 'brazil'
const SATRAD_SECTOR_CONTINENTAL_ENSO_ID = 'enso'

const continental_latitude_modifier = 3
const continental_longitude_modifier = 3

export const SATRAD_SECTORS_CONTINENTAL_GOES_EAST = {
	[SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_ID]: {
		name: 'CONUS',
		type: 'Geobox',
		coordinates: [
			[-92.0 + continental_longitude_modifier, 38.3 - continental_latitude_modifier],
			[-92.0 - continental_longitude_modifier, 38.3 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_SOUTH_ID]: {
		name: 'CONUS South',
		type: 'Geobox',
		coordinates: [
			[-91.9 + continental_longitude_modifier, 30.0 - continental_latitude_modifier],
			[-91.9 - continental_longitude_modifier, 30.0 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_ARGENTINA_ID]: {
		name: 'Argentina',
		type: 'Geobox',
		coordinates: [
			[-66.0 + continental_longitude_modifier, -39.0 - continental_latitude_modifier],
			[-66.0 - continental_longitude_modifier, -39.0 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_BRAZIL_ID]: {
		name: 'Brazil',
		type: 'Geobox',
		coordinates: [
			[-57.0 + continental_longitude_modifier, -14.6 - continental_latitude_modifier],
			[-57.0 - continental_longitude_modifier, -14.6 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_ENSO_ID]: {
		name: 'ENSO',
		type: 'Geobox',
		coordinates: [
			[-110.0 + continental_longitude_modifier, 0.0 - continental_latitude_modifier],
			[-110.0 - continental_longitude_modifier, 0.0 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
export const SATRAD_SECTORS_CONTINENTAL_GOES_WEST = {
	[SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_ID]: {
		name: 'CONUS West',
		type: 'Geobox',
		coordinates: [
			[-136.0 + continental_longitude_modifier, 38.8 - continental_latitude_modifier],
			[-136.0 - continental_longitude_modifier, 38.8 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_SOUTH_ID]: {
		name: 'CONUS West South',
		type: 'Geobox',
		coordinates: [
			[-135.9 + continental_longitude_modifier, 29.8 - continental_latitude_modifier],
			[-135.9 - continental_longitude_modifier, 29.8 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_ALASKA_ID]: {
		name: 'Alaska',
		type: 'Geobox',
		coordinates: [
			[-156.0 + continental_longitude_modifier, 62.0 - continental_latitude_modifier],
			[-156.0 - continental_longitude_modifier, 62.0 + continental_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
