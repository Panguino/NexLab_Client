import {
	UPPERAIR_PRODUCTS_250,
	UPPERAIR_PRODUCTS_300,
	UPPERAIR_PRODUCTS_500,
	UPPERAIR_PRODUCTS_700,
	UPPERAIR_PRODUCTS_850,
	UPPERAIR_PRODUCTS_925,
	UPPERAIR_PRODUCTS_CONTOUR,
} from './products'
export const UPPERAIR_LEVEL_250 = '250'
export const UPPERAIR_LEVEL_300 = '300'
export const UPPERAIR_LEVEL_500 = '500'
export const UPPERAIR_LEVEL_700 = '700'
export const UPPERAIR_LEVEL_850 = '850'
export const UPPERAIR_LEVEL_925 = '925'
export const UPPERAIR_LEVEL_CONTOUR = 'contour'
export const UPPERAIR_LEVEL_DEFAULT = UPPERAIR_LEVEL_500

export const ALL_UPPERAIR_LEVEL_PRODUCTS = {
	[UPPERAIR_LEVEL_250]: {
		label: '250mb',
		columns: 2,
		products: UPPERAIR_PRODUCTS_250,
	},
	[UPPERAIR_LEVEL_300]: {
		label: '300mb',
		columns: 2,
		products: UPPERAIR_PRODUCTS_300,
	},
	[UPPERAIR_LEVEL_500]: {
		label: '500mb',
		columns: 2,
		products: UPPERAIR_PRODUCTS_500,
	},
	[UPPERAIR_LEVEL_700]: {
		label: '700mb',
		columns: 2,
		products: UPPERAIR_PRODUCTS_700,
	},
	[UPPERAIR_LEVEL_850]: {
		label: '850mb',
		columns: 2,
		products: UPPERAIR_PRODUCTS_850,
	},
	[UPPERAIR_LEVEL_925]: {
		label: '925mb',
		columns: 2,
		products: UPPERAIR_PRODUCTS_925,
	},
	[UPPERAIR_LEVEL_CONTOUR]: {
		label: 'Contour/Composites',
		columns: 1,
		products: UPPERAIR_PRODUCTS_CONTOUR,
	},
}
