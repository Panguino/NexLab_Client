const XSECT_SECTOR_DRT_BIS = 'drt-bis'
const XSECT_SECTOR_ABQ_BNA = 'abq-bna'
const XSECT_SECTOR_CRP_RIW = 'crp-riw'
const XSECT_SECTOR_DEN_ILN = 'den-iln'
const XSECT_SECTOR_DRT_GRB = 'drt-grb'
const XSECT_SECTOR_DRT_TLH = 'drt-tlh'
const XSECT_SECTOR_RIW_DTX = 'riw-dtx'
const XSECT_SECTOR_SIL_GRB = 'sil-grb'

const ALL_PRODUCTS = ['xsect']

export const ALL_SECTORS = {
	[XSECT_SECTOR_DRT_BIS]: {
		name: 'Del Rio, TX to Bismark, ND',
		type: 'Line',
		coordinates: [
			[-100.9, 29.37],
			[-100.76, 46.81],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_ABQ_BNA]: {
		name: 'Albuquerque, NM to Nashville, TN',
		type: 'Line',
		coordinates: [
			[-106.6, 35.1],
			[-86.67, 36.13],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_CRP_RIW]: {
		name: 'Corpus Christi, TX to Riverton, WY',
		type: 'Line',
		coordinates: [
			[-97.5, 27.77],
			[-108.45, 43.06],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_DEN_ILN]: {
		name: 'Denver, CO to Willmington, OH',
		type: 'Line',
		coordinates: [
			[-104.67, 39.85],
			[-83.79, 39.43],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_DRT_GRB]: {
		name: 'Del Rio, TX to Green Bay, WI',
		type: 'Line',
		coordinates: [
			[-100.9, 29.37],
			[-88.12, 44.49],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_DRT_TLH]: {
		name: 'Del Rio, TX to Tallahassee, FL',
		type: 'Line',
		coordinates: [
			[-100.9, 29.37],
			[-84.34, 30.39],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_RIW_DTX]: {
		name: 'Riverton, WY to White Lake, MI',
		type: 'Line',
		coordinates: [
			[-108.45, 43.06],
			[-83.42, 42.66],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_SIL_GRB]: {
		name: 'Slidell, LA to Green Bay, WI',
		type: 'Line',
		coordinates: [
			[-89.82, 30.34],
			[-88.12, 44.49],
		],
		products: ALL_PRODUCTS,
	},
}
