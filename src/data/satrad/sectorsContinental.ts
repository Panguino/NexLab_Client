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

export const DEFAULT_SATRAD_SECTOR = SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_ID

export const SATRAD_SECTORS_CONTINENTAL_GOES_EAST = {
	[SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_ID]: {
		name: 'CONUS',
		type: 'Geobox',
		coordinates: [
			[-135.0, 20.92],
			[-53.69, 50.42],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_SOUTH_ID]: {
		name: 'CONUS South',
		type: 'Geobox',
		coordinates: [
			[-130.0, 12.32],
			[-55.6, 41.99],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_CONTINENTAL_ARGENTINA_ID]: {
		name: 'Argentina',
		type: 'Point',
		coordinates: [[-66.0, -39.0]],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_CONTINENTAL_BRAZIL_ID]: {
		name: 'Brazil',
		type: 'Point',
		coordinates: [[-57.0, -14.6]],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_CONTINENTAL_ENSO_ID]: {
		name: 'ENSO',
		type: 'Geobox',
		coordinates: [
			[-160.0, -20.0],
			[-70.0, 20.0],
		],
		products: SATRAD_PRODUCTS,
	},
}
export const SATRAD_SECTORS_CONTINENTAL_GOES_WEST = {
	[SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_ID]: {
		name: 'CONUS West',
		type: 'Geobox',
		coordinates: [
			[-165.16, 20.36],
			[-102.54, 52.31],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_SOUTH_ID]: {
		name: 'CONUS West South',
		type: 'Geobox',
		coordinates: [
			[-164.09, 10.62],
			[-103.7, 44.66],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_CONTINENTAL_ALASKA_ID]: {
		name: 'Alaska',
		type: 'Geobox',
		coordinates: [
			[-188.0, 48.0],
			[-110.0, 72.0],
		],
		products: SATRAD_PRODUCTS,
	},
}
