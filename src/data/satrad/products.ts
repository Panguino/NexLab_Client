const SATRAD_PRODUCT_ABI_01_ID = '01'
const SATRAD_PRODUCT_ABI_02_ID = '02'
const SATRAD_PRODUCT_ABI_03_ID = '03'
const SATRAD_PRODUCT_ABI_04_ID = '04'
const SATRAD_PRODUCT_ABI_05_ID = '05'
const SATRAD_PRODUCT_ABI_06_ID = '06'
const SATRAD_PRODUCT_ABI_07_ID = '07'
const SATRAD_PRODUCT_ABI_08_ID = '08'
const SATRAD_PRODUCT_ABI_09_ID = '09'
const SATRAD_PRODUCT_ABI_10_ID = '10'
const SATRAD_PRODUCT_ABI_11_ID = '11'
const SATRAD_PRODUCT_ABI_12_ID = '12'
const SATRAD_PRODUCT_ABI_13_ID = '13'
const SATRAD_PRODUCT_ABI_14_ID = '14'
const SATRAD_PRODUCT_ABI_15_ID = '15'
const SATRAD_PRODUCT_ABI_16_ID = '16'
const SATRAD_PRODUCT_TRUE_COLOR_ID = 'truecolor'
const SATRAD_PRODUCT_NATURAL_COLOR_ID = 'natcolor'
const SATRAD_PRODUCT_NATURAL_COLOR_FIRE_ID = 'natcolorfire'
const SATRAD_PRODUCT_AIRMASS_ID = 'airmass'
const SATRAD_PRODUCT_NIGHT_TIME_MICRO_ID = 'ntmicro'
const SATRAD_PRODUCT_DAY_CLOUD_PHASE_ID = 'dcphase'
const SATRAD_PRODUCT_SIMPLE_WATER_VAPOR_ID = 'simplewv'
const SATRAD_PRODUCT_INFRARED_SANDWICH_ID = 'sandwich'
const SATRAD_PRODUCT_COMPOSITE_RADAR_ID = 'comp_radar'

export const SATRAD_PRODUCTS = {
	[SATRAD_PRODUCT_ABI_01_ID]: {
		label: '01: Visible (blue)',
	},
	[SATRAD_PRODUCT_ABI_02_ID]: {
		label: '02: Visible (red)',
	},
	[SATRAD_PRODUCT_ABI_03_ID]: {
		label: '03: Veggie (green)',
	},
	[SATRAD_PRODUCT_ABI_04_ID]: {
		label: '04: Cirrus (Near IR)',
	},
	[SATRAD_PRODUCT_ABI_05_ID]: {
		label: '05: Snow/Ice (Near IR)',
	},
	[SATRAD_PRODUCT_ABI_06_ID]: {
		label: '06: Particle Size (Near IR)',
	},
	[SATRAD_PRODUCT_ABI_07_ID]: {
		label: '07: Shortwave IR',
	},
	[SATRAD_PRODUCT_ABI_08_ID]: {
		label: '08: Upper-Level Water Vapor',
	},
	[SATRAD_PRODUCT_ABI_09_ID]: {
		label: '09: Mid-Level Water Vapor',
	},
	[SATRAD_PRODUCT_ABI_10_ID]: {
		label: '10: Low-Level Water Vapor',
	},
	[SATRAD_PRODUCT_ABI_11_ID]: {
		label: '11: Cloud Top Phase',
	},
	[SATRAD_PRODUCT_ABI_12_ID]: {
		label: '12: Ozone',
	},
	[SATRAD_PRODUCT_ABI_13_ID]: {
		label: '13: Longwave IR (Clean)',
	},
	[SATRAD_PRODUCT_ABI_14_ID]: {
		label: '14: Longwave IR',
	},
	[SATRAD_PRODUCT_ABI_15_ID]: {
		label: '15: Longwave IR (Dirty)',
	},
	[SATRAD_PRODUCT_ABI_16_ID]: {
		label: '16: Carbon Dioxide',
	},
	[SATRAD_PRODUCT_TRUE_COLOR_ID]: {
		label: 'True Color',
	},
	[SATRAD_PRODUCT_NATURAL_COLOR_ID]: {
		label: 'Natural Color',
	},
	[SATRAD_PRODUCT_NATURAL_COLOR_FIRE_ID]: {
		label: 'Natural Color (Fire)',
	},
	[SATRAD_PRODUCT_AIRMASS_ID]: {
		label: 'Airmass',
	},
	[SATRAD_PRODUCT_NIGHT_TIME_MICRO_ID]: {
		label: 'Night Microphysics',
	},
	[SATRAD_PRODUCT_DAY_CLOUD_PHASE_ID]: {
		label: 'Day Cloud Phase',
	},
	[SATRAD_PRODUCT_SIMPLE_WATER_VAPOR_ID]: {
		label: 'Simple Water Vapor',
	},
	[SATRAD_PRODUCT_INFRARED_SANDWICH_ID]: {
		label: 'Infrared Sandwich',
	},
	[SATRAD_PRODUCT_COMPOSITE_RADAR_ID]: {
		label: 'Composite Radar',
	},
}

export const SATRAD_PRODUCT_GROUP_ABI = 'ABI'
export const SATRAD_PRODUCT_GROUP_RADAR = 'Radar'
export const SATRAD_PRODUCT_GROUP_RGB = 'RGB'

export const ALL_SATRAD_GROUPS = [SATRAD_PRODUCT_GROUP_ABI, SATRAD_PRODUCT_GROUP_RADAR, SATRAD_PRODUCT_GROUP_RGB]

export const SATRAD_GROUPS = {
	[SATRAD_PRODUCT_GROUP_ABI]: {
		label: 'ABI Bands',
		columns: 2,
		products: [
			SATRAD_PRODUCT_ABI_01_ID,
			SATRAD_PRODUCT_ABI_02_ID,
			SATRAD_PRODUCT_ABI_03_ID,
			SATRAD_PRODUCT_ABI_04_ID,
			SATRAD_PRODUCT_ABI_05_ID,
			SATRAD_PRODUCT_ABI_06_ID,
			SATRAD_PRODUCT_ABI_07_ID,
			SATRAD_PRODUCT_ABI_08_ID,
			SATRAD_PRODUCT_ABI_09_ID,
			SATRAD_PRODUCT_ABI_10_ID,
			SATRAD_PRODUCT_ABI_11_ID,
			SATRAD_PRODUCT_ABI_12_ID,
			SATRAD_PRODUCT_ABI_13_ID,
			SATRAD_PRODUCT_ABI_14_ID,
			SATRAD_PRODUCT_ABI_15_ID,
			SATRAD_PRODUCT_ABI_16_ID,
		],
	},
	[SATRAD_PRODUCT_GROUP_RADAR]: {
		label: 'Composite Radar',
		columns: 2,
		products: [SATRAD_PRODUCT_COMPOSITE_RADAR_ID],
	},
	[SATRAD_PRODUCT_GROUP_RGB]: {
		label: 'RGB Color Products',
		columns: 2,
		products: [
			SATRAD_PRODUCT_TRUE_COLOR_ID,
			SATRAD_PRODUCT_NATURAL_COLOR_ID,
			SATRAD_PRODUCT_NATURAL_COLOR_FIRE_ID,
			SATRAD_PRODUCT_AIRMASS_ID,
			SATRAD_PRODUCT_NIGHT_TIME_MICRO_ID,
			SATRAD_PRODUCT_DAY_CLOUD_PHASE_ID,
			SATRAD_PRODUCT_SIMPLE_WATER_VAPOR_ID,
			SATRAD_PRODUCT_INFRARED_SANDWICH_ID,
		],
	},
}
