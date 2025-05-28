import { SATRAD_PRODUCTS } from './products'

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
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_EQUATORIAL_ID]: {
		name: 'GOES East Equatorial',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_FULL_DISK_ID]: {
		name: 'GOES East Full Disk',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_FULL_DISK_LARGE_ID]: {
		name: 'GOES East Full Disk Large',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_HALF_DISK_NORTH_ID]: {
		name: 'GOES East Half Disk North',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 25.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 25.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_HALF_DISK_SOUTH_ID]: {
		name: 'GOES East Half Disk South',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, -25.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, -25.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_NORTHERN_HEMISPHERE_ID]: {
		name: 'GOES East Northern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, 50.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, 50.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_SOUTHERN_HEMISPHERE_ID]: {
		name: 'GOES East Southern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-75.0 + global_longitude_modifier, -50.0 - global_latitude_modifier],
			[-75.0 - global_longitude_modifier, -50.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_ATLANTIC_ID]: {
		name: 'Atlantic',
		type: 'Geobox',
		coordinates: [
			[-55.0 + global_longitude_modifier, 24 - global_latitude_modifier],
			[-55.0 - global_longitude_modifier, 24 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_SOUTH_ATLANTIC_ID]: {
		name: 'South Atlantic',
		type: 'Geobox',
		coordinates: [
			[-45.0 + global_longitude_modifier, -14.0 - global_latitude_modifier],
			[-45.0 - global_longitude_modifier, -14.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_NORTH_AMERICA_ID]: {
		name: 'North America',
		type: 'Geobox',
		coordinates: [
			[-96.0 + global_longitude_modifier, 41.5 - global_latitude_modifier],
			[-96.0 - global_longitude_modifier, 41.5 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_SOUTH_AMERICA_ID]: {
		name: 'South America',
		type: 'Geobox',
		coordinates: [
			[-60.0 + global_longitude_modifier, -27.0 - global_latitude_modifier],
			[-60.0 - global_longitude_modifier, -27.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_EAST_SOUTH_PACIFIC_ID]: {
		name: 'GOES East South Pacific',
		type: 'Geobox',
		coordinates: [
			[-115.0 + global_longitude_modifier, -30.0 - global_latitude_modifier],
			[-115.0 - global_longitude_modifier, -30.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
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
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_FULL_DISK_ID]: {
		name: 'GOES West Full Disk',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_FULL_DISK_LARGE_ID]: {
		name: 'GOES West Full Disk Large',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 0.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 0.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_HALF_DISK_NORTH_ID]: {
		name: 'GOES West Half Disk North',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 25.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 25.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_HALF_DISK_SOUTH_ID]: {
		name: 'GOES West Half Disk South',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, -25.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, -25.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTHERN_HEMISPHERE_ID]: {
		name: 'GOES West Northern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, 50.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, 50.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_SOUTHERN_HEMISPHERE_ID]: {
		name: 'GOES West Southern Hemisphere',
		type: 'Geobox',
		coordinates: [
			[-135.0 + global_longitude_modifier, -50.0 - global_latitude_modifier],
			[-135.0 - global_longitude_modifier, -50.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTH_PACIFIC_ID]: {
		name: 'GOES West North Pacific',
		type: 'Geobox',
		coordinates: [
			[-170.0 + global_longitude_modifier, 30.0 - global_latitude_modifier],
			[-170.0 - global_longitude_modifier, 30.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_NORTH_PACIFIC_LARGE_ID]: {
		name: 'GOES West North Pacific Large',
		type: 'Geobox',
		coordinates: [
			[-170.0 + global_longitude_modifier, 30.0 - global_latitude_modifier],
			[-170.0 - global_longitude_modifier, 30.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_GLOBAL_GOES_WEST_SOUTHWEST_PACIFIC_ID]: {
		name: 'GOES West South Pacific',
		type: 'Geobox',
		coordinates: [
			[-170.0 + global_longitude_modifier, -30.0 - global_latitude_modifier],
			[-170.0 - global_longitude_modifier, -30.0 + global_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
}
