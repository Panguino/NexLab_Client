import { SATRAD_PRODUCTS, SATRAD_PRODUCT_COMPOSITE_RADAR_ID } from './products'

// Filtered product set for MESO sectors (exclude composite radar product)
const SATRAD_PRODUCTS_NO_RADAR = Object.fromEntries(Object.entries(SATRAD_PRODUCTS).filter(([key]) => key !== SATRAD_PRODUCT_COMPOSITE_RADAR_ID))

const SATRAD_SECTOR_MESO_MESO1 = 'meso1'
const SATRAD_SECTOR_MESO_MESO2 = 'meso2'
const SATRAD_SECTOR_MESO_MESO3 = 'meso3'
const SATRAD_SECTOR_MESO_MESO4 = 'meso4'

export const SATRAD_SECTORS_MESO_GOES_EAST = {
	[SATRAD_SECTOR_MESO_MESO1]: {
		name: 'GOES-East Meso 1',
		type: 'Point',
		coordinates: [0, 0],
		products: SATRAD_PRODUCTS_NO_RADAR,
	},
	[SATRAD_SECTOR_MESO_MESO2]: {
		name: 'GOES-East Meso 2',
		type: 'Point',
		coordinates: [0, 0],
		products: SATRAD_PRODUCTS_NO_RADAR,
	},
}
export const SATRAD_SECTORS_MESO_GOES_WEST = {
	[SATRAD_SECTOR_MESO_MESO3]: {
		name: 'GOES-West Meso 1',
		type: 'Point',
		coordinates: [0, 0],
		products: SATRAD_PRODUCTS_NO_RADAR,
	},
	[SATRAD_SECTOR_MESO_MESO4]: {
		name: 'GOES-West Meso 2',
		type: 'Point',
		coordinates: [0, 0],
		products: SATRAD_PRODUCTS_NO_RADAR,
	},
}
