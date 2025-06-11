export const FORECAST_SECTOR_US_ID = 'US'
export const FORECAST_SECTOR_NORTH_AMERICA_ID = 'NA'
export const FORECAST_SECTOR_WORLD_ID = 'WLD'
export const FORECAST_SECTOR_ATLANTIC_OCEAN_ID = 'AO'
export const FORECAST_SECTOR_PACIFIC_OCEAN_ID = 'PO'
export const FORECAST_SECTOR_CANADA_ID = 'CA'
export const FORECAST_SECTOR_WESTERN_CANADA_ID = 'WCAN'
export const FORECAST_SECTOR_ALASKA_ID = 'AK'
export const FORECAST_SECTOR_NORTHWEST_ID = 'NW'
export const FORECAST_SECTOR_SOUTHWEST_ID = 'SW'
export const FORECAST_SECTOR_SOUTHEAST_ID = 'SE'
export const FORECAST_SECTOR_NORTHEAST_ID = 'NE'
export const FORECAST_SECTOR_GREAT_BASIN_ID = 'GBSN'
export const FORECAST_SECTOR_MID_ATLANTIC_ID = 'MA'
export const FORECAST_SECTOR_GREAT_LAKES_ID = 'GL'
export const FORECAST_SECTOR_MIDWEST_ID = 'MW'
export const FORECAST_SECTOR_NORTHERN_GREAT_PLAINS_ID = 'NGP'
export const FORECAST_SECTOR_CENTRAL_GREAT_PLAINS_ID = 'CGP'
export const FORECAST_SECTOR_SOUTHERN_GREAT_PLAINS_ID = 'SGP'
export const FORECAST_SECTOR_NORTHERN_ILLINOIS_ID = 'NIL'
export const FORECAST_SECTOR_DENVER_ID = 'DEN'
export const FORECAST_SECTOR_OKLAHOMA_CITY_ID = 'OKC'
export const FORECAST_SECTOR_DUGWAY_ID = 'DPG'
export const FORECAST_SECTOR_FLOAT_ONE_ID = 'FLT1'
export const FORECAST_SECTOR_FLOAT_TWO_ID = 'FLT2'
export const FORECAST_SECTOR_FLOAT_THREE_ID = 'FLT3'

export const DEFAULT_FORECAST_SECTOR = FORECAST_SECTOR_US_ID

export const FORECAST_SECTORS = {
	[FORECAST_SECTOR_US_ID]: {
		id: 'US',
		name: 'Continental U.S.',
		type: 'Geobox',
		coordinates: [
			[-128, 20],
			[-65, 57],
		],
		alternateSectors: ['MW'],
	},
	[FORECAST_SECTOR_NORTH_AMERICA_ID]: {
		id: 'NA',
		name: 'North America',
		type: 'Geobox',
		coordinates: [
			[-165, 8.5],
			[-48, 78],
		],
		alternateSectors: ['US', 'MW'],
	},
	[FORECAST_SECTOR_WORLD_ID]: {
		id: 'WLD',
		name: 'World',
		type: 'Geobox',
		coordinates: [
			[-300, -100],
			[60, 100],
		],
		alternateSectors: ['NA'],
	},
	[FORECAST_SECTOR_ATLANTIC_OCEAN_ID]: {
		id: 'AO',
		name: 'Atlantic Ocean',
		type: 'Geobox',
		coordinates: [
			[-110, 0],
			[3, 67],
		],
		alternateSectors: ['NA'],
	},
	[FORECAST_SECTOR_PACIFIC_OCEAN_ID]: {
		id: 'PO',
		name: 'Pacific Ocean',
		type: 'Geobox',
		coordinates: [
			[-225, 0],
			[-100, 74],
		],
		alternateSectors: ['NA'],
	},
	[FORECAST_SECTOR_CANADA_ID]: {
		id: 'CA',
		name: 'Canada',
		type: 'Geobox',
		coordinates: [
			[-138.8, 37.3],
			[-61.9, 82.8],
		],
		alternateSectors: ['WCAN', 'NA'],
	},
	[FORECAST_SECTOR_WESTERN_CANADA_ID]: {
		id: 'WCAN',
		name: 'Western Canada',
		type: 'Geobox',
		coordinates: [
			[-132.5, 45.1],
			[-106, 60.7],
		],
		alternateSectors: ['NW', 'US', 'NA'],
	},
	[FORECAST_SECTOR_ALASKA_ID]: {
		id: 'AK',
		name: 'Alaska',
		type: 'Geobox',
		coordinates: [
			[-180, 43],
			[-121, 78],
		],
		alternateSectors: ['WCAN', 'NA'],
	},
	[FORECAST_SECTOR_NORTHWEST_ID]: {
		id: 'NW',
		name: 'Northwest',
		type: 'Geobox',
		coordinates: [
			[-126.8, 40.3],
			[-105.5, 52.9],
		],
		alternateSectors: ['NA'],
	},
	[FORECAST_SECTOR_SOUTHWEST_ID]: {
		id: 'SW',
		name: 'Southwest',
		type: 'Geobox',
		coordinates: [
			[-123.1, 29.9],
			[-101.7, 42.5],
		],
		alternateSectors: ['GBSN', 'NA'],
	},
	[FORECAST_SECTOR_SOUTHEAST_ID]: {
		id: 'SE',
		name: 'Southeast',
		type: 'Geobox',
		coordinates: [
			[-98.5, 24.5],
			[-77.5, 36.92],
		],
		alternateSectors: ['MA'],
	},
	[FORECAST_SECTOR_NORTHEAST_ID]: {
		id: 'NE',
		name: 'Northeast',
		type: 'Geobox',
		coordinates: [
			[-84.1, 38.7],
			[-66, 49.3],
		],
		alternateSectors: ['US'],
	},
	[FORECAST_SECTOR_GREAT_BASIN_ID]: {
		id: 'GBSN',
		name: 'Great Basin',
		type: 'Geobox',
		coordinates: [
			[-129.5, 31.9],
			[-106.5, 45.5],
		],
		alternateSectors: ['SW', 'NA'],
	},
	[FORECAST_SECTOR_MID_ATLANTIC_ID]: {
		id: 'MA',
		name: 'Mid-Atlantic',
		type: 'Geobox',
		coordinates: [
			[-90.5, 31.6],
			[-69.5, 44],
		],
		alternateSectors: ['US'],
	},
	[FORECAST_SECTOR_GREAT_LAKES_ID]: {
		id: 'GL',
		name: 'Great Lakes',
		type: 'Geobox',
		coordinates: [
			[-95.5, 39.58],
			[-74.5, 52.0],
		],
		alternateSectors: ['MW'],
	},
	[FORECAST_SECTOR_MIDWEST_ID]: {
		id: 'MW',
		name: 'Midwest',
		type: 'Geobox',
		coordinates: [
			[-101, 34.55],
			[-80, 47],
		],
		alternateSectors: ['US'],
	},
	[FORECAST_SECTOR_NORTHERN_GREAT_PLAINS_ID]: {
		id: 'NGP',
		name: 'Northern Great Plains',
		type: 'Geobox',
		coordinates: [
			[-110.4, 41.7],
			[-89.2, 54.1],
		],
		alternateSectors: ['US'],
	},
	[FORECAST_SECTOR_CENTRAL_GREAT_PLAINS_ID]: {
		id: 'CGP',
		name: 'Central Great Plains',
		type: 'Geobox',
		coordinates: [
			[-111.7, 34.5],
			[-90.5, 47],
		],
		alternateSectors: ['US'],
	},
	[FORECAST_SECTOR_SOUTHERN_GREAT_PLAINS_ID]: {
		id: 'SGP',
		name: 'Southern Great Plains',
		type: 'Geobox',
		coordinates: [
			[-109, 25.5],
			[-85, 39.7],
		],
		alternateSectors: ['CGP'],
	},
	[FORECAST_SECTOR_NORTHERN_ILLINOIS_ID]: {
		id: 'NIL',
		name: 'Northern Illinois',
		type: 'Geobox',
		coordinates: [
			[-93.98, 38.13],
			[-83.9, 44.05],
		],
		alternateSectors: ['MW'],
	},
	[FORECAST_SECTOR_DENVER_ID]: {
		id: 'DEN',
		name: 'Denver, CO',
		type: 'Geobox',
		coordinates: [
			[-106, 38.8],
			[-101, 42.05],
		],
		alternateSectors: ['CGP'],
	},
	[FORECAST_SECTOR_OKLAHOMA_CITY_ID]: {
		id: 'OKC',
		name: 'Oklahoma City, OK',
		type: 'Geobox',
		coordinates: [
			[-102.5, 33.2],
			[94, 38.2],
		],
		alternateSectors: ['SGP'],
	},
	[FORECAST_SECTOR_DUGWAY_ID]: {
		id: 'DPG',
		name: 'Dugway (KDPG)',
		type: 'Geobox',
		coordinates: [
			[-114.8, 38.7],
			[-108.8, 42.2],
		],
		alternateSectors: ['GBSN', 'SW'],
	},
	[FORECAST_SECTOR_FLOAT_ONE_ID]: {
		id: 'FLT1',
		name: 'FLOAT 1',
		type: 'Geobox',
		coordinates: [
			[0, 0],
			[0, 0],
		], // Replace with actual values if needed
		alternateSectors: ['MW'],
	},
	[FORECAST_SECTOR_FLOAT_TWO_ID]: {
		id: 'FLT2',
		name: 'FLOAT 2',
		type: 'Geobox',
		coordinates: [
			[0, 0],
			[0, 0],
		], // Replace with actual values if needed
		alternateSectors: ['MW'],
	},
	[FORECAST_SECTOR_FLOAT_THREE_ID]: {
		id: 'FLT3',
		name: 'ICECHIP',
		type: 'Geobox',
		coordinates: [
			[0, 0],
			[0, 0],
		], // Replace with actual values if needed
		alternateSectors: ['MW'],
	},
}

export const ALL_FORECAST_SECTORS = Object.keys(FORECAST_SECTORS).map((sectorId) => sectorId)
