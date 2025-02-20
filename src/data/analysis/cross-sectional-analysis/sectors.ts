import { DotColor, DotShape } from '@/data/d3Map/dotStyles'

const XSECT_SECTOR_DRT_BIS = 'drt-bis'
const XSECT_SECTOR_ABQ_BNA = 'abq-bna'
const XSECT_SECTOR_CRP_RIW = 'crp-riw'
const XSECT_SECTOR_DEN_ILN = 'den-iln'
const XSECT_SECTOR_DRT_GRB = 'drt-grb'
const XSECT_SECTOR_DRT_TLH = 'drt-tlh'
const XSECT_SECTOR_RIW_DTX = 'riw-dtx'
const XSECT_SECTOR_SIL_GRB = 'sil-grb'

const ALL_PRODUCTS = ['xsect']

export const ALL_CROSS_SECTORS = {
	[XSECT_SECTOR_DRT_BIS]: {
		name: 'Del Rio, TX to Bismark, ND',
		label: ['DRT', 'BIS'],
		type: 'Line',
		coordinates: [
			[-100.9, 29.37],
			[-100.76, 46.81],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_ABQ_BNA]: {
		name: 'Albuquerque, NM to Nashville, TN',
		label: ['ABQ', 'BNA'],
		type: 'Line',
		dotShape: DotShape.Cross,
		dotColor: DotColor.Blue,
		coordinates: [
			[-106.6, 35.1],
			[-86.67, 36.13],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_CRP_RIW]: {
		name: 'Corpus Christi, TX to Riverton, WY',
		label: ['CRP', 'RIW'],
		type: 'Line',
		coordinates: [
			[-97.5, 27.77],
			[-108.45, 43.06],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_DEN_ILN]: {
		name: 'Denver, CO to Willmington, OH',
		label: ['DEN', 'ILN'],
		type: 'Line',
		dotShape: DotShape.Square,
		dotColor: DotColor.Purple,
		coordinates: [
			[-104.67, 39.85],
			[-83.79, 39.43],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_DRT_GRB]: {
		name: 'Del Rio, TX to Green Bay, WI',
		label: ['DRT', 'GRB'],
		type: 'Line',
		coordinates: [
			[-100.9, 29.37],
			[-88.12, 44.49],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_DRT_TLH]: {
		name: 'Del Rio, TX to Tallahassee, FL',
		label: ['DRT', 'TLH'],
		type: 'Line',
		coordinates: [
			[-100.9, 29.37],
			[-84.34, 30.39],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_RIW_DTX]: {
		name: 'Riverton, WY to White Lake, MI',
		label: ['RIW', 'DTX'],
		type: 'Line',
		coordinates: [
			[-108.45, 43.06],
			[-83.42, 42.66],
		],
		products: ALL_PRODUCTS,
	},
	[XSECT_SECTOR_SIL_GRB]: {
		name: 'Slidell, LA to Green Bay, WI',
		label: ['SIL', 'GRB'],
		type: 'Line',
		coordinates: [
			[-89.82, 30.34],
			[-88.12, 44.49],
		],
		products: ALL_PRODUCTS,
	},
}
