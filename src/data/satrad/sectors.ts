const ALL_SATRAD_PRODUCTS = [] // Placeholder for all products
const ALL_SATRAD_STATIC_OVERLAYS = [] // Placeholder for all static overlays
const ALL_SATRAD_DYNAMIC_OVERLAYS = [] // Placeholder for all dynamic overlays

// Global Sectors
const SATRAD_SECTOR_GLOBAL_CAPEVERDE_ID = 'capeverde'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_EQUATORIAL_ID = 'equatorial'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_EQUATORIAL_ID = 'equatorialwest'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_FULL_DISK_ID = 'fulldiskeast'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_FULL_DISK_LARGE_ID = 'fulldiskeastlarge'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_FULL_DISK_ID = 'fulldiskwest'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_FULL_DISK_LARGE_ID = 'fulldiskwestlarge'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_HALF_DISK_NORTH_ID = 'halfdiskeastnorth'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_HALF_DISK_SOUTH_ID = 'halfdiskeastsouth'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_HALF_DISK_NORTH_ID = 'halfdiskwestnorth'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_HALF_DISK_SOUTH_ID = 'halfdiskwestsouth'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_NORTHERN_HEMISPHERE_ID = 'northernhemi'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTHERN_HEMISPHERE_ID = 'northernhemiwest'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_SOUTHERN_HEMISPHERE_ID = 'southernhemi'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_SOUTHERN_HEMISPHERE_ID = 'southernhemiwest'
const SATRAD_SECTOR_GLOBAL_ATLANTIC_ID = 'atlantic'
const SATRAD_SECTOR_GLOBAL_SOUTH_ATLANTIC_ID = 'southatlantic'
const SATRAD_SECTOR_GLOBAL_NORTH_AMERICA_ID = 'northamerica'
const SATRAD_SECTOR_GLOBAL_SOUTH_AMERICA_ID = 'southamerica'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTH_PACIFIC_LARGE_ID = 'npacwestlarge'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTH_PACIFIC_ID = 'npacwest'
const SATRAD_SECTOR_GLOBAL_GOES_EAST_SOUTH_PACIFIC_ID = 'southpacific'
const SATRAD_SECTOR_GLOBAL_GOES_WEST_SOUTHWEST_PACIFIC_ID = 'spacwest'

const global_latitude_modifier = 4
const global_longitude_modifier = 4
// the geobox bounds for these sectors may need to be defined by hand
export const SATRAD_SECTORS_GLOBAL_GOES_EAST = {
	[SATRAD_SECTOR_GLOBAL_CAPEVERDE_ID]: {
		name: 'Cape Verde',
		type: 'Geobox',
		coordinates: [
			[-24.0 + global_longitude_modifier, 16.0 - global_latitude_modifier],
			[-24.0 - global_longitude_modifier, 16.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_EQUATORIAL_ID]: {
		name: 'GOES East Equatorial',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_FULL_DISK_ID]: {
		name: 'GOES East Full Disk',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_FULL_DISK_LARGE_ID]: {
		name: 'GOES East Full Disk Large',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_HALF_DISK_NORTH_ID]: {
		name: 'GOES East Half Disk North',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 25.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 25.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_HALF_DISK_SOUTH_ID]: {
		name: 'GOES East Half Disk South',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, -25.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, -25.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_NORTHERN_HEMISPHERE_ID]: {
		name: 'GOES East Northern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 50.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 50.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_SOUTHERN_HEMISPHERE_ID]: {
		name: 'GOES East Southern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, -50.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, -50.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_ATLANTIC_ID]: {
		name: 'Atlantic',
		type: 'Geobox',
		coordinates: [
			[-55.0 + global_longitude_modifier, 24 - global_latitude_modifier],
			[-55.0 - global_longitude_modifier, 24 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_SOUTH_ATLANTIC_ID]: {
		name: 'South Atlantic',
		type: 'Geobox',
		coordinates: [
			[-45.0 + global_longitude_modifier, -14.0 - global_latitude_modifier],
			[-45.0 - global_longitude_modifier, -14.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_NORTH_AMERICA_ID]: {
		name: 'North America',
		type: 'Geobox',
		coordinates: [
			[-96.0 + global_longitude_modifier, 41.5 - global_latitude_modifier],
			[-96.0 - global_longitude_modifier, 41.5 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_SOUTH_AMERICA_ID]: {
		name: 'South America',
		type: 'Geobox',
		coordinates: [
			[-60.0 + global_longitude_modifier, -27.0 - global_latitude_modifier],
			[-60.0 - global_longitude_modifier, -27.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_SOUTH_PACIFIC_ID]: {
		name: 'GOES East South Pacific',
		type: 'Geobox',
		coordinates: [
			[-115.0 + global_longitude_modifier, -30.0 - global_latitude_modifier],
			[-115.0 - global_longitude_modifier, -30.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

export const SATRAD_SECTORS_GLOBAL_GOES_WEST = {
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_EQUATORIAL_ID]: {
		name: 'GOES West Equatorial',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_FULL_DISK_ID]: {
		name: 'GOES West Full Disk',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_FULL_DISK_LARGE_ID]: {
		name: 'GOES West Full Disk Large',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_HALF_DISK_NORTH_ID]: {
		name: 'GOES West Half Disk North',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 25.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 25.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_HALF_DISK_SOUTH_ID]: {
		name: 'GOES West Half Disk South',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, -25.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, -25.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTHERN_HEMISPHERE_ID]: {
		name: 'GOES West Northern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 50.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 50.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_SOUTHERN_HEMISPHERE_ID]: {
		name: 'GOES West Southern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, -50.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, -50.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTH_PACIFIC_ID]: {
		name: 'GOES West North Pacific',
		type: 'Geobox',
		coordinates: [
			[-170.0 + global_longitude_modifier, 30.0 - global_latitude_modifier],
			[-170.0 - global_longitude_modifier, 30.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTH_PACIFIC_LARGE_ID]: {
		name: 'GOES West North Pacific Large',
		type: 'Geobox',
		coordinates: [
			[-170.0 + global_longitude_modifier, 30.0 - global_latitude_modifier],
			[-170.0 - global_longitude_modifier, 30.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_SOUTHWEST_PACIFIC_ID]: {
		name: 'GOES West South Pacific',
		type: 'Geobox',
		coordinates: [
			[-170.0 + global_longitude_modifier, -30.0 - global_latitude_modifier],
			[-170.0 - global_longitude_modifier, -30.0 + global_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

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

export const SATRAD_SECTORS_CONTINENTA_GOES_EAST = {
	[SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_ID]: {
		name: 'CONUS',
		type: 'Geobox',
		coordinates: [
			[-95.0 + continental_longitude_modifier, 37.5 - continental_latitude_modifier],
			[-95.0 - continental_longitude_modifier, 37.5 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_GOES_EAST_CONUS_SOUTH_ID]: {
		name: 'CONUS South',
		type: 'Geobox',
		coordinates: [
			[-95.0 + continental_longitude_modifier, 25.0 - continental_latitude_modifier],
			[-95.0 - continental_longitude_modifier, 25.0 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_ARGENTINA_ID]: {
		name: 'Argentina',
		type: 'Geobox',
		coordinates: [
			[-65.0 + continental_longitude_modifier, -40.0 - continental_latitude_modifier],
			[-65.0 - continental_longitude_modifier, -40.0 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_BRAZIL_ID]: {
		name: 'Brazil',
		type: 'Geobox',
		coordinates: [
			[-50.0 + continental_longitude_modifier, -10.0 - continental_latitude_modifier],
			[-50.0 - continental_longitude_modifier, -10.0 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_ENSO_ID]: {
		name: 'ENSO',
		type: 'Geobox',
		coordinates: [
			[-150.0 + continental_longitude_modifier, -10.0 - continental_latitude_modifier],
			[-150.0 - continental_longitude_modifier, -10.0 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
export const SATRAD_SECTORS_CONTINENTA_GOES_WEST = {
	[SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_ID]: {
		name: 'CONUS West',
		type: 'Geobox',
		coordinates: [
			[-135.0 + continental_longitude_modifier, 37.5 - continental_latitude_modifier],
			[-135.0 - continental_longitude_modifier, 37.5 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_GOES_WEST_CONUS_SOUTH_ID]: {
		name: 'CONUS West South',
		type: 'Geobox',
		coordinates: [
			[-135.0 + continental_longitude_modifier, 25.0 - continental_latitude_modifier],
			[-135.0 - continental_longitude_modifier, 25.0 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_CONTINENTAL_ALASKA_ID]: {
		name: 'Alaska',
		type: 'Geobox',
		coordinates: [
			[-170.0 + continental_longitude_modifier, 50.0 - continental_latitude_modifier],
			[-170.0 - continental_longitude_modifier, 50.0 + continental_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

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
			[-105.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-105.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_BAFFIN_ID]: {
		name: 'Baffin',
		type: 'Geobox',
		coordinates: [
			[-70.0 + regional_longitude_modifier, 70.0 - regional_latitude_modifier],
			[-70.0 - regional_longitude_modifier, 70.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_BAKER_LK_ID]: {
		name: 'Baker Lake',
		type: 'Geobox',
		coordinates: [
			[-90.0 + regional_longitude_modifier, 65.0 - regional_latitude_modifier],
			[-90.0 - regional_longitude_modifier, 65.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_LK_SUPER_ID]: {
		name: 'Lake Superior',
		type: 'Geobox',
		coordinates: [
			[-90.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-90.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_CEN_ID]: {
		name: 'Central Canada',
		type: 'Geobox',
		coordinates: [
			[-100.0 + regional_longitude_modifier, 55.0 - regional_latitude_modifier],
			[-100.0 - regional_longitude_modifier, 55.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_EAST_ID]: {
		name: 'Eastern Canada',
		type: 'Geobox',
		coordinates: [
			[-80.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-80.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CA_REG_WEST_ID]: {
		name: 'Western Canada',
		type: 'Geobox',
		coordinates: [
			[-130.0 + regional_longitude_modifier, 55.0 - regional_latitude_modifier],
			[-130.0 - regional_longitude_modifier, 55.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_CENTRAL_ID]: {
		name: 'Central US',
		type: 'Geobox',
		coordinates: [
			[-100.0 + regional_longitude_modifier, 37.5 - regional_latitude_modifier],
			[-100.0 - regional_longitude_modifier, 37.5 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_EAST_COAST_ID]: {
		name: 'East Coast',
		type: 'Geobox',
		coordinates: [
			[-75.0 + regional_longitude_modifier, 37.5 - regional_latitude_modifier],
			[-75.0 - regional_longitude_modifier, 37.5 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_EAST_PAC_ID]: {
		name: 'East Pacific',
		type: 'Geobox',
		coordinates: [
			[-120.0 + regional_longitude_modifier, 0.0 - regional_latitude_modifier],
			[-120.0 - regional_longitude_modifier, 0.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_GULF_ID]: {
		name: 'Gulf Coast',
		type: 'Geobox',
		coordinates: [
			[-90.0 + regional_longitude_modifier, 30.0 - regional_latitude_modifier],
			[-90.0 - regional_longitude_modifier, 30.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_MIDWEST_ID]: {
		name: 'Midwest',
		type: 'Geobox',
		coordinates: [
			[-95.0 + regional_longitude_modifier, 40.0 - regional_latitude_modifier],
			[-95.0 - regional_longitude_modifier, 40.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_CENTRAL_ID]: {
		name: 'North Central US',
		type: 'Geobox',
		coordinates: [
			[-100.0 + regional_longitude_modifier, 45.0 - regional_latitude_modifier],
			[-100.0 - regional_longitude_modifier, 45.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTHEAST_ID]: {
		name: 'Northeast US',
		type: 'Geobox',
		coordinates: [
			[-75.0 + regional_longitude_modifier, 45.0 - regional_latitude_modifier],
			[-75.0 - regional_longitude_modifier, 45.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_MEXICO_ID]: {
		name: 'North Mexico',
		type: 'Geobox',
		coordinates: [
			[-105.0 + regional_longitude_modifier, 30.0 - regional_latitude_modifier],
			[-105.0 - regional_longitude_modifier, 30.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NORTH_WEST_ID]: {
		name: 'Northwest US',
		type: 'Geobox',
		coordinates: [
			[-130.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-130.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_NW_ATLANTIC_ID]: {
		name: 'Northwest Atlantic',
		type: 'Geobox',
		coordinates: [
			[-70.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-70.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_PUERTO_RICO_ID]: {
		name: 'Puerto Rico',
		type: 'Geobox',
		coordinates: [
			[-70.0 + regional_longitude_modifier, 18.0 - regional_latitude_modifier],
			[-70.0 - regional_longitude_modifier, 18.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_CENTRAL_ID]: {
		name: 'South Central US',
		type: 'Geobox',
		coordinates: [
			[-100.0 + regional_longitude_modifier, 30.0 - regional_latitude_modifier],
			[-100.0 - regional_longitude_modifier, 30.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTHEAST_ID]: {
		name: 'Southeast US',
		type: 'Geobox',
		coordinates: [
			[-85.0 + regional_longitude_modifier, 30.0 - regional_latitude_modifier],
			[-85.0 - regional_longitude_modifier, 30.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_MEXICO_ID]: {
		name: 'South Mexico',
		type: 'Geobox',
		coordinates: [
			[-105.0 + regional_longitude_modifier, 20.0 - regional_latitude_modifier],
			[-105.0 - regional_longitude_modifier, 20.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_SOUTH_WEST_ID]: {
		name: 'Southwest US',
		type: 'Geobox',
		coordinates: [
			[-130.0 + regional_longitude_modifier, 30.0 - regional_latitude_modifier],
			[-130.0 - regional_longitude_modifier, 30.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_W_NORTH_WEST_ID]: {
		name: 'Northwest US',
		type: 'Geobox',
		coordinates: [
			[-130.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-130.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_W_SOUTH_WEST_ID]: {
		name: 'Southwest US',
		type: 'Geobox',
		coordinates: [
			[-130.0 + regional_longitude_modifier, 30.0 - regional_latitude_modifier],
			[-130.0 - regional_longitude_modifier, 30.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_W_ATLANTIC_ID]: {
		name: 'Western Atlantic',
		type: 'Geobox',
		coordinates: [
			[-80.0 + regional_longitude_modifier, 50.0 - regional_latitude_modifier],
			[-80.0 - regional_longitude_modifier, 50.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

export const SATRAD_SECTORS_REGIONAL_AK = {
	[SATRAD_SECTOR_REGIONAL_BERING_SEA_ID]: {
		name: 'Bering Sea',
		type: 'Geobox',
		coordinates: [
			[-170.0 + regional_longitude_modifier, 55.0 - regional_latitude_modifier],
			[-170.0 - regional_longitude_modifier, 55.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_REGIONAL_GULF_OF_AK_ID]: {
		name: 'Gulf of Alaska',
		type: 'Geobox',
		coordinates: [
			[-150.0 + regional_longitude_modifier, 60.0 - regional_latitude_modifier],
			[-150.0 - regional_longitude_modifier, 60.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
export const SATRAD_SECTORS_REGIONAL_HI = {
	[SATRAD_SECTOR_REGIONAL_HAWAII_ID]: {
		name: 'Hawaii',
		type: 'Geobox',
		coordinates: [
			[-160.0 + regional_longitude_modifier, 20.0 - regional_latitude_modifier],
			[-160.0 - regional_longitude_modifier, 20.0 + regional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

// Sub-regional Sectors
const SATRAD_SECTOR_SUBREGIONAL_ALASKAWEST_ID = 'AlaskaWest'
const SATRAD_SECTOR_SUBREGIONAL_ANCHORAGESUB_ID = 'Anchoragesub'
const SATRAD_SECTOR_SUBREGIONAL_NWALASKA_ID = 'NWAlaska'
const SATRAD_SECTOR_SUBREGIONAL_JUNEAUSUB_ID = 'Juneausub'
const SATRAD_SECTOR_SUBREGIONAL_FAIRBANKS_ID = 'Fairbanks'
const SATRAD_SECTOR_SUBREGIONAL_BRISTOLBAY_ID = 'BristolBay'
const SATRAD_SECTOR_SUBREGIONAL_UNALASKA_ID = 'Unalaska'

const SATRAD_SECTOR_SUBREGIONAL_HIZOOM_ID = 'HIzoom'

const SATRAD_SECTOR_SUBREGIONAL_ARIZONA_ID = 'Arizona'
const SATRAD_SECTOR_SUBREGIONAL_AUSTIN_ID = 'Austin'
const SATRAD_SECTOR_SUBREGIONAL_BAHAMAS_ID = 'Bahamas'
const SATRAD_SECTOR_SUBREGIONAL_BAJA_ID = 'Baja'
const SATRAD_SECTOR_SUBREGIONAL_BERMUDA_ID = 'Bermuda'
const SATRAD_SECTOR_SUBREGIONAL_BIG_BEND_ID = 'Big_Bend'
const SATRAD_SECTOR_SUBREGIONAL_BOOTHEEL_ID = 'Bootheel'
const SATRAD_SECTOR_SUBREGIONAL_CO_KS_PANHAN_ID = 'CO_KS_PanHan'
const SATRAD_SECTOR_SUBREGIONAL_CALIGULF_ID = 'Cali_Gulf'
const SATRAD_SECTOR_SUBREGIONAL_CAROLINAS_ID = 'Carolinas'
const SATRAD_SECTOR_SUBREGIONAL_CENPLAINS_ID = 'Cen_Plains'
const SATRAD_SECTOR_SUBREGIONAL_CENROCKIES_ID = 'Cen_Rockies'
const SATRAD_SECTOR_SUBREGIONAL_CLOVIS_ID = 'Clovis'
const SATRAD_SECTOR_SUBREGIONAL_COLORADO_ID = 'Colorado'
const SATRAD_SECTOR_SUBREGIONAL_COZUMEL_ID = 'Cozumel'
const SATRAD_SECTOR_SUBREGIONAL_CUBA_ID = 'Cuba'
const SATRAD_SECTOR_SUBREGIONAL_DESERTSW_ID = 'Desert_SW'
const SATRAD_SECTOR_SUBREGIONAL_DIXIE_ID = 'Dixie'
const SATRAD_SECTOR_SUBREGIONAL_DURANGO_ID = 'Durango'
const SATRAD_SECTOR_SUBREGIONAL_E_ANTILLES_ID = 'E_Antilles'
const SATRAD_SECTOR_SUBREGIONAL_E_CARIBBEAN_ID = 'E_Caribbean'
const SATRAD_SECTOR_SUBREGIONAL_E_GULF_COAST_ID = 'E_Gulf_Coast'
const SATRAD_SECTOR_SUBREGIONAL_FARGO_ID = 'Fargo'
const SATRAD_SECTOR_SUBREGIONAL_FLORIDA_ID = 'Florida'
const SATRAD_SECTOR_SUBREGIONAL_FOURCORNERS_ID = 'Four_Corners'
const SATRAD_SECTOR_SUBREGIONAL_GRANDFORKS_ID = 'GrandForks'
const SATRAD_SECTOR_SUBREGIONAL_GREATERANTILLES_ID = 'Greater_Antilles'
const SATRAD_SECTOR_SUBREGIONAL_IL_ID = 'IL'
const SATRAD_SECTOR_SUBREGIONAL_LAWRENCE_ID = 'Lawrence'
const SATRAD_SECTOR_SUBREGIONAL_MI_ID = 'MI'
const SATRAD_SECTOR_SUBREGIONAL_MEXICOCITY_ID = 'Mexico_City'
const SATRAD_SECTOR_SUBREGIONAL_MIDATLANTIC_ID = 'Mid_Atlantic'
const SATRAD_SECTOR_SUBREGIONAL_MONTREAL_ID = 'Montreal'
const SATRAD_SECTOR_SUBREGIONAL_NC_VA_ID = 'NC_VA'
const SATRAD_SECTOR_SUBREGIONAL_NE_WY_ID = 'NE_WY'
const SATRAD_SECTOR_SUBREGIONAL_N_IOWA_ID = 'N_Iowa'
const SATRAD_SECTOR_SUBREGIONAL_N_LOUISIANA_ID = 'N_Louisiana'
const SATRAD_SECTOR_SUBREGIONAL_N_NEVADA_ID = 'N_Nevada'
const SATRAD_SECTOR_SUBREGIONAL_N_NEW_MEXICO_ID = 'N_New_Mexico'
const SATRAD_SECTOR_SUBREGIONAL_N_PLAINS_ID = 'N_Plains'
const SATRAD_SECTOR_SUBREGIONAL_N_ROCKIES_ID = 'N_Rockies'
const SATRAD_SECTOR_SUBREGIONAL_N_TIER_ID = 'N_Tier'
const SATRAD_SECTOR_SUBREGIONAL_NEVADA_ID = 'Nevada'
const SATRAD_SECTOR_SUBREGIONAL_NEW_ENGLAND_ID = 'New_England'
const SATRAD_SECTOR_SUBREGIONAL_NRN_MO_ID = 'Nrn_Mo'
const SATRAD_SECTOR_SUBREGIONAL_NUEVOLEON_ID = 'Nuevo_Leon'
const SATRAD_SECTOR_SUBREGIONAL_OH_RV_ID = 'OH_RV'
const SATRAD_SECTOR_SUBREGIONAL_OREGON_ID = 'Oregon'
const SATRAD_SECTOR_SUBREGIONAL_ORLANDO_ID = 'Orlando'
const SATRAD_SECTOR_SUBREGIONAL_QUEBEC_ID = 'Quebec'
const SATRAD_SECTOR_SUBREGIONAL_PACNW_ID = 'Pac_NW'
const SATRAD_SECTOR_SUBREGIONAL_PHOENIX_ID = 'Phoenix'
const SATRAD_SECTOR_SUBREGIONAL_PUERTO_RICO_ID = 'PuertoRico'
const SATRAD_SECTOR_SUBREGIONAL_SW_MISSOURI_ID = 'SW_Missouri'
const SATRAD_SECTOR_SUBREGIONAL_SW_UTAH_ID = 'SW_Utah'
const SATRAD_SECTOR_SUBREGIONAL_S_BRITISH_COLUMBIA_ID = 'S_British_Columbia'
const SATRAD_SECTOR_SUBREGIONAL_S_FLORIDA_ID = 'S_Florida'
const SATRAD_SECTOR_SUBREGIONAL_S_IDAHO_ID = 'S_Idaho'
const SATRAD_SECTOR_SUBREGIONAL_S_PANHANDLE_ID = 'S_PanHandle'
const SATRAD_SECTOR_SUBREGIONAL_S_PLAINS_ID = 'S_Plains'
const SATRAD_SECTOR_SUBREGIONAL_S_SASKATCHEWAN_ID = 'S_SK'
const SATRAD_SECTOR_SUBREGIONAL_SALT_LAKE_ID = 'Salt_Lake'
const SATRAD_SECTOR_SUBREGIONAL_SANFRAN_ID = 'SanFran'
const SATRAD_SECTOR_SUBREGIONAL_SIERRA_ID = 'Sierra'
const SATRAD_SECTOR_SUBREGIONAL_SIOUXFALLS_ID = 'Souix_Falls'
const SATRAD_SECTOR_SUBREGIONAL_ST_LAWRENCE_ID = 'St_Lawrence'
const SATRAD_SECTOR_SUBREGIONAL_TEXAS_ID = 'Texas'
const SATRAD_SECTOR_SUBREGIONAL_VANDENBERG_ID = 'Vandenburg'
const SATRAD_SECTOR_SUBREGIONAL_VERMONT_ID = 'Vermont'
const SATRAD_SECTOR_SUBREGIONAL_VIRGINIAS_ID = 'Virginias'
const SATRAD_SECTOR_SUBREGIONAL_W_CARIBBEAN_ID = 'W_Caribbean'
const SATRAD_SECTOR_SUBREGIONAL_W_GULF_COAST_ID = 'W_Gulf_Coast'
const SATRAD_SECTOR_SUBREGIONAL_W_MONTANA_ID = 'W_Montana'
const SATRAD_SECTOR_SUBREGIONAL_WHITESANDS_ID = 'White_Sands'
const SATRAD_SECTOR_SUBREGIONAL_WICHITAFALLS_ID = 'Wichita_Falls'
const SATRAD_SECTOR_SUBREGIONAL_WINNIPEG_ID = 'Winnipeg'
const SATRAD_SECTOR_SUBREGIONAL_WYOMING_ID = 'Wyoming'
const SATRAD_SECTOR_SUBREGIONAL_YELLOWSTONE_ID = 'Yellowstone'
const SATRAD_SECTOR_SUBREGIONAL_YUCATAN_ID = 'Yucatan'
const SATRAD_SECTOR_SUBREGIONAL_CA_BAFFIN_ID = 'ca_baffin'
const SATRAD_SECTOR_SUBREGIONAL_CA_BAKERLK_ID = 'ca_bakerlk'
const SATRAD_SECTOR_SUBREGIONAL_CA_C_QC_ID = 'ca_c_quebec'
const SATRAD_SECTOR_SUBREGIONAL_CA_EDMONTON_ID = 'ca_edmonton'
const SATRAD_SECTOR_SUBREGIONAL_CA_ERN_NL_ID = 'ca_ern_nl'
const SATRAD_SECTOR_SUBREGIONAL_CA_GULF_STL_ID = 'ca_gulf_stl'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_ALBERTA_ID = 'ca_n_alberta'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_BC_ID = 'ca_n_bc'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_MB_SK_ID = 'ca_n_mb_sk'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_ONTARIO_ID = 'ca_n_ontario'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_QC_ID = 'ca_n_quebec'
const SATRAD_SECTOR_SUBREGIONAL_CA_NL_ID = 'ca_nl'
const SATRAD_SECTOR_SUBREGIONAL_CA_S_BC_ID = 'ca_s_bc'
const SATRAD_SECTOR_SUBREGIONAL_CA_S_MB_SK_ID = 'ca_s_mb_sk'
const SATRAD_SECTOR_SUBREGIONAL_CA_S_ONTARIO_ID = 'ca_s_ontario'
const SATRAD_SECTOR_SUBREGIONAL_CA_UNGAVA_ID = 'ca_ungava'
const SATRAD_SECTOR_SUBREGIONAL_GREATER_ANTILLES_ID = 'Greater_Anti'
const SATRAD_SECTOR_SUBREGIONAL_NW_PLAINS_ID = 'NW_Plains'
const SATRAD_SECTOR_SUBREGIONAL_S_BC_ID = 'S_British_Co'

const subregional_latitude_modifier = 1.5
const subregional_longitude_modifier = 1.5

export const SATRAD_SECTORS_SUBREGIONAL_NAMER = {
	[SATRAD_SECTOR_SUBREGIONAL_ARIZONA_ID]: {
		name: 'Arizona',
		type: 'Geobox',
		coordinates: [
			[-115.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-115.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_AUSTIN_ID]: {
		name: 'Austin',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BAHAMAS_ID]: {
		name: 'Bahamas',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BAJA_ID]: {
		name: 'Baja',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BERMUDA_ID]: {
		name: 'Bermuda',
		type: 'Geobox',
		coordinates: [
			[-65.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-65.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BIG_BEND_ID]: {
		name: 'Big Bend',
		type: 'Geobox',
		coordinates: [
			[-105.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-105.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BOOTHEEL_ID]: {
		name: 'Bootheel',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CO_KS_PANHAN_ID]: {
		name: 'CO_KS_PanHandle',
		type: 'Geobox',
		coordinates: [
			[-105.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-105.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CALIGULF_ID]: {
		name: 'Cali_Gulf',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CAROLINAS_ID]: {
		name: 'Carolinas',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CENPLAINS_ID]: {
		name: 'Cen_Plains',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CENROCKIES_ID]: {
		name: 'Cen_Rockies',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CLOVIS_ID]: {
		name: 'Clovis',
		type: 'Geobox',
		coordinates: [
			[-105.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-105.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_COLORADO_ID]: {
		name: 'Colorado',
		type: 'Geobox',
		coordinates: [
			[-105.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-105.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_COZUMEL_ID]: {
		name: 'Cozumel',
		type: 'Geobox',
		coordinates: [
			[-90.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-90.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CUBA_ID]: {
		name: 'Cuba',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_DESERTSW_ID]: {
		name: 'Desert_SW',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_DIXIE_ID]: {
		name: 'Dixie',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_DURANGO_ID]: {
		name: 'Durango',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_ANTILLES_ID]: {
		name: 'E_Antilles',
		type: 'Geobox',
		coordinates: [
			[-70.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-70.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_CARIBBEAN_ID]: {
		name: 'E_Caribbean',
		type: 'Geobox',
		coordinates: [
			[-70.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-70.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_GULF_COAST_ID]: {
		name: 'E_Gulf_Coast',
		type: 'Geobox',
		coordinates: [
			[-90.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-90.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_FARGO_ID]: {
		name: 'Fargo',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_FLORIDA_ID]: {
		name: 'Florida',
		type: 'Geobox',
		coordinates: [
			[-85.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-85.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_FOURCORNERS_ID]: {
		name: 'Four Corners',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_GRANDFORKS_ID]: {
		name: 'Grand Forks',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_GREATERANTILLES_ID]: {
		name: 'Greater Antilles',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_IL_ID]: {
		name: 'Illinois',
		type: 'Geobox',
		coordinates: [
			[-90.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-90.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_LAWRENCE_ID]: {
		name: 'Lawrence',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MI_ID]: {
		name: 'Michigan',
		type: 'Geobox',
		coordinates: [
			[-85.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-85.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MEXICOCITY_ID]: {
		name: 'Mexico City',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MIDATLANTIC_ID]: {
		name: 'Mid Atlantic',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MONTREAL_ID]: {
		name: 'Montreal',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 40.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 40.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NC_VA_ID]: {
		name: 'North Carolina and Virginia',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NE_WY_ID]: {
		name: 'NE_WY',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_IOWA_ID]: {
		name: 'N_Iowa',
		type: 'Geobox',
		coordinates: [
			[-95.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-95.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_LOUISIANA_ID]: {
		name: 'N_Louisiana',
		type: 'Geobox',
		coordinates: [
			[-95.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-95.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_NEVADA_ID]: {
		name: 'N_Nevada',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_NEW_MEXICO_ID]: {
		name: 'N_New_Mexico',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_PLAINS_ID]: {
		name: 'N_Plains',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_ROCKIES_ID]: {
		name: 'N_Rockies',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_TIER_ID]: {
		name: 'Upper Peninsula',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NEVADA_ID]: {
		name: 'Nevada',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NW_PLAINS_ID]: {
		name: 'NW_Plains',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_OH_RV_ID]: {
		name: 'Ohio River Valley',
		type: 'Geobox',
		coordinates: [
			[-85.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-85.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NEW_ENGLAND_ID]: {
		name: 'New England',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NRN_MO_ID]: {
		name: 'Northern Missouri',
		type: 'Geobox',
		coordinates: [
			[-95.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-95.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NUEVOLEON_ID]: {
		name: 'Nuevo Leon',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_OREGON_ID]: {
		name: 'Oregon',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_ORLANDO_ID]: {
		name: 'Orlando',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_QUEBEC_ID]: {
		name: 'Quebec',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 40.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 40.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_PACNW_ID]: {
		name: 'Pacific Northwest',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_PHOENIX_ID]: {
		name: 'Phoenix',
		type: 'Geobox',
		coordinates: [
			[-115.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-115.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_PUERTO_RICO_ID]: {
		name: 'Puerto Rico',
		type: 'Geobox',
		coordinates: [
			[-70.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-70.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SW_MISSOURI_ID]: {
		name: 'SW Missouri',
		type: 'Geobox',
		coordinates: [
			[-95.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-95.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SW_UTAH_ID]: {
		name: 'SW Utah',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_BRITISH_COLUMBIA_ID]: {
		name: 'S_British_Columbia',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_FLORIDA_ID]: {
		name: 'S_Florida',
		type: 'Geobox',
		coordinates: [
			[-85.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-85.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_IDAHO_ID]: {
		name: 'S_Idaho',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_PANHANDLE_ID]: {
		name: 'S_Panhandle',
		type: 'Geobox',
		coordinates: [
			[-105.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-105.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_PLAINS_ID]: {
		name: 'S_Plains',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_SASKATCHEWAN_ID]: {
		name: 'S_Saskatchewan',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SALT_LAKE_ID]: {
		name: 'Salt Lake',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SANFRAN_ID]: {
		name: 'San Francisco',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SIERRA_ID]: {
		name: 'Sierra',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SIOUXFALLS_ID]: {
		name: 'Sioux Falls',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_ST_LAWRENCE_ID]: {
		name: 'St. Lawrence',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 40.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 40.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_TEXAS_ID]: {
		name: 'Texas',
		type: 'Geobox',
		coordinates: [
			[-105.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-105.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_VANDENBERG_ID]: {
		name: 'Vandenberg',
		type: 'Geobox',
		coordinates: [
			[-120.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-120.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_VERMONT_ID]: {
		name: 'Vermont',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 40.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 40.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_VIRGINIAS_ID]: {
		name: 'Virginias',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_W_CARIBBEAN_ID]: {
		name: 'W_Caribbean',
		type: 'Geobox',
		coordinates: [
			[-80.0 + subregional_longitude_modifier, 20.0 - subregional_latitude_modifier],
			[-80.0 - subregional_longitude_modifier, 20.0 + subregional_latitude_modifier],
		],
		products: ALL_SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

// Local Sectors

const SATRAD_SECTOR_LOCAL_ALABAMA_ID = 'Alabama'
const SATRAD_SECTOR_LOCAL_ALASKA_WEST_ID = 'AlaskaWest'
const SATRAD_SECTOR_LOCAL_ALASKA_NORTH_ID = 'Alaskanorth'
const SATRAD_SECTOR_LOCAL_ANCHORAGE_ID = 'Anchorage'
const SATRAD_SECTOR_LOCAL_ARIZONA_ID = 'Arizona'
const SATRAD_SECTOR_LOCAL_ARKANSAS_ID = 'Arkansas'
const SATRAD_SECTOR_LOCAL_AUSTIN_ID = 'Austin'
const SATRAD_SECTOR_LOCAL_BAHAMAS_ID = 'Bahamas'
const SATRAD_SECTOR_LOCAL_BEATRICE_ID = 'Beatrice'
const SATRAD_SECTOR_LOCAL_BERMUDA_ID = 'Bermudazoom'
const SATRAD_SECTOR_LOCAL_BETHEL_ID = 'Bethel'
const SATRAD_SECTOR_LOCAL_BLACK_HILLS_ID = 'Black_Hills'
const SATRAD_SECTOR_LOCAL_BRANDON_ID = 'Brandon'
const SATRAD_SECTOR_LOCAL_BROWNSVILLE_ID = 'Brownsville'
const SATRAD_SECTOR_LOCAL_CABO_ID = 'Cabo'
const SATRAD_SECTOR_LOCAL_CALGARY_ID = 'Calgary'
const SATRAD_SECTOR_LOCAL_CAMPECHE_ID = 'Campeche'
const SATRAD_SECTOR_LOCAL_CAROLINA_ID = 'Carolina'
const SATRAD_SECTOR_LOCAL_CAYMAN_ID = 'Cayman'
const SATRAD_SECTOR_LOCAL_CEN_CALIFORNIA_ID = 'Cen_California'
const SATRAD_SECTOR_LOCAL_CEN_TEXAS_ID = 'Cen_Texas'
const SATRAD_SECTOR_LOCAL_CHIHUAHUA_ID = 'Chihuahua'
const SATRAD_SECTOR_LOCAL_CLOVIS_ID = 'Clovis'
const SATRAD_SECTOR_LOCAL_COLD_BAY_ID = 'ColdBay'
const SATRAD_SECTOR_LOCAL_COLORADO_ID = 'Colorado'
const SATRAD_SECTOR_LOCAL_COZUMEL_ID = 'Cozumel'
const SATRAD_SECTOR_LOCAL_DUTCH_HARBOR_ID = 'DutchHarbor'
const SATRAD_SECTOR_LOCAL_E_WASHINGTON_ID = 'E_Washington'
const SATRAD_SECTOR_LOCAL_FL_PANHANDLE_ID = 'FL_Panhandle'
const SATRAD_SECTOR_LOCAL_FAIRBANKS_ID = 'Fairbanksub'
const SATRAD_SECTOR_LOCAL_FARGO_ID = 'Fargo'
const SATRAD_SECTOR_LOCAL_FOUR_CORNERS_ID = 'Four_Corners'
const SATRAD_SECTOR_LOCAL_GEORGIA_ID = 'Georgia'
const SATRAD_SECTOR_LOCAL_GRAND_FORKS_ID = 'GrandForks'
const SATRAD_SECTOR_LOCAL_GULF_STREAM_ID = 'Gulf_Stream'
const SATRAD_SECTOR_LOCAL_HI_BIG_ISLAND_ID = 'HI_BigIsland'
const SATRAD_SECTOR_LOCAL_HI_CEN_ISL_ID = 'HI_CenIsl'
const SATRAD_SECTOR_LOCAL_HI_WRN_ISL_ID = 'HI_WrnIsl'
const SATRAD_SECTOR_LOCAL_HATTERAS_ID = 'Hatteras'
const SATRAD_SECTOR_LOCAL_HAVANA_ID = 'Havana'
const SATRAD_SECTOR_LOCAL_HISPANIOLA_ID = 'Hispaniola'
const SATRAD_SECTOR_LOCAL_HOUSTON_ID = 'Houston'
const SATRAD_SECTOR_LOCAL_INDIANA_ID = 'Indiana'
const SATRAD_SECTOR_LOCAL_IOWA_ID = 'Iowa'
const SATRAD_SECTOR_LOCAL_JACKSONVILLE_ID = 'Jacksonville'
const SATRAD_SECTOR_LOCAL_JAMAICA_ID = 'Jamaica'
const SATRAD_SECTOR_LOCAL_JUNEAU_ID = 'Juneau'
const SATRAD_SECTOR_LOCAL_KANSAS_ID = 'Kansas'
const SATRAD_SECTOR_LOCAL_KELWONA_ID = 'Kelowna'
const SATRAD_SECTOR_LOCAL_KENTUCKY_ID = 'Kentucky'
const SATRAD_SECTOR_LOCAL_KING_SALMON_ID = 'KingSalmon'
const SATRAD_SECTOR_LOCAL_LAKE_ERIE_ID = 'LakeErie'
const SATRAD_SECTOR_LOCAL_LAKE_HURON_ID = 'LakeHuron'
const SATRAD_SECTOR_LOCAL_LAKE_ONTARIO_ID = 'LakeOntario'
const SATRAD_SECTOR_LOCAL_LAKE_SUPERIOR_ID = 'LakeSuperior'
const SATRAD_SECTOR_LOCAL_LAWRENCE_ID = 'Lawrence'
const SATRAD_SECTOR_LOCAL_MADISON_ID = 'Madison'
const SATRAD_SECTOR_LOCAL_MICHIGAN_ID = 'Michigan'
const SATRAD_SECTOR_LOCAL_MID_BAJA_ID = 'Mid_Baja'
const SATRAD_SECTOR_LOCAL_MISSISSIPPI_ID = 'Mississippi'
const SATRAD_SECTOR_LOCAL_MITTEN_CI_ID = 'Mitten_ci'
const SATRAD_SECTOR_LOCAL_MONTREAL_ID = 'Montreal'
const SATRAD_SECTOR_LOCAL_NC_VA_ID = 'NC_VA'
const SATRAD_SECTOR_LOCAL_NE_COLORADO_ID = 'NE_Colorado'
const SATRAD_SECTOR_LOCAL_NE_MONTANA_ID = 'NE_Montana'
const SATRAD_SECTOR_LOCAL_NE_OREGON_ID = 'NE_Oregon'
const SATRAD_SECTOR_LOCAL_NE_TEXAS_ID = 'NE_Texas'
const SATRAD_SECTOR_LOCAL_N_CALIFORNIA_ID = 'N_California'
const SATRAD_SECTOR_LOCAL_N_DAKOTA_ID = 'N_Dakota'
const SATRAD_SECTOR_LOCAL_N_ILLINOIS_ID = 'N_Illinois'
const SATRAD_SECTOR_LOCAL_N_LOUISIANA_ID = 'N_Louisiana'
const SATRAD_SECTOR_LOCAL_N_MINNESOTA_ID = 'N_Minnesota'
const SATRAD_SECTOR_LOCAL_N_MISSISSIPPI_ID = 'N_Mississippi'
const SATRAD_SECTOR_LOCAL_N_NEW_MEXICO_ID = 'N_New_Mexico'
const SATRAD_SECTOR_LOCAL_NEBRASKA_ID = 'Nebraska'
const SATRAD_SECTOR_LOCAL_NEVADA_ID = 'Nevada'
const SATRAD_SECTOR_LOCAL_NEW_BRUNSWICK_ID = 'New_Brunswick'
const SATRAD_SECTOR_LOCAL_NEW_JERSEY_ID = 'New_Jersey'
const SATRAD_SECTOR_LOCAL_NEW_ORLEANS_ID = 'New_Orleans'
const SATRAD_SECTOR_LOCAL_NEWFOUNDLAND_ID = 'Newfoundland'
const SATRAD_SECTOR_LOCAL_NOME_ID = 'Nome'
const SATRAD_SECTOR_LOCAL_NOVA_SCOTIA_ID = 'Nova_Scotia'
const SATRAD_SECTOR_LOCAL_NUEVO_LEON_ID = 'Nuevo_Leon'
const SATRAD_SECTOR_LOCAL_OHIO_ID = 'Ohio'
const SATRAD_SECTOR_LOCAL_OKLAHOMA_ID = 'Oklahoma'
const SATRAD_SECTOR_LOCAL_ORLANDO_ID = 'Orlando'
const SATRAD_SECTOR_LOCAL_QUEBEC_ID = 'Quebec'
const SATRAD_SECTOR_LOCAL_PACNW_ID = 'PacNW'
const SATRAD_SECTOR_LOCAL_PHOENIX_ID = 'Phoenix'
const SATRAD_SECTOR_LOCAL_PORTLAND_ID = 'Portland'
const SATRAD_SECTOR_LOCAL_PUERTO_RICO_ID = 'PuertoRico'
const SATRAD_SECTOR_LOCAL_REGINA_ID = 'Regina'
const SATRAD_SECTOR_LOCAL_RHODE_ISLAND_ID = 'Rhode_Island'
const SATRAD_SECTOR_LOCAL_SE_COAST_ID = 'SE_Coast'
const SATRAD_SECTOR_LOCAL_SE_COLORADO_ID = 'SE_Colorado'
const SATRAD_SECTOR_LOCAL_SE_MONTANA_ID = 'SE_Montana'
const SATRAD_SECTOR_LOCAL_SE_ONTARIO_ID = 'SE_Ontario'
const SATRAD_SECTOR_LOCAL_SW_MISSOURI_ID = 'SW_Missouri'
const SATRAD_SECTOR_LOCAL_SW_TEXAS_ID = 'SW_Texas'
const SATRAD_SECTOR_LOCAL_SW_UTAH_ID = 'SW_Utah'
const SATRAD_SECTOR_LOCAL_S_CALIFORNIA_ID = 'S_California'
const SATRAD_SECTOR_LOCAL_S_DAKOTA_ID = 'S_Dakota'
const SATRAD_SECTOR_LOCAL_S_FLORIDA_ID = 'S_Florida'
const SATRAD_SECTOR_LOCAL_S_IDAHO_ID = 'S_Idaho'
const SATRAD_SECTOR_LOCAL_S_ILLINOIS_ID = 'S_Illinois'
const SATRAD_SECTOR_LOCAL_S_MAINE_ID = 'S_Maine'
const SATRAD_SECTOR_LOCAL_S_MINNESOTA_ID = 'S_Minnesota'
const SATRAD_SECTOR_LOCAL_S_OREGON_ID = 'S_Oregon'
const SATRAD_SECTOR_LOCAL_SAINT_PAUL_ID = 'SaintPaul'
const SATRAD_SECTOR_LOCAL_SALT_LAKE_ID = 'Salt_Lake'
const SATRAD_SECTOR_LOCAL_SEATTLE_ID = 'Seattle'
const SATRAD_SECTOR_LOCAL_SERRANIAS_DEL_BURRO_ID = 'Serranias_del_Burro'
const SATRAD_SECTOR_LOCAL_SONORA_ID = 'Sonora'
const SATRAD_SECTOR_LOCAL_SOUX_FALLS_ID = 'Souix_Falls'
const SATRAD_SECTOR_LOCAL_TAHOE_ID = 'Tahoe'
const SATRAD_SECTOR_LOCAL_TENNESSEE_ID = 'Tennessee'
const SATRAD_SECTOR_LOCAL_TRI_STATE_ID = 'Tri_State'
const SATRAD_SECTOR_LOCAL_TURKS_AND_CAICOS_ID = 'Turks_and_Caicos'
const SATRAD_SECTOR_LOCAL_UP_ID = 'UP'
const SATRAD_SECTOR_LOCAL_UNALAKLEET_ID = 'Unalakleet'
const SATRAD_SECTOR_LOCAL_UTQIAGVIK_ID = 'Utqiagvik'
const SATRAD_SECTOR_LOCAL_VERMONT_ID = 'Vermont'
const SATRAD_SECTOR_LOCAL_VIRGINIA_ID = 'Virginia'
const SATRAD_SECTOR_LOCAL_W_MONTANA_ID = 'W_Montana'
const SATRAD_SECTOR_LOCAL_W_VIRGINIA_ID = 'W_Virginia'
const SATRAD_SECTOR_LOCAL_WHITE_SANDS_ID = 'White_Sands'
const SATRAD_SECTOR_LOCAL_WICHITA_FALLS_ID = 'Wichita_Falls'
const SATRAD_SECTOR_LOCAL_WINNIPEG_ID = 'Winnipeg'
const SATRAD_SECTOR_LOCAL_WISCONSIN_ID = 'Wisconsin'
const SATRAD_SECTOR_LOCAL_WYOMING_ID = 'Wyoming'
const SATRAD_SECTOR_LOCAL_YAKUTAT_ID = 'Yakutat'
const SATRAD_SECTOR_LOCAL_YELLOWSTONE_ID = 'Yellowstone'
const SATRAD_SECTOR_LOCAL_YUCATAN_ID = 'Yucatan'
const SATRAD_SECTOR_LOCAL_CA_ST_JOHNS_ID = 'ca_stjohns'
const SATRAD_SECTOR_LOCAL_CEN_CALIFORNIA_ID = 'Cen_Californ'
const SATRAD_SECTOR_LOCAL_N_MISSISSIPPI_ID = 'N_Mississipp'
const SATRAD_SECTOR_LOCAL_NEW_BRUNSWICK_ID = 'New_Brunswic'
const SATRAD_SECTOR_LOCAL_SERRANIAS_DEL_BURRO_ID = 'Serranias_de'
const SATRAD_SECTOR_LOCAL_TURKS_AND_CAICOS_ID = 'Turks_and_Ca'
const SATRAD_SECTOR_LOCAL_WICHITA_FALLS_ID = 'Wichita_Fall'
