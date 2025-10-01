import { SATRAD_PRODUCTS, SATRAD_PRODUCT_ABI_11_ID, SATRAD_PRODUCT_ABI_12_ID, SATRAD_PRODUCT_ABI_14_ID, SATRAD_PRODUCT_ABI_16_ID } from './products'

// Filtered product set for sectors needing omission of specific ABI bands
const SATRAD_PRODUCTS_NO_ABI_11_12_14_16 = Object.fromEntries(
	Object.entries(SATRAD_PRODUCTS).filter(
		([key]) => ![SATRAD_PRODUCT_ABI_11_ID, SATRAD_PRODUCT_ABI_12_ID, SATRAD_PRODUCT_ABI_14_ID, SATRAD_PRODUCT_ABI_16_ID].includes(key),
	),
)

// Regional Sectors
const SATRAD_SECTOR_REGIONAL_BERING_SEA_ID = 'BeringSea'
const SATRAD_SECTOR_REGIONAL_GULF_OF_AK_ID = 'GulfOfAK'
const SATRAD_SECTOR_REGIONAL_HAWAII_ID = 'Hawaii'
const SATRAD_SECTOR_REGIONAL_CA_REGINA_ID = 'ca_Regina'
const SATRAD_SECTOR_REGIONAL_CA_BAFFIN_ID = 'ca_baffin'
const SATRAD_SECTOR_REGIONAL_CA_BAKER_LK_ID = 'ca_bakerlk'
const SATRAD_SECTOR_REGIONAL_CA_LK_SUPER_ID = 'ca_lksuper'
const SATRAD_SECTOR_REGIONAL_CA_REG_CEN_ID = 'ca_reg_cen'
const SATRAD_SECTOR_REGIONAL_CA_REG_EAST_ID = 'ca_reg_east'
const SATRAD_SECTOR_REGIONAL_CA_REG_WEST_ID = 'ca_reg_west'
const SATRAD_SECTOR_REGIONAL_CENTRAL_ID = 'central'
const SATRAD_SECTOR_REGIONAL_EAST_COAST_ID = 'eastcoast'
const SATRAD_SECTOR_REGIONAL_EAST_PAC_ID = 'eastpac'
const SATRAD_SECTOR_REGIONAL_GULF_ID = 'gulf'
const SATRAD_SECTOR_REGIONAL_MIDWEST_ID = 'midwest'
const SATRAD_SECTOR_REGIONAL_NORTH_CENTRAL_ID = 'northcentral'
const SATRAD_SECTOR_REGIONAL_NORTHEAST_ID = 'northeast'
const SATRAD_SECTOR_REGIONAL_NORTH_MEXICO_ID = 'northmexico'
const SATRAD_SECTOR_REGIONAL_NORTH_WEST_ID = 'northwest'
const SATRAD_SECTOR_REGIONAL_NW_ATLANTIC_ID = 'nwatlantic'
const SATRAD_SECTOR_REGIONAL_PUERTO_RICO_ID = 'prregional'
const SATRAD_SECTOR_REGIONAL_SOUTH_CENTRAL_ID = 'southcentral'
const SATRAD_SECTOR_REGIONAL_SOUTHEAST_ID = 'southeast'
const SATRAD_SECTOR_REGIONAL_SOUTH_MEXICO_ID = 'southmexico'
const SATRAD_SECTOR_REGIONAL_SOUTH_WEST_ID = 'southwest'
const SATRAD_SECTOR_REGIONAL_W_NORTH_WEST_ID = 'w_northwest'
const SATRAD_SECTOR_REGIONAL_W_SOUTH_WEST_ID = 'w_southwest'
const SATRAD_SECTOR_REGIONAL_W_ATLANTIC_ID = 'watlantic'

export const SATRAD_SECTORS_REGIONAL_NAMER = {
	[SATRAD_SECTOR_REGIONAL_CA_REGINA_ID]: {
		name: 'U.S. & Canadian Great Plains',
		type: 'Geobox',
		coordinates: [
			[-121.62, 42.63],
			[-85.91, 56.69],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CA_BAFFIN_ID]: {
		name: 'Baffin',
		type: 'Geobox',
		coordinates: [
			[-90.05, 60.25],
			[-48.0, 68.0],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CA_BAKER_LK_ID]: {
		name: 'Baker Lake',
		type: 'Geobox',
		coordinates: [
			[-116.0, 59.0],
			[-75.0, 70.0],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CA_LK_SUPER_ID]: {
		name: 'Lake Superior',
		type: 'Geobox',
		coordinates: [
			[-108.0, 39.8],
			[-70.55, 52.8],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_CEN_ID]: {
		name: 'Central Canada',
		type: 'Geobox',
		coordinates: [
			[-112.0, 47.62],
			[-74.3, 59.85],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_EAST_ID]: {
		name: 'Eastern Canada',
		type: 'Geobox',
		coordinates: [
			[-87.92, 45.52],
			[-49.11, 55.87],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_WEST_ID]: {
		name: 'Western Canada',
		type: 'Geobox',
		coordinates: [
			[-135.67, 46.09],
			[-100.45, 60.65],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_CENTRAL_ID]: {
		name: 'Central US',
		type: 'Geobox',
		coordinates: [
			[-114.74, 30.1],
			[-80.07, 45.28],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_EAST_COAST_ID]: {
		name: 'East Coast',
		type: 'Geobox',
		coordinates: [
			[-93.13, 29.7],
			[-56.98, 41.92],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_EAST_PAC_ID]: {
		name: 'East Pacific',
		type: 'Geobox',
		coordinates: [
			[-140.68, 16.65],
			[-110.37, 33.33],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_GULF_ID]: {
		name: 'Gulf Coast',
		type: 'Geobox',
		coordinates: [
			[-102.26, 16.31],
			[-69.41, 30.8],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_MIDWEST_ID]: {
		name: 'Midwest',
		type: 'Geobox',
		coordinates: [
			[-108.39, 32.15],
			[-72.75, 46.23],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_CENTRAL_ID]: {
		name: 'North Central US',
		type: 'Geobox',
		coordinates: [
			[-114.95, 34.65],
			[-79.26, 49.27],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_NORTHEAST_ID]: {
		name: 'Northeast US',
		type: 'Geobox',
		coordinates: [
			[-98.32, 35.6],
			[-61.12, 47.92],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_MEXICO_ID]: {
		name: 'North Mexico',
		type: 'Geobox',
		coordinates: [
			[-119.08, 16.85],
			[-87.41, 33.81],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_WEST_ID]: {
		name: 'Northwest US',
		type: 'Geobox',
		coordinates: [
			[-126.36, 34.73],
			[-91.72, 50.76],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_NW_ATLANTIC_ID]: {
		name: 'Northwest Atlantic',
		type: 'Geobox',
		coordinates: [
			[-87.0, 31.0],
			[-29.0, 55.0],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_PUERTO_RICO_ID]: {
		name: 'Puerto Rico',
		type: 'Geobox',
		coordinates: [
			[-76.25, 9.5],
			[-59.5, 25.0],
		],
		products: SATRAD_PRODUCTS_NO_ABI_11_12_14_16,
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_CENTRAL_ID]: {
		name: 'South Central US',
		type: 'Geobox',
		coordinates: [
			[-114.5, 24.89],
			[-80.91, 40.59],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_SOUTHEAST_ID]: {
		name: 'Southeast US',
		type: 'Geobox',
		coordinates: [
			[-101.03, 24.33],
			[-66.54, 38.16],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_MEXICO_ID]: {
		name: 'South Mexico',
		type: 'Geobox',
		coordinates: [
			[-115.91, 12.94],
			[-84.67, 29.62],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_WEST_ID]: {
		name: 'Southwest US',
		type: 'Geobox',
		coordinates: [
			[-123.53, 27.38],
			[-90.23, 44.04],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_W_NORTH_WEST_ID]: {
		name: 'Northwest Pacific Coast',
		type: 'Geobox',
		coordinates: [
			[-142.0, 39.5],
			[-108.5, 51.5],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_W_SOUTH_WEST_ID]: {
		name: 'Southwest US',
		type: 'Geobox',
		coordinates: [
			[-140.37, 28.7],
			[-108.59, 44.08],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_W_ATLANTIC_ID]: {
		name: 'Western Atlantic',
		type: 'Geobox',
		coordinates: [
			[-96.0, 17.0],
			[-38.0, 44.0],
		],
		products: SATRAD_PRODUCTS,
	},
}

export const SATRAD_SECTORS_REGIONAL_ALASKA = {
	[SATRAD_SECTOR_REGIONAL_BERING_SEA_ID]: {
		name: 'Bering Sea',
		type: 'Geobox',
		coordinates: [
			[-195.0, 51.0],
			[-145.0, 64.75],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_REGIONAL_GULF_OF_AK_ID]: {
		name: 'Gulf of Alaska',
		type: 'Geobox',
		coordinates: [
			[-175.0, 47.75],
			[-124.0, 60.0],
		],
		products: SATRAD_PRODUCTS,
	},
}
export const SATRAD_SECTORS_REGIONAL_HAWAII = {
	[SATRAD_SECTOR_REGIONAL_HAWAII_ID]: {
		name: 'Hawaii',
		type: 'Geobox',
		coordinates: [
			[-170.0, 11.0],
			[-142.5, 29.0],
		],
		products: SATRAD_PRODUCTS,
	},
}
