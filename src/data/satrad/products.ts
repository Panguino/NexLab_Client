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

// need to break these into groups similar to nexrad

export const SATRAD_PRODUCTS = {
	[SATRAD_PRODUCT_ABI_01_ID]: {
		name: '01: Visible (blue)',
	},
	[SATRAD_PRODUCT_ABI_02_ID]: {
		name: '02: Visible (red)',
	},
	[SATRAD_PRODUCT_ABI_03_ID]: {
		name: '03: Veggie (green)',
	},
	[SATRAD_PRODUCT_ABI_04_ID]: {
		name: '04: Cirrus (Near IR)',
	},
	[SATRAD_PRODUCT_ABI_05_ID]: {
		name: '05: Snow/Ice (Near IR)',
	},
	[SATRAD_PRODUCT_ABI_06_ID]: {
		name: '06: Particle Size (Near IR)',
	},
	[SATRAD_PRODUCT_ABI_07_ID]: {
		name: '07: Shortwave IR',
	},
	[SATRAD_PRODUCT_ABI_08_ID]: {
		name: '08: Upper-Level Water Vapor',
	},
	[SATRAD_PRODUCT_ABI_09_ID]: {
		name: '09: Mid-Level Water Vapor',
	},
	[SATRAD_PRODUCT_ABI_10_ID]: {
		name: '10: Low-Level Water Vapor',
	},
	[SATRAD_PRODUCT_ABI_11_ID]: {
		name: '11: Cloud Top Phase',
	},
	[SATRAD_PRODUCT_ABI_12_ID]: {
		name: '12: Ozone',
	},
	[SATRAD_PRODUCT_ABI_13_ID]: {
		name: '13: Longwave IR (Clean)',
	},
	[SATRAD_PRODUCT_ABI_14_ID]: {
		name: '14: Longwave IR',
	},
	[SATRAD_PRODUCT_ABI_15_ID]: {
		name: '15: Longwave IR (Dirty)',
	},
	[SATRAD_PRODUCT_ABI_16_ID]: {
		name: '16: Carbon Dioxide',
	},
	[SATRAD_PRODUCT_TRUE_COLOR_ID]: {
		name: 'True Color',
	},
	[SATRAD_PRODUCT_NATURAL_COLOR_ID]: {
		name: 'Natural Color',
	},
	[SATRAD_PRODUCT_NATURAL_COLOR_FIRE_ID]: {
		name: 'Natural Color (Fire)',
	},
	[SATRAD_PRODUCT_AIRMASS_ID]: {
		name: 'Airmass',
	},
	[SATRAD_PRODUCT_NIGHT_TIME_MICRO_ID]: {
		name: 'Night Microphysics',
	},
	[SATRAD_PRODUCT_DAY_CLOUD_PHASE_ID]: {
		name: 'Day Cloud Phase',
	},
	[SATRAD_PRODUCT_SIMPLE_WATER_VAPOR_ID]: {
		name: 'Simple Water Vapor',
	},
	[SATRAD_PRODUCT_INFRARED_SANDWICH_ID]: {
		name: 'Infrared Sandwich',
	},
	[SATRAD_PRODUCT_COMPOSITE_RADAR_ID]: {
		name: 'Composite Radar',
	},
}
