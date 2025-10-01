import { SATRAD_PRODUCTS, SATRAD_PRODUCT_ABI_11_ID, SATRAD_PRODUCT_ABI_12_ID, SATRAD_PRODUCT_ABI_14_ID, SATRAD_PRODUCT_ABI_16_ID } from './products'

// Puerto Rico region subset: omit ABI 11,12,14,16 (thermal bands not provided in this data region)
const SATRAD_PRODUCTS_PUERTO = Object.fromEntries(
	Object.entries(SATRAD_PRODUCTS).filter(
		([key]) => ![SATRAD_PRODUCT_ABI_11_ID, SATRAD_PRODUCT_ABI_12_ID, SATRAD_PRODUCT_ABI_14_ID, SATRAD_PRODUCT_ABI_16_ID].includes(key),
	),
)

// Sub-regional Sectors
const SATRAD_SECTOR_SUBREGIONAL_BAHAMAS_ID = 'Bahamas_sub'
const SATRAD_SECTOR_SUBREGIONAL_BAJA_ID = 'Baja'
const SATRAD_SECTOR_SUBREGIONAL_BERMUDA_ID = 'Bermuda'
const SATRAD_SECTOR_SUBREGIONAL_BIG_BEND_ID = 'Big_Bend'
const SATRAD_SECTOR_SUBREGIONAL_BOOTHEEL_ID = 'Bootheel'
const SATRAD_SECTOR_SUBREGIONAL_CO_KS_PANHAN_ID = 'CO_KS_PanHan'
const SATRAD_SECTOR_SUBREGIONAL_CALIGULF_ID = 'Cali_Gulf'
const SATRAD_SECTOR_SUBREGIONAL_CAROLINAS_ID = 'Carolinas'
const SATRAD_SECTOR_SUBREGIONAL_CENPLAINS_ID = 'Cen_Plains'
const SATRAD_SECTOR_SUBREGIONAL_CENROCKIES_ID = 'Cen_Rockies'
const SATRAD_SECTOR_SUBREGIONAL_CUBA_ID = 'Cuba'
const SATRAD_SECTOR_SUBREGIONAL_DESERTSW_ID = 'Desert_SW'
const SATRAD_SECTOR_SUBREGIONAL_DIXIE_ID = 'Dixie'
const SATRAD_SECTOR_SUBREGIONAL_DURANGO_ID = 'Durango'
const SATRAD_SECTOR_SUBREGIONAL_E_ANTILLES_ID = 'E_Antilles'
const SATRAD_SECTOR_SUBREGIONAL_E_CARIBBEAN_ID = 'E_Caribbean'
const SATRAD_SECTOR_SUBREGIONAL_E_GULF_COAST_ID = 'E_Gulf_Coast'
const SATRAD_SECTOR_SUBREGIONAL_FLORIDA_ID = 'Florida'
const SATRAD_SECTOR_SUBREGIONAL_GREATERANTILLES_ID = 'Greater_Antilles'
const SATRAD_SECTOR_SUBREGIONAL_IL_ID = 'IL'
const SATRAD_SECTOR_SUBREGIONAL_MI_ID = 'MI'
const SATRAD_SECTOR_SUBREGIONAL_MEXICOCITY_ID = 'Mexico_City'
const SATRAD_SECTOR_SUBREGIONAL_MIDATLANTIC_ID = 'Mid_Atlantic'
const SATRAD_SECTOR_SUBREGIONAL_NE_WY_ID = 'NE_WY'
const SATRAD_SECTOR_SUBREGIONAL_N_IOWA_ID = 'N_Iowa'
const SATRAD_SECTOR_SUBREGIONAL_N_NEVADA_ID = 'N_Nevada'
const SATRAD_SECTOR_SUBREGIONAL_N_PLAINS_ID = 'N_Plains'
const SATRAD_SECTOR_SUBREGIONAL_N_ROCKIES_ID = 'N_Rockies'
const SATRAD_SECTOR_SUBREGIONAL_N_TIER_ID = 'N_Tier'
const SATRAD_SECTOR_SUBREGIONAL_NEW_ENGLAND_ID = 'New_England'
const SATRAD_SECTOR_SUBREGIONAL_NRN_MO_ID = 'Nrn_Mo'
const SATRAD_SECTOR_SUBREGIONAL_OH_RV_ID = 'OH_RV'
const SATRAD_SECTOR_SUBREGIONAL_OREGON_ID = 'Oregon'
const SATRAD_SECTOR_SUBREGIONAL_QUEBEC_ID = 'Quebec'
const SATRAD_SECTOR_SUBREGIONAL_PACNW_ID = 'Pac_NW'
const SATRAD_SECTOR_SUBREGIONAL_S_BRITISH_COLUMBIA_ID = 'S_British_Columbia'
const SATRAD_SECTOR_SUBREGIONAL_S_PANHANDLE_ID = 'S_PanHandle'
const SATRAD_SECTOR_SUBREGIONAL_S_PLAINS_ID = 'S_Plains'
const SATRAD_SECTOR_SUBREGIONAL_S_SASKATCHEWAN_ID = 'S_SK'
const SATRAD_SECTOR_SUBREGIONAL_SANFRAN_ID = 'SanFran'
const SATRAD_SECTOR_SUBREGIONAL_SIERRA_ID = 'Sierra'
const SATRAD_SECTOR_SUBREGIONAL_ST_LAWRENCE_ID = 'St_Lawrence'
const SATRAD_SECTOR_SUBREGIONAL_TEXAS_ID = 'Texas'
const SATRAD_SECTOR_SUBREGIONAL_VANDENBERG_ID = 'Vandenburg'
const SATRAD_SECTOR_SUBREGIONAL_VIRGINIAS_ID = 'Virginias'
const SATRAD_SECTOR_SUBREGIONAL_W_CARIBBEAN_ID = 'W_Caribbean'
const SATRAD_SECTOR_SUBREGIONAL_W_GULF_COAST_ID = 'W_Gulf_Coast'
const SATRAD_SECTOR_SUBREGIONAL_YUCATAN_ID = 'Yucatan'
const SATRAD_SECTOR_SUBREGIONAL_CA_CENTRAL_QUEBEC_ID = 'ca_c_quebec'
const SATRAD_SECTOR_SUBREGIONAL_CA_EDMONTON_ID = 'ca_edmonton'
const SATRAD_SECTOR_SUBREGIONAL_CA_ERN_NEWFOUNDLAND_ID = 'ca_ern_nl'
const SATRAD_SECTOR_SUBREGIONAL_CA_GULF_STLAWRENCE_ID = 'ca_gulf_stl'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_ALBERTA_ID = 'ca_n_alberta'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_BRITISH_COLUMBIA_ID = 'ca_n_bc'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_MANITOBA_SASKACHEWAN_ID = 'ca_n_mb_sk'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_ONTARIO_ID = 'ca_n_ontario'
const SATRAD_SECTOR_SUBREGIONAL_CA_N_QUEBEC_ID = 'ca_n_quebec'
const SATRAD_SECTOR_SUBREGIONAL_CA_NEWFOUNDLAND_ID = 'ca_nl'
const SATRAD_SECTOR_SUBREGIONAL_CA_S_BRITISH_COLUMBIA_ID = 'ca_s_bc'
const SATRAD_SECTOR_SUBREGIONAL_CA_S_MANITOBA_SASKACHEWAN_ID = 'ca_s_mb_sk'
const SATRAD_SECTOR_SUBREGIONAL_CA_S_ONTARIO_ID = 'ca_s_ontario'
const SATRAD_SECTOR_SUBREGIONAL_CA_UNGAVA_ID = 'ca_ungava'

export const SATRAD_SECTORS_SUBREGIONAL_NAMER = {
	[SATRAD_SECTOR_SUBREGIONAL_BAHAMAS_ID]: {
		name: 'Bahamas',
		type: 'Geobox',
		coordinates: [
			[-83.16, 20.32],
			[-66.34, 26.72],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_BAJA_ID]: {
		name: 'Northern Gulf of California',
		type: 'Geobox',
		coordinates: [
			[-119.27, 24.75],
			[-103.51, 33.69],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_BERMUDA_ID]: {
		name: 'Bermuda',
		type: 'Geobox',
		coordinates: [
			[-79.46, 29.57],
			[-61.61, 35.45],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_BIG_BEND_ID]: {
		name: 'Big Bend',
		type: 'Geobox',
		coordinates: [
			[-109.59, 24.08],
			[-93.43, 32.36],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_BOOTHEEL_ID]: {
		name: 'Bootheel',
		type: 'Geobox',
		coordinates: [
			[-97.66, 32.71],
			[-80.13, 39.79],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CO_KS_PANHAN_ID]: {
		name: 'Central Great Plains',
		type: 'Geobox',
		coordinates: [
			[-109.33, 33.37],
			[-92.24, 41.22],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CALIGULF_ID]: {
		name: 'Southern Gulf of California',
		type: 'Geobox',
		coordinates: [
			[-115.21, 18.32],
			[-99.82, 27.16],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CAROLINAS_ID]: {
		name: 'Carolinas',
		type: 'Geobox',
		coordinates: [
			[-87.37, 30.48],
			[-69.69, 36.92],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CENPLAINS_ID]: {
		name: 'Platte River Basin',
		type: 'Geobox',
		coordinates: [
			[-107.55, 36.63],
			[-90.02, 44.15],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CENROCKIES_ID]: {
		name: 'Central Rockies',
		type: 'Geobox',
		coordinates: [
			[-117.27, 36.14],
			[-100.27, 44.33],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CUBA_ID]: {
		name: 'Cuba',
		type: 'Geobox',
		coordinates: [
			[-87.38, 17.95],
			[-70.91, 24.71],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_DESERTSW_ID]: {
		name: 'Arizona & New Mexico',
		type: 'Geobox',
		coordinates: [
			[-115.99, 29.97],
			[-99.57, 38.44],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_DIXIE_ID]: {
		name: 'Southeast U.S.',
		type: 'Geobox',
		coordinates: [
			[-96.39, 28.52],
			[-79.25, 35.69],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_DURANGO_ID]: {
		name: 'Four Corners',
		type: 'Geobox',
		coordinates: [
			[-116.01, 32.92],
			[-99.29, 41.23],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_ANTILLES_ID]: {
		name: 'Eastern Antilles',
		type: 'Geobox',
		coordinates: [
			[-75.1, 15.25],
			[-58.75, 24.25],
		],
		products: SATRAD_PRODUCTS_PUERTO,
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_CARIBBEAN_ID]: {
		name: 'Eastern Caribbean',
		type: 'Geobox',
		coordinates: [
			[-74.25, 11.0],
			[-58.25, 17.9],
		],
		products: SATRAD_PRODUCTS_PUERTO,
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_GULF_COAST_ID]: {
		name: 'East Gulf Coast',
		type: 'Geobox',
		coordinates: [
			[-94.32, 24.04],
			[-77.54, 31.21],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_FLORIDA_ID]: {
		name: 'Florida',
		type: 'Geobox',
		coordinates: [
			[-89.03, 24.24],
			[-72.04, 31.0],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_GREATERANTILLES_ID]: {
		name: 'Greater Antilles',
		type: 'Geobox',
		coordinates: [
			[-81.26, 15.08],
			[-64.86, 21.39],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_IL_ID]: {
		name: 'Illinois',
		type: 'Geobox',
		coordinates: [
			[-97.62, 37.38],
			[-79.56, 44.2],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_MI_ID]: {
		name: 'Michigan',
		type: 'Geobox',
		coordinates: [
			[-93.22, 40.63],
			[-74.57, 46.95],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_MEXICOCITY_ID]: {
		name: 'Mexico City',
		type: 'Geobox',
		coordinates: [
			[-107.5, 13.88],
			[-92.14, 22.22],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_MIDATLANTIC_ID]: {
		name: 'Mid Atlantic',
		type: 'Geobox',
		coordinates: [
			[-84.97, 37.11],
			[-66.45, 43.07],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_NE_WY_ID]: {
		name: 'Black Hills',
		type: 'Geobox',
		coordinates: [
			[-113.28, 39.85],
			[-95.64, 47.52],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_IOWA_ID]: {
		name: 'Midwest',
		type: 'Geobox',
		coordinates: [
			[-102.82, 39.48],
			[-84.73, 46.5],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_NEVADA_ID]: {
		name: 'Great Basin',
		type: 'Geobox',
		coordinates: [
			[-126.46, 37.49],
			[-110.08, 44.61],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_PLAINS_ID]: {
		name: 'Dakotas',
		type: 'Geobox',
		coordinates: [
			[-107.37, 42.23],
			[-89.15, 49.34],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_ROCKIES_ID]: {
		name: 'Montana',
		type: 'Geobox',
		coordinates: [
			[-117.61, 42.41],
			[-99.89, 50.14],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_TIER_ID]: {
		name: 'Upper Peninsula',
		type: 'Geobox',
		coordinates: [
			[-97.54, 42.66],
			[-78.82, 49.12],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_OH_RV_ID]: {
		name: 'Ohio River Valley',
		type: 'Geobox',
		coordinates: [
			[-93.73, 35.09],
			[-75.77, 41.77],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_NEW_ENGLAND_ID]: {
		name: 'New England',
		type: 'Geobox',
		coordinates: [
			[-82.26, 39.47],
			[-63.36, 45.11],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_NRN_MO_ID]: {
		name: 'Corn Belt',
		type: 'Geobox',
		coordinates: [
			[-101.9, 36.8],
			[-83.9, 43.8],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_OREGON_ID]: {
		name: 'Oregon',
		type: 'Geobox',
		coordinates: [
			[-130.3, 39.84],
			[-113.87, 46.92],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_QUEBEC_ID]: {
		name: 'Southern Quebec',
		type: 'Geobox',
		coordinates: [
			[-84.92, 42.67],
			[-65.69, 48.31],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_PACNW_ID]: {
		name: 'Washington',
		type: 'Geobox',
		coordinates: [
			[-128.65, 43.49],
			[-111.88, 50.19],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_BRITISH_COLUMBIA_ID]: {
		name: 'Southern British Columbia',
		type: 'Geobox',
		coordinates: [
			[-128.18, 46.95],
			[-111.11, 53.32],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_PANHANDLE_ID]: {
		name: 'Texas Panhandle',
		type: 'Geobox',
		coordinates: [
			[-109.15, 29.79],
			[-92.43, 37.81],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_PLAINS_ID]: {
		name: 'Oklahoma',
		type: 'Geobox',
		coordinates: [
			[-105.85, 32.22],
			[-88.72, 39.89],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_SASKATCHEWAN_ID]: {
		name: 'Canadian Prairies',
		type: 'Geobox',
		coordinates: [
			[-115.09, 45.74],
			[-96.79, 53.02],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_SANFRAN_ID]: {
		name: 'Northern California',
		type: 'Geobox',
		coordinates: [
			[-130.05, 34.64],
			[-113.97, 42.11],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_SIERRA_ID]: {
		name: 'Mojave Desert',
		type: 'Geobox',
		coordinates: [
			[-122.94, 32.18],
			[-106.81, 39.52],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_ST_LAWRENCE_ID]: {
		name: 'Nova Scotia',
		type: 'Geobox',
		coordinates: [
			[-73.06, 42.98],
			[-53.39, 47.8],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_TEXAS_ID]: {
		name: 'Texas',
		type: 'Geobox',
		coordinates: [
			[-106.59, 27.13],
			[-90.01, 35.09],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_VANDENBERG_ID]: {
		name: 'Southern California',
		type: 'Geobox',
		coordinates: [
			[-128.3, 30.9],
			[-112.3, 38.3],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_VIRGINIAS_ID]: {
		name: 'Virginias',
		type: 'Geobox',
		coordinates: [
			[-85.88, 34.01],
			[-67.76, 40.19],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_W_CARIBBEAN_ID]: {
		name: 'Western Caribbean',
		type: 'Geobox',
		coordinates: [
			[-89.41, 14.96],
			[-73.28, 21.92],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_W_GULF_COAST_ID]: {
		name: 'West Gulf Coast',
		type: 'Geobox',
		coordinates: [
			[-100.68, 23.79],
			[-84.17, 31.44],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_YUCATAN_ID]: {
		name: 'Yucatan Peninsula',
		type: 'Geobox',
		coordinates: [
			[-98.34, 17.23],
			[-82.33, 24.85],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_CENTRAL_QUEBEC_ID]: {
		name: 'Central Quebec',
		type: 'Geobox',
		coordinates: [
			[-84.34, 47.03],
			[-65.3, 52.6],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_EDMONTON_ID]: {
		name: 'Southern Alberta',
		type: 'Geobox',
		coordinates: [
			[-122.65, 49.73],
			[-104.88, 56.86],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_ERN_NEWFOUNDLAND_ID]: {
		name: 'Southern Newfoundland',
		type: 'Geobox',
		coordinates: [
			[-62.32, 45.58],
			[-42.81, 50.08],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_GULF_STLAWRENCE_ID]: {
		name: 'Gulf of St. Lawrence',
		type: 'Geobox',
		coordinates: [
			[-69.98, 47.01],
			[-50.5, 51.84],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_ALBERTA_ID]: {
		name: 'Northern Alberta',
		type: 'Geobox',
		coordinates: [
			[-123.89, 53.96],
			[-105.63, 60.63],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_BRITISH_COLUMBIA_ID]: {
		name: 'Northern British Columbia',
		type: 'Geobox',
		coordinates: [
			[-136.56, 54.43],
			[-118.91, 61.54],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_MANITOBA_SASKACHEWAN_ID]: {
		name: 'N. Manitoba & Saskatchewan',
		type: 'Geobox',
		coordinates: [
			[-110.43, 54.16],
			[-91.49, 60.26],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_ONTARIO_ID]: {
		name: 'Northern Ontario',
		type: 'Geobox',
		coordinates: [
			[-96.46, 52.79],
			[-77.12, 58.43],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_QUEBEC_ID]: {
		name: 'Northern Quebec',
		type: 'Geobox',
		coordinates: [
			[-85.2, 52.86],
			[-65.42, 57.98],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_NEWFOUNDLAND_ID]: {
		name: 'Northern Newfoundland',
		type: 'Geobox',
		coordinates: [
			[-70.88, 51.76],
			[-50.79, 56.29],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_S_BRITISH_COLUMBIA_ID]: {
		name: 'Central British Columbia',
		type: 'Geobox',
		coordinates: [
			[-132.43, 50.35],
			[-115.08, 57.82],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_S_MANITOBA_SASKACHEWAN_ID]: {
		name: 'S. Manitoba & Saskatchewan',
		type: 'Geobox',
		coordinates: [
			[-110.46, 48.34],
			[-92.29, 55.07],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_S_ONTARIO_ID]: {
		name: 'Southern Ontario',
		type: 'Geobox',
		coordinates: [
			[-96.11, 47.03],
			[-77.5, 53.19],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_UNGAVA_ID]: {
		name: 'Ungava',
		type: 'Geobox',
		coordinates: [
			[-76.06, 55.6],
			[-55.56, 60.06],
		],
		products: SATRAD_PRODUCTS,
	},
}

const SATRAD_SECTOR_SUBREGIONAL_ALASKAWEST_ID = 'AlaskaWest'
const SATRAD_SECTOR_SUBREGIONAL_ANCHORAGESUB_ID = 'Anchoragesub'
const SATRAD_SECTOR_SUBREGIONAL_NWALASKA_ID = 'NWAlaska'
const SATRAD_SECTOR_SUBREGIONAL_JUNEAUSUB_ID = 'Juneausub'
const SATRAD_SECTOR_SUBREGIONAL_FAIRBANKS_ID = 'Fairbanks'
const SATRAD_SECTOR_SUBREGIONAL_BRISTOLBAY_ID = 'BristolBay'
const SATRAD_SECTOR_SUBREGIONAL_UNALASKA_ID = 'Unalaska'

export const SATRAD_SECTORS_SUBREGIONAL_ALASKA = {
	[SATRAD_SECTOR_SUBREGIONAL_ALASKAWEST_ID]: {
		name: 'Alaska West',
		type: 'Geobox',
		coordinates: [
			[-179.9, 50.5],
			[-140.5, 68.1],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_ANCHORAGESUB_ID]: {
		name: 'Anchorage Sub',
		type: 'Geobox',
		coordinates: [
			[-168.5, 56.5],
			[-132.5, 63.25],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_NWALASKA_ID]: {
		name: 'NW Alaska',
		type: 'Geobox',
		coordinates: [
			[-173.5, 64.05],
			[-137.5, 72.15],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_JUNEAUSUB_ID]: {
		name: 'Juneau Sub',
		type: 'Geobox',
		coordinates: [
			[-151.0, 53.0],
			[-116.0, 62.75],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_FAIRBANKS_ID]: {
		name: 'Fairbanks',
		type: 'Geobox',
		coordinates: [
			[-169.0, 60.5],
			[-139.0, 69.0],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_BRISTOLBAY_ID]: {
		name: 'Bristol Bay',
		type: 'Geobox',
		coordinates: [
			[-168.1, 53.5],
			[-151.5, 59.5],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_SUBREGIONAL_UNALASKA_ID]: {
		name: 'Unalaska',
		type: 'Geobox',
		coordinates: [
			[-179.99, 48.1],
			[-150.5, 59.5],
		],
		products: SATRAD_PRODUCTS,
	},
}

const SATRAD_SECTOR_SUBREGIONAL_HAWAII_ZOOM_ID = 'HIzoom'

export const SATRAD_SECTORS_SUBREGIONAL_HAWAII = {
	[SATRAD_SECTOR_SUBREGIONAL_HAWAII_ZOOM_ID]: {
		name: 'Hawaii Zoom',
		type: 'Geobox',
		coordinates: [
			[-162.5, 15.5],
			[-149.5, 25.05],
		],
		products: SATRAD_PRODUCTS,
	},
}
