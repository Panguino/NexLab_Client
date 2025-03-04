import { DotColor, DotShape } from '@/data/d3Map/dotStyles'
import { ALL_SURFACE_PRODUCTS, SURFACE_PRODUCT_RAW } from './products'

const SECTOR_US = 'US'
const SECTOR_CANADA = 'Canada'
const SECTOR_EAST_CANADA = 'caneast'
const SECTOR_NORTHEAST_US = 'northeast'
const SECTOR_SOUTHEAST_US = 'southeast'
const SECTOR_MIDWEST_US = 'midwest'
const SECTOR_GULF_COAST = 'gulfcoast'
const SECTOR_TORNADO_ALLEY = 'toralley'
const SECTOR_CENTRAL_PLAINS = 'siouxland'
const SECTOR_NORTHERN_GREAT_PLAINS = 'nrnplains'
const SECTOR_CENTRAL_GREAT_PLAINS = 'cntrlplains'
const SECTOR_SOUTHERN_GREAT_PLAINS = 'srnplains'
const SECTOR_CANADIAN_PRAIRIES = 'canprairies'
const SECTOR_NORTHWEST_US = 'northwest'
const SECTOR_SOUTHWEST_US = 'southwest'

const SECTOR_CHI_METRO = 'chi'
const SECTOR_SF_BAY = 'sfbay'
const SECTOR_ALABAMA = 'al'
const SECTOR_ALASKA = 'ak'
const SECTOR_ARIZONA = 'az'
const SECTOR_ARKANSAS = 'ar'
const SECTOR_CALIFORNIA = 'ca'
const SECTOR_COLORADO = 'co'
const SECTOR_CONNECTICUT = 'ct'
const SECTOR_DELAWARE = 'de'
const SECTOR_FLORIDA = 'fl'
const SECTOR_GEORGIA = 'ga'
const SECTOR_HAWAII = 'hi'
const SECTOR_IOWA = 'ia'
const SECTOR_IDAHO = 'id'
const SECTOR_ILLINOIS = 'il'
const SECTOR_INDIANA = 'in'
const SECTOR_KANSAS = 'ks'
const SECTOR_KENTUCKY = 'ky'
const SECTOR_LOUISIANA = 'la'
const SECTOR_MAINE = 'me'
const SECTOR_MARYLAND = 'md'
const SECTOR_MASSACHUSETTS = 'ma'
const SECTOR_MICHIGAN = 'mi'
const SECTOR_MINNESOTA = 'mn'
const SECTOR_MISSOURI = 'mo'
const SECTOR_MISSISSIPPI = 'ms'
const SECTOR_MONTANA = 'mt'
const SECTOR_NORTH_CAROLINA = 'nc'
const SECTOR_NORTH_DAKOTA = 'nd'
const SECTOR_NEBRASKA = 'ne'
const SECTOR_NEW_HAMPSHIRE = 'nh'
const SECTOR_NEW_JERSEY = 'nj'
const SECTOR_NEW_MEXICO = 'nm'
const SECTOR_NEVADA = 'nv'
const SECTOR_NEW_YORK = 'ny'
const SECTOR_OHIO = 'oh'
const SECTOR_OKLAHOMA = 'ok'
const SECTOR_OREGON = 'or'
const SECTOR_PENNSYLVANIA = 'pa'
const SECTOR_RHODE_ISLAND = 'ri'
const SECTOR_SOUTH_CAROLINA = 'sc'
const SECTOR_SOUTH_DAKOTA = 'sd'
const SECTOR_TENNESSEE = 'tn'
const SECTOR_TEXAS = 'tx'
const SECTOR_UTAH = 'ut'
const SECTOR_VIRGINIA = 'va'
const SECTOR_VERMONT = 'vt'
const SECTOR_WASHINGTON = 'wa'
const SECTOR_WISCONSIN = 'wi'
const SECTOR_WEST_VIRGINIA = 'wv'
const SECTOR_WYOMING = 'wy'

export const LARGE_SURFACE_SECTORS = {
	[SECTOR_US]: {
		name: 'United States',
		type: 'Geobox',
		coordinates: [
			[-140, 10],
			[-50, 60],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_CANADA]: {
		name: 'Canada',
		type: 'Geobox',
		coordinates: [
			[-93.5, 37.0],
			[-53.3, 56.75],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_EAST_CANADA]: {
		name: 'Eastern Canada',
		type: 'Geobox',
		coordinates: [
			[-93.5, 37.0],
			[-53.3, 56.75],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_NORTHEAST_US]: {
		name: 'Northeastern US',
		type: 'Geobox',
		coordinates: [
			[-90.4, 34.5],
			[-62.1, 49.5],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_SOUTHEAST_US]: {
		name: 'Southeastern US',
		type: 'Geobox',
		coordinates: [
			[-98.6, 23.3],
			[-68.0, 41.75],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_MIDWEST_US]: {
		name: 'Midwest',
		type: 'Geobox',
		coordinates: [
			[-99.7, 35.3],
			[-78.1, 46.85],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_GULF_COAST]: {
		name: 'Gulf Coast',
		type: 'Geobox',
		coordinates: [
			[-95.6, 26.9],
			[-78.0, 37.25],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_TORNADO_ALLEY]: {
		name: 'Tornado Alley',
		type: 'Geobox',
		coordinates: [
			[-105.5, 25.2],
			[-90.5, 41.25],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_CENTRAL_PLAINS]: {
		name: 'Siouxland / Central Plains',
		type: 'Geobox',
		coordinates: [
			[-106.6, 36.8],
			[-85.5, 48.85],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_NORTHERN_GREAT_PLAINS]: {
		name: 'Northern Great Plains',
		type: 'Geobox',
		coordinates: [
			[-114.1, 35.5],
			[-81.1, 52.5],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_CENTRAL_GREAT_PLAINS]: {
		name: 'Central Great Plains',
		type: 'Geobox',
		coordinates: [
			[-109.1, 31.7],
			[-86.5, 44.25],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_SOUTHERN_GREAT_PLAINS]: {
		name: 'Southern Great Plains',
		type: 'Geobox',
		coordinates: [
			[-110.6, 24.7],
			[-83.4, 41.0],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_CANADIAN_PRAIRIES]: {
		name: 'Canadian Prairies',
		type: 'Geobox',
		coordinates: [
			[-114.61, 43.8],
			[-92.9, 54.3],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_NORTHWEST_US]: {
		name: 'Northwestern US',
		type: 'Geobox',
		coordinates: [
			[-124.5, 37.8],
			[-100.5, 50.25],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
	[SECTOR_SOUTHWEST_US]: {
		name: 'Southwestern US',
		type: 'Geobox',
		coordinates: [
			[-126, 26.9],
			[-96.4, 44.6],
		],
		products: ALL_SURFACE_PRODUCTS,
	},
}

export const STATE_SURFACE_SECTORS = {
	[SECTOR_CHI_METRO]: {
		name: 'Chicago Metro Area',
		type: 'Point',
		dotShape: DotShape.Triangle,
		dotColor: DotColor.Green,
		coordinates: [-87.66, 41.87],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_SF_BAY]: {
		name: 'San Francisco Bay Area',
		type: 'Point',
		dotShape: DotShape.Triangle,
		dotColor: DotColor.Green,
		coordinates: [-122.53, 37.77],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_ALASKA]: {
		name: 'Alaska',
		type: 'Point',
		coordinates: [-152.19, 65.81],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_ALABAMA]: {
		name: 'Alabama',
		type: 'Point',
		coordinates: [-86.83, 32.8],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_ARKANSAS]: {
		name: 'Arkansas',
		type: 'Point',
		coordinates: [-92.38, 34.75],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_ARIZONA]: {
		name: 'Arizona',
		type: 'Point',
		coordinates: [-111.66, 34.05],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_CALIFORNIA]: {
		name: 'California',
		type: 'Point',
		coordinates: [-119.42, 36.78],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_COLORADO]: {
		name: 'Colorado',
		type: 'Point',
		coordinates: [-105.27, 39.55],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_CONNECTICUT]: {
		name: 'Connecticut',
		type: 'Point',
		coordinates: [-72.68, 41.6],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_DELAWARE]: {
		name: 'Delaware',
		type: 'Point',
		coordinates: [-75.5, 39.0],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_FLORIDA]: {
		name: 'Florida',
		type: 'Point',
		coordinates: [-81.69, 27.77],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_GEORGIA]: {
		name: 'Georgia',
		type: 'Point',
		coordinates: [-83.64, 32.16],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_HAWAII]: {
		name: 'Hawaii',
		type: 'Point',
		coordinates: [-157.82, 21.31],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_IOWA]: {
		name: 'Iowa',
		type: 'Point',
		coordinates: [-93.09, 41.88],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_IDAHO]: {
		name: 'Idaho',
		type: 'Point',
		coordinates: [-114.31, 44.07],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_ILLINOIS]: {
		name: 'Illinois',
		type: 'Point',
		coordinates: [-89.2, 40.08],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_INDIANA]: {
		name: 'Indiana',
		type: 'Point',
		coordinates: [-86.25, 40.27],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_KANSAS]: {
		name: 'Kansas',
		type: 'Point',
		coordinates: [-98.38, 38.48],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_KENTUCKY]: {
		name: 'Kentucky',
		type: 'Point',
		coordinates: [-84.27, 37.84],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_LOUISIANA]: {
		name: 'Louisiana',
		type: 'Point',
		coordinates: [-91.87, 30.97],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MAINE]: {
		name: 'Maine',
		type: 'Point',
		coordinates: [-69.24, 45.25],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MARYLAND]: {
		name: 'Maryland',
		type: 'Point',
		coordinates: [-76.61, 39.05],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MASSACHUSETTS]: {
		name: 'Massachusetts',
		type: 'Point',
		coordinates: [-71.8, 42.26],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MICHIGAN]: {
		name: 'Michigan',
		type: 'Point',
		coordinates: [-84.51, 44.31],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MINNESOTA]: {
		name: 'Minnesota',
		type: 'Point',
		coordinates: [-94.31, 46.73],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MISSOURI]: {
		name: 'Missouri',
		type: 'Point',
		coordinates: [-92.33, 38.57],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MISSISSIPPI]: {
		name: 'Mississippi',
		type: 'Point',
		coordinates: [-89.66, 32.74],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_MONTANA]: {
		name: 'Montana',
		type: 'Point',
		coordinates: [-110.45, 46.92],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NORTH_CAROLINA]: {
		name: 'North Carolina',
		type: 'Point',
		coordinates: [-79.89, 35.63],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NORTH_DAKOTA]: {
		name: 'North Dakota',
		type: 'Point',
		coordinates: [-99.9, 47.55],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NEBRASKA]: {
		name: 'Nebraska',
		type: 'Point',
		coordinates: [-99.9, 41.5],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NEW_HAMPSHIRE]: {
		name: 'New Hampshire',
		type: 'Point',
		coordinates: [-71.57, 43.19],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NEW_JERSEY]: {
		name: 'New Jersey',
		type: 'Point',
		coordinates: [-74.41, 40.06],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NEW_MEXICO]: {
		name: 'New Mexico',
		type: 'Point',
		coordinates: [-106.02, 34.42],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NEVADA]: {
		name: 'Nevada',
		type: 'Point',
		coordinates: [-116.42, 38.5],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_NEW_YORK]: {
		name: 'New York',
		type: 'Point',
		coordinates: [-74.01, 42.65],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_OHIO]: {
		name: 'Ohio',
		type: 'Point',
		coordinates: [-82.67, 40.42],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_OKLAHOMA]: {
		name: 'Oklahoma',
		type: 'Point',
		coordinates: [-97.52, 35.47],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_OREGON]: {
		name: 'Oregon',
		type: 'Point',
		coordinates: [-120.73, 43.77],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_PENNSYLVANIA]: {
		name: 'Pennsylvania',
		type: 'Point',
		coordinates: [-77.2, 40.59],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_RHODE_ISLAND]: {
		name: 'Rhode Island',
		type: 'Point',
		coordinates: [-71.41, 41.58],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_SOUTH_CAROLINA]: {
		name: 'South Carolina',
		type: 'Point',
		coordinates: [-80.95, 33.69],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_SOUTH_DAKOTA]: {
		name: 'South Dakota',
		type: 'Point',
		coordinates: [-99.9, 44.37],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_TENNESSEE]: {
		name: 'Tennessee',
		type: 'Point',
		coordinates: [-86.66, 35.86],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_TEXAS]: {
		name: 'Texas',
		type: 'Point',
		coordinates: [-99.9, 31.97],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_UTAH]: {
		name: 'Utah',
		type: 'Point',
		coordinates: [-111.67, 39.32],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_VIRGINIA]: {
		name: 'Virginia',
		type: 'Point',
		coordinates: [-78.65, 37.54],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_VERMONT]: {
		name: 'Vermont',
		type: 'Point',
		coordinates: [-72.57, 44.48],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_WASHINGTON]: {
		name: 'Washington',
		type: 'Point',
		coordinates: [-120.47, 47.31],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_WISCONSIN]: {
		name: 'Wisconsin',
		type: 'Point',
		coordinates: [-89.66, 44.52],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_WEST_VIRGINIA]: {
		name: 'West Virginia',
		type: 'Point',
		coordinates: [-80.95, 38.35],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
	[SECTOR_WYOMING]: {
		name: 'Wyoming',
		type: 'Point',
		coordinates: [-107.29, 43.08],
		products: [ALL_SURFACE_PRODUCTS[SURFACE_PRODUCT_RAW]],
	},
}

export const ALL_SECTORS = [LARGE_SURFACE_SECTORS, STATE_SURFACE_SECTORS]
