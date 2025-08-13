export const SATRAD_PRODUCT_ABI_01_ID = '01'
export const SATRAD_PRODUCT_ABI_02_ID = '02'
export const SATRAD_PRODUCT_ABI_03_ID = '03'
export const SATRAD_PRODUCT_ABI_04_ID = '04'
export const SATRAD_PRODUCT_ABI_05_ID = '05'
export const SATRAD_PRODUCT_ABI_06_ID = '06'
export const SATRAD_PRODUCT_ABI_07_ID = '07'
export const SATRAD_PRODUCT_ABI_08_ID = '08'
export const SATRAD_PRODUCT_ABI_09_ID = '09'
export const SATRAD_PRODUCT_ABI_10_ID = '10'
export const SATRAD_PRODUCT_ABI_11_ID = '11'
export const SATRAD_PRODUCT_ABI_12_ID = '12'
export const SATRAD_PRODUCT_ABI_13_ID = '13'
export const SATRAD_PRODUCT_ABI_14_ID = '14'
export const SATRAD_PRODUCT_ABI_15_ID = '15'
export const SATRAD_PRODUCT_ABI_16_ID = '16'
export const SATRAD_PRODUCT_TRUE_COLOR_ID = 'truecolor'
export const SATRAD_PRODUCT_NATURAL_COLOR_ID = 'natcolor'
export const SATRAD_PRODUCT_NATURAL_COLOR_FIRE_ID = 'natcolorfire'
export const SATRAD_PRODUCT_AIRMASS_ID = 'airmass'
export const SATRAD_PRODUCT_NIGHT_TIME_MICRO_ID = 'ntmicro'
export const SATRAD_PRODUCT_DAY_CLOUD_PHASE_ID = 'dcphase'
export const SATRAD_PRODUCT_SIMPLE_WATER_VAPOR_ID = 'simplewv'
export const SATRAD_PRODUCT_INFRARED_SANDWICH_ID = 'sandwich'
export const SATRAD_PRODUCT_COMPOSITE_RADAR_ID = 'radar'

export const DEFAULT_SATRAD_PRODUCT = SATRAD_PRODUCT_TRUE_COLOR_ID

export const SATRAD_PRODUCTS = {
	[SATRAD_PRODUCT_ABI_01_ID]: {
		label: '01: Visible (blue)',
		shortLabel: '01: Visible (blue)',
		infoId: 'fkhcgyia8jxy1km2ix995lre',
	},
	[SATRAD_PRODUCT_ABI_02_ID]: {
		label: '02: Visible (red)',
		shortLabel: '02: Visible (red)',
		infoId: 'vdvffisgz0epy5vw6aqg7jml',
	},
	[SATRAD_PRODUCT_ABI_03_ID]: {
		label: '03: Veggie (green)',
		shortLabel: '03: Veggie',
		infoId: 'y9ntd5sjuck1gegqug6nppbt',
	},
	[SATRAD_PRODUCT_ABI_04_ID]: {
		label: '04: Cirrus (Near IR)',
		shortLabel: '04: Cirrus',
		infoId: 'xvqk2y4fdnqe7okqvcfhq8fm',
	},
	[SATRAD_PRODUCT_ABI_05_ID]: {
		label: '05: Snow/Ice (Near IR)',
		shortLabel: '05: Snow/Ice',
		infoId: 'wdt8duw2g3hwoukar72x6744',
	},
	[SATRAD_PRODUCT_ABI_06_ID]: {
		label: '06: Particle Size (Near IR)',
		shortLabel: '06: Particle Size',
		infoId: 'edxg6wtxk45de9bjkjay2u0s',
	},
	[SATRAD_PRODUCT_ABI_07_ID]: {
		label: '07: Shortwave IR',
		shortLabel: '07: Shortwave IR',
		infoId: 'q0zos4zr3b4hpi9hzq5ve281',
	},
	[SATRAD_PRODUCT_ABI_08_ID]: {
		label: '08: Upper-Level Water Vapor',
		shortLabel: '08: UL H20 Vapor',
		infoId: 'chwykpj6amsilke8grtl376i',
	},
	[SATRAD_PRODUCT_ABI_09_ID]: {
		label: '09: Mid-Level Water Vapor',
		shortLabel: '09: ML H20 Vapor',
	},
	[SATRAD_PRODUCT_ABI_10_ID]: {
		label: '10: Low-Level Water Vapor',
		shortLabel: '10: LL H20 Vapor',
	},
	[SATRAD_PRODUCT_ABI_11_ID]: {
		label: '11: Cloud Top Phase',
		shortLabel: '11: CLD Top Phase',
	},
	[SATRAD_PRODUCT_ABI_12_ID]: {
		label: '12: Ozone',
		shortLabel: '12: Ozone',
	},
	[SATRAD_PRODUCT_ABI_13_ID]: {
		label: '13: Longwave IR (Clean)',
		shortLabel: '13: LWIR (Clean)',
	},
	[SATRAD_PRODUCT_ABI_14_ID]: {
		label: '14: Longwave IR',
		shortLabel: '14: Longwave IR',
	},
	[SATRAD_PRODUCT_ABI_15_ID]: {
		label: '15: Longwave IR (Dirty)',
		shortLabel: '15: LWIR (Dirty)',
	},
	[SATRAD_PRODUCT_ABI_16_ID]: {
		label: '16: Carbon Dioxide',
		shortLabel: '16: Carbon Dioxide',
	},
	[SATRAD_PRODUCT_TRUE_COLOR_ID]: {
		label: 'True Color',
		shortLabel: 'True Color',
	},
	[SATRAD_PRODUCT_NATURAL_COLOR_ID]: {
		label: 'Natural Color',
		shortLabel: 'Natural Color',
	},
	[SATRAD_PRODUCT_NATURAL_COLOR_FIRE_ID]: {
		label: 'Natural Color (Fire)',
		shortLabel: 'Nat. Color (Fire)',
	},
	[SATRAD_PRODUCT_AIRMASS_ID]: {
		label: 'Airmass',
		shortLabel: 'Airmass',
	},
	[SATRAD_PRODUCT_NIGHT_TIME_MICRO_ID]: {
		label: 'Night-time Microphysics',
		shortLabel: 'NT Microphysics',
	},
	[SATRAD_PRODUCT_DAY_CLOUD_PHASE_ID]: {
		label: 'Day Cloud Phase',
		shortLabel: 'Day Cloud Phase',
	},
	[SATRAD_PRODUCT_SIMPLE_WATER_VAPOR_ID]: {
		label: 'Simple Water Vapor',
		shortLabel: 'Simple WV',
	},
	[SATRAD_PRODUCT_INFRARED_SANDWICH_ID]: {
		label: 'Infrared Sandwich',
		shortLabel: 'Infrared Sandwich',
	},
	[SATRAD_PRODUCT_COMPOSITE_RADAR_ID]: {
		label: 'Composite Radar',
		shortLabel: 'Composite Radar',
	},
}

export const SATRAD_PRODUCT_GROUP_ABI = 'ABI'
export const SATRAD_PRODUCT_GROUP_RADAR = 'Radar'
export const SATRAD_PRODUCT_GROUP_RGB = 'RGB'

export const ALL_SATRAD_GROUPS = [SATRAD_PRODUCT_GROUP_ABI, SATRAD_PRODUCT_GROUP_RADAR, SATRAD_PRODUCT_GROUP_RGB]

export const SATRAD_GROUPS = {
	[SATRAD_PRODUCT_GROUP_ABI]: {
		label: 'ABI Bands',
		columns: 1,
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
		columns: 1,
		products: [SATRAD_PRODUCT_COMPOSITE_RADAR_ID],
	},
	[SATRAD_PRODUCT_GROUP_RGB]: {
		label: 'RGB Color Products',
		columns: 1,
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
