import { ALL_SATRAD_DYNAMIC_OVERLAYS, ALL_SATRAD_STATIC_OVERLAYS } from './overlays'
import { SATRAD_PRODUCTS } from './products'

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

const regional_latitude_modifier = 2
const regional_longitude_modifier = 2

export const SATRAD_SECTORS_REGIONAL_NAMER = {
	[SATRAD_SECTOR_REGIONAL_CA_REGINA_ID]: {
		name: 'Regina',
		type: 'Geobox',
		coordinates: [
			[-104.61 + regional_longitude_modifier, 50.45 - regional_latitude_modifier],
			[-104.61 - regional_longitude_modifier, 50.45 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_BAFFIN_ID]: {
		name: 'Baffin',
		type: 'Geobox',
		coordinates: [
			[-70.0 + regional_longitude_modifier, 64.6 - regional_latitude_modifier],
			[-70.0 - regional_longitude_modifier, 64.6 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_BAKER_LK_ID]: {
		name: 'Baker Lake',
		type: 'Geobox',
		coordinates: [
			[-96.0 + regional_longitude_modifier, 64.3 - regional_latitude_modifier],
			[-96.0 - regional_longitude_modifier, 64.3 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_LK_SUPER_ID]: {
		name: 'Lake Superior',
		type: 'Geobox',
		coordinates: [
			[-90.0 + regional_longitude_modifier, 47.0 - regional_latitude_modifier],
			[-90.0 - regional_longitude_modifier, 47.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_CEN_ID]: {
		name: 'Central Canada',
		type: 'Geobox',
		coordinates: [
			[-94.0 + regional_longitude_modifier, 54.5 - regional_latitude_modifier],
			[-94.0 - regional_longitude_modifier, 54.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_EAST_ID]: {
		name: 'Eastern Canada',
		type: 'Geobox',
		coordinates: [
			[-69.2 + regional_longitude_modifier, 51.4 - regional_latitude_modifier],
			[-69.2 - regional_longitude_modifier, 51.4 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_WEST_ID]: {
		name: 'Western Canada',
		type: 'Geobox',
		coordinates: [
			[-119.0 + regional_longitude_modifier, 54.2 - regional_latitude_modifier],
			[-119.0 - regional_longitude_modifier, 54.2 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CENTRAL_ID]: {
		name: 'Central US',
		type: 'Geobox',
		coordinates: [
			[-98.25 + regional_longitude_modifier, 38.5 - regional_latitude_modifier],
			[-98.25 - regional_longitude_modifier, 38.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_EAST_COAST_ID]: {
		name: 'East Coast',
		type: 'Geobox',
		coordinates: [
			[-75.75 + regional_longitude_modifier, 36.6 - regional_latitude_modifier],
			[-75.75 - regional_longitude_modifier, 36.6 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_EAST_PAC_ID]: {
		name: 'East Pacific',
		type: 'Geobox',
		coordinates: [
			[-126.0 + regional_longitude_modifier, 25.5 - regional_latitude_modifier],
			[-126.0 - regional_longitude_modifier, 25.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_GULF_ID]: {
		name: 'Gulf Coast',
		type: 'Geobox',
		coordinates: [
			[-86.5 + regional_longitude_modifier, 24.24 - regional_latitude_modifier],
			[-86.5 - regional_longitude_modifier, 24.24 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_MIDWEST_ID]: {
		name: 'Midwest',
		type: 'Geobox',
		coordinates: [
			[-91.4 + regional_longitude_modifier, 40.0 - regional_latitude_modifier],
			[-91.4 - regional_longitude_modifier, 40.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_CENTRAL_ID]: {
		name: 'North Central US',
		type: 'Geobox',
		coordinates: [
			[-98.0 + regional_longitude_modifier, 42.8 - regional_latitude_modifier],
			[-98.0 - regional_longitude_modifier, 42.8 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTHEAST_ID]: {
		name: 'Northeast US',
		type: 'Geobox',
		coordinates: [
			[-80.5 + regional_longitude_modifier, 42.58 - regional_latitude_modifier],
			[-80.5 - regional_longitude_modifier, 42.58 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_MEXICO_ID]: {
		name: 'North Mexico',
		type: 'Geobox',
		coordinates: [
			[-104.0 + regional_longitude_modifier, 26.0 - regional_latitude_modifier],
			[-104.0 - regional_longitude_modifier, 26.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_WEST_ID]: {
		name: 'Northwest US',
		type: 'Geobox',
		coordinates: [
			[-110.0 + regional_longitude_modifier, 43.6 - regional_latitude_modifier],
			[-110.0 - regional_longitude_modifier, 43.6 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NW_ATLANTIC_ID]: {
		name: 'Northwest Atlantic',
		type: 'Geobox',
		coordinates: [
			[-58.1 + regional_longitude_modifier, 43.8 - regional_latitude_modifier],
			[-58.1 - regional_longitude_modifier, 43.8 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_PUERTO_RICO_ID]: {
		name: 'Puerto Rico',
		type: 'Geobox',
		coordinates: [
			[-67.81 + regional_longitude_modifier, 17.92 - regional_latitude_modifier],
			[-67.81 - regional_longitude_modifier, 17.92 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_CENTRAL_ID]: {
		name: 'South Central US',
		type: 'Geobox',
		coordinates: [
			[-98.5 + regional_longitude_modifier, 33.5 - regional_latitude_modifier],
			[-98.5 - regional_longitude_modifier, 33.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTHEAST_ID]: {
		name: 'Southeast US',
		type: 'Geobox',
		coordinates: [
			[-84.5 + regional_longitude_modifier, 32.0 - regional_latitude_modifier],
			[-84.5 - regional_longitude_modifier, 32.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_MEXICO_ID]: {
		name: 'South Mexico',
		type: 'Geobox',
		coordinates: [
			[-101.0 + regional_longitude_modifier, 21.9 - regional_latitude_modifier],
			[-101.0 - regional_longitude_modifier, 21.9 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_WEST_ID]: {
		name: 'Southwest US',
		type: 'Geobox',
		coordinates: [
			[-107.75 + regional_longitude_modifier, 36.5 - regional_latitude_modifier],
			[-107.75 - regional_longitude_modifier, 36.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_W_NORTH_WEST_ID]: {
		name: 'Northwest US',
		type: 'Geobox',
		coordinates: [
			[-125.0 + regional_longitude_modifier, 45.0 - regional_latitude_modifier],
			[-125.0 - regional_longitude_modifier, 45.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_W_SOUTH_WEST_ID]: {
		name: 'Southwest US',
		type: 'Geobox',
		coordinates: [
			[-125.0 + regional_longitude_modifier, 37.0 - regional_latitude_modifier],
			[-125.0 - regional_longitude_modifier, 37.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_W_ATLANTIC_ID]: {
		name: 'Western Atlantic',
		type: 'Geobox',
		coordinates: [
			[-67.2 + regional_longitude_modifier, 30.9 - regional_latitude_modifier],
			[-67.2 - regional_longitude_modifier, 30.9 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

export const SATRAD_SECTORS_REGIONAL_ALASKA = {
	[SATRAD_SECTOR_REGIONAL_BERING_SEA_ID]: {
		name: 'Bering Sea',
		type: 'Geobox',
		coordinates: [
			[-172.0 + regional_longitude_modifier, 59.0 - regional_latitude_modifier],
			[-172.0 - regional_longitude_modifier, 59.0 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_GULF_OF_AK_ID]: {
		name: 'Gulf of Alaska',
		type: 'Geobox',
		coordinates: [
			[-149.0 + regional_longitude_modifier, 54.5 - regional_latitude_modifier],
			[-149.0 - regional_longitude_modifier, 54.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
export const SATRAD_SECTORS_REGIONAL_HAWAII = {
	[SATRAD_SECTOR_REGIONAL_HAWAII_ID]: {
		name: 'Hawaii',
		type: 'Geobox',
		coordinates: [
			[-156.1 + regional_longitude_modifier, 20.5 - regional_latitude_modifier],
			[-156.1 - regional_longitude_modifier, 20.5 + regional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
