import { ALL_SATRAD_DYNAMIC_OVERLAYS, ALL_SATRAD_STATIC_OVERLAYS } from './overlays'
import { SATRAD_PRODUCTS } from './products'

// Sub-regional Sectors
const SATRAD_SECTOR_SUBREGIONAL_BAHAMAS_ID = 'Bahamas'
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
const SATRAD_SECTOR_SUBREGIONAL_YELLOWSTONE_ID = 'Yellowstone'
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

const subregional_latitude_modifier = 1.5
const subregional_longitude_modifier = 1.5

export const SATRAD_SECTORS_SUBREGIONAL_NAMER = {
	[SATRAD_SECTOR_SUBREGIONAL_BAHAMAS_ID]: {
		name: 'Bahamas',
		type: 'Geobox',
		coordinates: [
			[-74.9 + subregional_longitude_modifier, 23.7 - subregional_latitude_modifier],
			[-74.9 - subregional_longitude_modifier, 23.7 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BAJA_ID]: {
		name: 'Baja',
		type: 'Geobox',
		coordinates: [
			[-111.6 + subregional_longitude_modifier, 29.4 - subregional_latitude_modifier],
			[-111.6 - subregional_longitude_modifier, 29.4 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BERMUDA_ID]: {
		name: 'Bermuda',
		type: 'Geobox',
		coordinates: [
			[-70.7 + subregional_longitude_modifier, 32.7 - subregional_latitude_modifier],
			[-70.7 - subregional_longitude_modifier, 32.7 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BIG_BEND_ID]: {
		name: 'Big Bend',
		type: 'Geobox',
		coordinates: [
			[-101.7 + subregional_longitude_modifier, 28.4 - subregional_latitude_modifier],
			[-101.7 - subregional_longitude_modifier, 28.4 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BOOTHEEL_ID]: {
		name: 'Bootheel',
		type: 'Geobox',
		coordinates: [
			[-89.1 + subregional_longitude_modifier, 36.45 - subregional_latitude_modifier],
			[-89.1 - subregional_longitude_modifier, 36.45 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CO_KS_PANHAN_ID]: {
		name: 'CO_KS_PanHandle',
		type: 'Geobox',
		coordinates: [
			[-101.0 + subregional_longitude_modifier, 37.5 - subregional_latitude_modifier],
			[-101.0 - subregional_longitude_modifier, 37.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CALIGULF_ID]: {
		name: 'Cali_Gulf',
		type: 'Geobox',
		coordinates: [
			[-107.7 + subregional_longitude_modifier, 22.9 - subregional_latitude_modifier],
			[-107.7 - subregional_longitude_modifier, 22.9 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CAROLINAS_ID]: {
		name: 'Carolinas',
		type: 'Geobox',
		coordinates: [
			[-78.7 + subregional_longitude_modifier, 33.9 - subregional_latitude_modifier],
			[-78.7 - subregional_longitude_modifier, 33.9 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CENPLAINS_ID]: {
		name: 'Cen_Plains',
		type: 'Geobox',
		coordinates: [
			[-99.0 + subregional_longitude_modifier, 40.6 - subregional_latitude_modifier],
			[-99.0 - subregional_longitude_modifier, 40.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CENROCKIES_ID]: {
		name: 'Cen_Rockies',
		type: 'Geobox',
		coordinates: [
			[-109.0 + subregional_longitude_modifier, 40.45 - subregional_latitude_modifier],
			[-109.0 - subregional_longitude_modifier, 40.45 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CUBA_ID]: {
		name: 'Cuba',
		type: 'Geobox',
		coordinates: [
			[-79.3 + subregional_longitude_modifier, 21.5 - subregional_latitude_modifier],
			[-79.3 - subregional_longitude_modifier, 21.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_DESERTSW_ID]: {
		name: 'Desert_SW',
		type: 'Geobox',
		coordinates: [
			[-108.0 + subregional_longitude_modifier, 34.4 - subregional_latitude_modifier],
			[-108.0 - subregional_longitude_modifier, 34.4 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_DIXIE_ID]: {
		name: 'Dixie',
		type: 'Geobox',
		coordinates: [
			[-88.0 + subregional_longitude_modifier, 32.3 - subregional_latitude_modifier],
			[-88.0 - subregional_longitude_modifier, 32.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_DURANGO_ID]: {
		name: 'Durango',
		type: 'Geobox',
		coordinates: [
			[-107.88 + subregional_longitude_modifier, 37.28 - subregional_latitude_modifier],
			[-107.88 - subregional_longitude_modifier, 37.28 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_ANTILLES_ID]: {
		name: 'E_Antilles',
		type: 'Geobox',
		coordinates: [
			[-67.3 + subregional_longitude_modifier, 19.6 - subregional_latitude_modifier],
			[-67.3 - subregional_longitude_modifier, 19.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_CARIBBEAN_ID]: {
		name: 'E_Caribbean',
		type: 'Geobox',
		coordinates: [
			[-66.3 + subregional_longitude_modifier, 13.2 - subregional_latitude_modifier],
			[-66.3 - subregional_longitude_modifier, 13.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_E_GULF_COAST_ID]: {
		name: 'E_Gulf_Coast',
		type: 'Geobox',
		coordinates: [
			[-86.1 + subregional_longitude_modifier, 27.8 - subregional_latitude_modifier],
			[-86.1 - subregional_longitude_modifier, 27.8 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_FLORIDA_ID]: {
		name: 'Florida',
		type: 'Geobox',
		coordinates: [
			[-80.7 + subregional_longitude_modifier, 27.8 - subregional_latitude_modifier],
			[-80.7 - subregional_longitude_modifier, 27.8 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_GREATERANTILLES_ID]: {
		name: 'Greater Antilles',
		type: 'Geobox',
		coordinates: [
			[-73.2 + subregional_longitude_modifier, 18.4 - subregional_latitude_modifier],
			[-73.2 - subregional_longitude_modifier, 18.4 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_IL_ID]: {
		name: 'Illinois',
		type: 'Geobox',
		coordinates: [
			[-88.8 + subregional_longitude_modifier, 41.0 - subregional_latitude_modifier],
			[-88.8 - subregional_longitude_modifier, 41.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MI_ID]: {
		name: 'Michigan',
		type: 'Geobox',
		coordinates: [
			[-84.1 + subregional_longitude_modifier, 44.0 - subregional_latitude_modifier],
			[-84.1 - subregional_longitude_modifier, 44.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MEXICOCITY_ID]: {
		name: 'Mexico City',
		type: 'Geobox',
		coordinates: [
			[-100.0 + subregional_longitude_modifier, 18.2 - subregional_latitude_modifier],
			[-100.0 - subregional_longitude_modifier, 18.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_MIDATLANTIC_ID]: {
		name: 'Mid Atlantic',
		type: 'Geobox',
		coordinates: [
			[-75.9 + subregional_longitude_modifier, 40.3 - subregional_latitude_modifier],
			[-75.9 - subregional_longitude_modifier, 40.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NE_WY_ID]: {
		name: 'NE_WY',
		type: 'Geobox',
		coordinates: [
			[-104.7 + subregional_longitude_modifier, 43.9 - subregional_latitude_modifier],
			[-104.7 - subregional_longitude_modifier, 43.9 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_IOWA_ID]: {
		name: 'N_Iowa',
		type: 'Geobox',
		coordinates: [
			[-94.0 + subregional_longitude_modifier, 43.2 - subregional_latitude_modifier],
			[-94.0 - subregional_longitude_modifier, 43.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_NEVADA_ID]: {
		name: 'N_Nevada',
		type: 'Geobox',
		coordinates: [
			[-118.4 + subregional_longitude_modifier, 41.2 - subregional_latitude_modifier],
			[-118.4 - subregional_longitude_modifier, 41.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_PLAINS_ID]: {
		name: 'N_Plains',
		type: 'Geobox',
		coordinates: [
			[-98.5 + subregional_longitude_modifier, 46.0 - subregional_latitude_modifier],
			[-98.5 - subregional_longitude_modifier, 46.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_ROCKIES_ID]: {
		name: 'N_Rockies',
		type: 'Geobox',
		coordinates: [
			[-109.0 + subregional_longitude_modifier, 46.5 - subregional_latitude_modifier],
			[-109.0 - subregional_longitude_modifier, 46.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_N_TIER_ID]: {
		name: 'Upper Peninsula',
		type: 'Geobox',
		coordinates: [
			[-88.4 + subregional_longitude_modifier, 46.1 - subregional_latitude_modifier],
			[-88.4 - subregional_longitude_modifier, 46.1 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_OH_RV_ID]: {
		name: 'Ohio River Valley',
		type: 'Geobox',
		coordinates: [
			[-84.95 + subregional_longitude_modifier, 38.63 - subregional_latitude_modifier],
			[-84.95 - subregional_longitude_modifier, 38.63 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NEW_ENGLAND_ID]: {
		name: 'New England',
		type: 'Geobox',
		coordinates: [
			[-73.0 + subregional_longitude_modifier, 42.5 - subregional_latitude_modifier],
			[-73.0 - subregional_longitude_modifier, 42.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NRN_MO_ID]: {
		name: 'Northern Missouri',
		type: 'Geobox',
		coordinates: [
			[-93.0 + subregional_longitude_modifier, 40.5 - subregional_latitude_modifier],
			[-93.0 - subregional_longitude_modifier, 40.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_OREGON_ID]: {
		name: 'Oregon',
		type: 'Geobox',
		coordinates: [
			[-122.22 + subregional_longitude_modifier, 43.54 - subregional_latitude_modifier],
			[-122.22 - subregional_longitude_modifier, 43.54 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_QUEBEC_ID]: {
		name: 'Quebec',
		type: 'Geobox',
		coordinates: [
			[-75.5 + subregional_longitude_modifier, 45.7 - subregional_latitude_modifier],
			[-75.5 - subregional_longitude_modifier, 45.7 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_PACNW_ID]: {
		name: 'Pacific Northwest',
		type: 'Geobox',
		coordinates: [
			[-120.4 + subregional_longitude_modifier, 47.0 - subregional_latitude_modifier],
			[-120.4 - subregional_longitude_modifier, 47.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_BRITISH_COLUMBIA_ID]: {
		name: 'S_British_Columbia',
		type: 'Geobox',
		coordinates: [
			[-119.8 + subregional_longitude_modifier, 50.3 - subregional_latitude_modifier],
			[-119.8 - subregional_longitude_modifier, 50.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_PANHANDLE_ID]: {
		name: 'S_Panhandle',
		type: 'Geobox',
		coordinates: [
			[-101.0 + subregional_longitude_modifier, 34.0 - subregional_latitude_modifier],
			[-101.0 - subregional_longitude_modifier, 34.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_PLAINS_ID]: {
		name: 'S_Plains',
		type: 'Geobox',
		coordinates: [
			[-97.5 + subregional_longitude_modifier, 36.26 - subregional_latitude_modifier],
			[-97.5 - subregional_longitude_modifier, 36.26 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_S_SASKATCHEWAN_ID]: {
		name: 'S_Saskatchewan',
		type: 'Geobox',
		coordinates: [
			[-106.2 + subregional_longitude_modifier, 49.6 - subregional_latitude_modifier],
			[-106.2 - subregional_longitude_modifier, 49.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SANFRAN_ID]: {
		name: 'San Francisco',
		type: 'Geobox',
		coordinates: [
			[-122.15 + subregional_longitude_modifier, 38.53 - subregional_latitude_modifier],
			[-122.15 - subregional_longitude_modifier, 38.53 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_SIERRA_ID]: {
		name: 'Sierra',
		type: 'Geobox',
		coordinates: [
			[-115.0 + subregional_longitude_modifier, 36.0 - subregional_latitude_modifier],
			[-115.0 - subregional_longitude_modifier, 36.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_ST_LAWRENCE_ID]: {
		name: 'St. Lawrence',
		type: 'Geobox',
		coordinates: [
			[-63.4 + subregional_longitude_modifier, 45.6 - subregional_latitude_modifier],
			[-63.4 - subregional_longitude_modifier, 45.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_TEXAS_ID]: {
		name: 'Texas',
		type: 'Geobox',
		coordinates: [
			[-98.5 + subregional_longitude_modifier, 31.3 - subregional_latitude_modifier],
			[-98.5 - subregional_longitude_modifier, 31.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_VANDENBERG_ID]: {
		name: 'Vandenberg',
		type: 'Geobox',
		coordinates: [
			[-120.6 + subregional_longitude_modifier, 34.7 - subregional_latitude_modifier],
			[-120.6 - subregional_longitude_modifier, 34.7 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_VIRGINIAS_ID]: {
		name: 'Virginias',
		type: 'Geobox',
		coordinates: [
			[-77.0 + subregional_longitude_modifier, 37.3 - subregional_latitude_modifier],
			[-77.0 - subregional_longitude_modifier, 37.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_W_CARIBBEAN_ID]: {
		name: 'W_Caribbean',
		type: 'Geobox',
		coordinates: [
			[-81.5 + subregional_longitude_modifier, 18.6 - subregional_latitude_modifier],
			[-81.5 - subregional_longitude_modifier, 18.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_W_GULF_COAST_ID]: {
		name: 'W_Gulf_Coast',
		type: 'Geobox',
		coordinates: [
			[-97.5 + subregional_longitude_modifier, 30.0 - subregional_latitude_modifier],
			[-97.5 - subregional_longitude_modifier, 30.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_YELLOWSTONE_ID]: {
		name: 'Yellowstone',
		type: 'Geobox',
		coordinates: [
			[-110.0 + subregional_longitude_modifier, 44.5 - subregional_latitude_modifier],
			[-110.0 - subregional_longitude_modifier, 44.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_YUCATAN_ID]: {
		name: 'Yucatan',
		type: 'Geobox',
		coordinates: [
			[-89.2 + subregional_longitude_modifier, 21.0 - subregional_latitude_modifier],
			[-89.2 - subregional_longitude_modifier, 21.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_CENTRAL_QUEBEC_ID]: {
		name: 'CA_Central_Quebec',
		type: 'Geobox',
		coordinates: [
			[-75.0 + subregional_longitude_modifier, 50.0 - subregional_latitude_modifier],
			[-75.0 - subregional_longitude_modifier, 50.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_EDMONTON_ID]: {
		name: 'CA_Edmonton',
		type: 'Geobox',
		coordinates: [
			[-114.0 + subregional_longitude_modifier, 53.5 - subregional_latitude_modifier],
			[-114.0 - subregional_longitude_modifier, 53.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_ERN_NEWFOUNDLAND_ID]: {
		name: 'CA_Eastern_Newfoundland',
		type: 'Geobox',
		coordinates: [
			[-52.71 + subregional_longitude_modifier, 48.0 - subregional_latitude_modifier],
			[-52.71 - subregional_longitude_modifier, 48.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_GULF_STLAWRENCE_ID]: {
		name: 'CA_Gulf_St_Lawrence',
		type: 'Geobox',
		coordinates: [
			[-60.4 + subregional_longitude_modifier, 49.6 - subregional_latitude_modifier],
			[-60.4 - subregional_longitude_modifier, 49.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_ALBERTA_ID]: {
		name: 'CA_N_Alberta',
		type: 'Geobox',
		coordinates: [
			[-115.0 + subregional_longitude_modifier, 57.5 - subregional_latitude_modifier],
			[-115.0 - subregional_longitude_modifier, 57.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_BRITISH_COLUMBIA_ID]: {
		name: 'CA_N_British_Columbia',
		type: 'Geobox',
		coordinates: [
			[-128.0 + subregional_longitude_modifier, 58.2 - subregional_latitude_modifier],
			[-128.0 - subregional_longitude_modifier, 58.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_MANITOBA_SASKACHEWAN_ID]: {
		name: 'CA_N_Manitoba_Saskatchewan',
		type: 'Geobox',
		coordinates: [
			[-101.2 + subregional_longitude_modifier, 57.4 - subregional_latitude_modifier],
			[-101.2 - subregional_longitude_modifier, 57.4 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_ONTARIO_ID]: {
		name: 'CA_N_Ontario',
		type: 'Geobox',
		coordinates: [
			[-87.0 + subregional_longitude_modifier, 55.8 - subregional_latitude_modifier],
			[-87.0 - subregional_longitude_modifier, 55.8 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_N_QUEBEC_ID]: {
		name: 'CA_N_Quebec',
		type: 'Geobox',
		coordinates: [
			[-75.5 + subregional_longitude_modifier, 55.6 - subregional_latitude_modifier],
			[-75.5 - subregional_longitude_modifier, 55.6 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_NEWFOUNDLAND_ID]: {
		name: 'CA_Newfoundland',
		type: 'Geobox',
		coordinates: [
			[-61.0 + subregional_longitude_modifier, 54.2 - subregional_latitude_modifier],
			[-61.0 - subregional_longitude_modifier, 54.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_S_BRITISH_COLUMBIA_ID]: {
		name: 'CA_S_British_Columbia',
		type: 'Geobox',
		coordinates: [
			[-124.0 + subregional_longitude_modifier, 54.3 - subregional_latitude_modifier],
			[-124.0 - subregional_longitude_modifier, 54.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_S_MANITOBA_SASKACHEWAN_ID]: {
		name: 'CA_S_Manitoba_Saskatchewan',
		type: 'Geobox',
		coordinates: [
			[-101.6 + subregional_longitude_modifier, 51.9 - subregional_latitude_modifier],
			[-101.6 - subregional_longitude_modifier, 51.9 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_S_ONTARIO_ID]: {
		name: 'CA_S_Ontario',
		type: 'Geobox',
		coordinates: [
			[-87.0 + subregional_longitude_modifier, 50.3 - subregional_latitude_modifier],
			[-87.0 - subregional_longitude_modifier, 50.3 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_CA_UNGAVA_ID]: {
		name: 'CA_Ungava',
		type: 'Geobox',
		coordinates: [
			[-66.0 + subregional_longitude_modifier, 58.0 - subregional_latitude_modifier],
			[-66.0 - subregional_longitude_modifier, 58.0 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
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
			[-162.88 + subregional_longitude_modifier, 64.06 - subregional_latitude_modifier],
			[-162.88 - subregional_longitude_modifier, 64.06 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_ANCHORAGESUB_ID]: {
		name: 'Anchorage Sub',
		type: 'Geobox',
		coordinates: [
			[-149.9 + subregional_longitude_modifier, 61.2 - subregional_latitude_modifier],
			[-149.9 - subregional_longitude_modifier, 61.2 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_NWALASKA_ID]: {
		name: 'NW Alaska',
		type: 'Geobox',
		coordinates: [
			[-155.41 + subregional_longitude_modifier, 68.75 - subregional_latitude_modifier],
			[-155.41 - subregional_longitude_modifier, 68.75 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_JUNEAUSUB_ID]: {
		name: 'Juneau Sub',
		type: 'Geobox',
		coordinates: [
			[-134.2 + subregional_longitude_modifier, 58.15 - subregional_latitude_modifier],
			[-134.2 - subregional_longitude_modifier, 58.15 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_FAIRBANKS_ID]: {
		name: 'Fairbanks',
		type: 'Geobox',
		coordinates: [
			[-147.75 + subregional_longitude_modifier, 64.75 - subregional_latitude_modifier],
			[-147.75 - subregional_longitude_modifier, 64.75 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_BRISTOLBAY_ID]: {
		name: 'Bristol Bay',
		type: 'Geobox',
		coordinates: [
			[-160.0 + subregional_longitude_modifier, 56.96 - subregional_latitude_modifier],
			[-160.0 - subregional_longitude_modifier, 56.96 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
	[SATRAD_SECTOR_SUBREGIONAL_UNALASKA_ID]: {
		name: 'Unalaska',
		type: 'Geobox',
		coordinates: [
			[-166.53 + subregional_longitude_modifier, 53.87 - subregional_latitude_modifier],
			[-166.53 - subregional_longitude_modifier, 53.87 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}

const SATRAD_SECTOR_SUBREGIONAL_HAWAII_ZOOM_ID = 'HIzoom'

export const SATRAD_SECTORS_SUBREGIONAL_HAWAII = {
	[SATRAD_SECTOR_SUBREGIONAL_HAWAII_ZOOM_ID]: {
		name: 'Hawaii Zoom',
		type: 'Geobox',
		coordinates: [
			[-156.1 + subregional_longitude_modifier, 20.5 - subregional_latitude_modifier],
			[-156.1 - subregional_longitude_modifier, 20.5 + subregional_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
		overlays: [...ALL_SATRAD_STATIC_OVERLAYS, ...ALL_SATRAD_DYNAMIC_OVERLAYS],
	},
}
