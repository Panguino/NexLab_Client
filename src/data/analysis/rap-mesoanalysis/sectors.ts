import { ALL_RAPMESO_PRODUCTS } from './products'

export const RAPMESO_SECTOR_CONUS = 'CONUS'

export const ALL_RAPMESO_SECTORS = {
	[RAPMESO_SECTOR_CONUS]: {
		name: 'Continental U.S.',
		type: 'Geobox',
		coordinates: [
			[-140, 10],
			[-50, 60],
		],
		products: ALL_RAPMESO_PRODUCTS,
	},
}
