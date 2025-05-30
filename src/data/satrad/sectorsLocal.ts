import { SATRAD_PRODUCTS } from './products'

const local_latitude_modifier = 1
const local_longitude_modifier = 1

// Local Sectors
const SATRAD_SECTOR_LOCAL_ALABAMA_ID = 'Alabama'
const SATRAD_SECTOR_LOCAL_ARIZONA_ID = 'Arizona'
const SATRAD_SECTOR_LOCAL_ARKANSAS_ID = 'Arkansas'
const SATRAD_SECTOR_LOCAL_AUSTIN_ID = 'Austin'
const SATRAD_SECTOR_LOCAL_BAHAMAS_ID = 'Bahamas'
const SATRAD_SECTOR_LOCAL_BEATRICE_ID = 'Beatrice'
const SATRAD_SECTOR_LOCAL_BERMUDA_ID = 'Bermudazoom'
const SATRAD_SECTOR_LOCAL_BLACK_HILLS_ID = 'Black_Hills'
const SATRAD_SECTOR_LOCAL_BRANDON_ID = 'Brandon'
const SATRAD_SECTOR_LOCAL_BROWNSVILLE_ID = 'Brownsville'
const SATRAD_SECTOR_LOCAL_CABO_ID = 'Cabo'
const SATRAD_SECTOR_LOCAL_CALGARY_ID = 'Calgary'
const SATRAD_SECTOR_LOCAL_CAMPECHE_ID = 'Campeche'
const SATRAD_SECTOR_LOCAL_CAROLINA_ID = 'Carolina'
const SATRAD_SECTOR_LOCAL_CAYMAN_ID = 'Cayman'
const SATRAD_SECTOR_LOCAL_CEN_CALIFORNIA_ID = 'Cen_California'
const SATRAD_SECTOR_LOCAL_CEN_TEXAS_ID = 'Cen_Texas'
const SATRAD_SECTOR_LOCAL_CHIHUAHUA_ID = 'Chihuahua'
const SATRAD_SECTOR_LOCAL_CLOVIS_ID = 'Clovis'
const SATRAD_SECTOR_LOCAL_COLORADO_ID = 'Colorado'
const SATRAD_SECTOR_LOCAL_COZUMEL_ID = 'Cozumel'
const SATRAD_SECTOR_LOCAL_E_WASHINGTON_ID = 'E_Washington'
const SATRAD_SECTOR_LOCAL_FL_PANHANDLE_ID = 'FL_Panhandle'
const SATRAD_SECTOR_LOCAL_FARGO_ID = 'Fargo'
const SATRAD_SECTOR_LOCAL_FOUR_CORNERS_ID = 'Four_Corners'
const SATRAD_SECTOR_LOCAL_GEORGIA_ID = 'Georgia'
const SATRAD_SECTOR_LOCAL_GRAND_FORKS_ID = 'GrandForks'
const SATRAD_SECTOR_LOCAL_GULF_STREAM_ID = 'Gulf_Stream'
const SATRAD_SECTOR_LOCAL_HATTERAS_ID = 'Hatteras'
const SATRAD_SECTOR_LOCAL_HAVANA_ID = 'Havana'
const SATRAD_SECTOR_LOCAL_HISPANIOLA_ID = 'Hispaniola'
const SATRAD_SECTOR_LOCAL_HOUSTON_ID = 'Houston'
const SATRAD_SECTOR_LOCAL_INDIANA_ID = 'Indiana'
const SATRAD_SECTOR_LOCAL_IOWA_ID = 'Iowa'
const SATRAD_SECTOR_LOCAL_JACKSONVILLE_ID = 'Jacksonville'
const SATRAD_SECTOR_LOCAL_JAMAICA_ID = 'Jamaica'
const SATRAD_SECTOR_LOCAL_KANSAS_ID = 'Kansas'
const SATRAD_SECTOR_LOCAL_KELWONA_ID = 'Kelowna'
const SATRAD_SECTOR_LOCAL_KENTUCKY_ID = 'Kentucky'
const SATRAD_SECTOR_LOCAL_LAKE_ERIE_ID = 'LakeErie'
const SATRAD_SECTOR_LOCAL_LAKE_HURON_ID = 'LakeHuron'
const SATRAD_SECTOR_LOCAL_LAKE_ONTARIO_ID = 'LakeOntario'
const SATRAD_SECTOR_LOCAL_LAKE_SUPERIOR_ID = 'LakeSuperior'
const SATRAD_SECTOR_LOCAL_LAWRENCE_ID = 'Lawrence'
const SATRAD_SECTOR_LOCAL_MADISON_ID = 'Madison'
const SATRAD_SECTOR_LOCAL_MICHIGAN_ID = 'Michigan'
const SATRAD_SECTOR_LOCAL_MID_BAJA_ID = 'Mid_Baja'
const SATRAD_SECTOR_LOCAL_MISSISSIPPI_ID = 'Mississippi'
const SATRAD_SECTOR_LOCAL_MITTEN_CI_ID = 'Mitten_ci'
const SATRAD_SECTOR_LOCAL_MONTREAL_ID = 'Montreal'
const SATRAD_SECTOR_LOCAL_NC_VA_ID = 'NC_VA'
const SATRAD_SECTOR_LOCAL_NE_COLORADO_ID = 'NE_Colorado'
const SATRAD_SECTOR_LOCAL_NE_MONTANA_ID = 'NE_Montana'
const SATRAD_SECTOR_LOCAL_NE_OREGON_ID = 'NE_Oregon'
const SATRAD_SECTOR_LOCAL_NE_TEXAS_ID = 'NE_Texas'
const SATRAD_SECTOR_LOCAL_N_CALIFORNIA_ID = 'N_California'
const SATRAD_SECTOR_LOCAL_N_DAKOTA_ID = 'N_Dakota'
const SATRAD_SECTOR_LOCAL_N_ILLINOIS_ID = 'N_Illinois'
const SATRAD_SECTOR_LOCAL_N_LOUISIANA_ID = 'N_Louisiana'
const SATRAD_SECTOR_LOCAL_N_MINNESOTA_ID = 'N_Minnesota'
const SATRAD_SECTOR_LOCAL_N_MISSISSIPPI_ID = 'N_Mississippi'
const SATRAD_SECTOR_LOCAL_N_NEW_MEXICO_ID = 'N_New_Mexico'
const SATRAD_SECTOR_LOCAL_NEBRASKA_ID = 'Nebraska'
const SATRAD_SECTOR_LOCAL_NEVADA_ID = 'Nevada'
const SATRAD_SECTOR_LOCAL_NEW_BRUNSWICK_ID = 'New_Brunswick'
const SATRAD_SECTOR_LOCAL_NEW_JERSEY_ID = 'New_Jersey'
const SATRAD_SECTOR_LOCAL_NEW_ORLEANS_ID = 'New_Orleans'
const SATRAD_SECTOR_LOCAL_NEWFOUNDLAND_ID = 'Newfoundland'
const SATRAD_SECTOR_LOCAL_NOVA_SCOTIA_ID = 'Nova_Scotia'
const SATRAD_SECTOR_LOCAL_NUEVO_LEON_ID = 'Nuevo_Leon'
const SATRAD_SECTOR_LOCAL_OHIO_ID = 'Ohio'
const SATRAD_SECTOR_LOCAL_OKLAHOMA_ID = 'Oklahoma'
const SATRAD_SECTOR_LOCAL_ORLANDO_ID = 'Orlando'
const SATRAD_SECTOR_LOCAL_PHOENIX_ID = 'Phoenix'
const SATRAD_SECTOR_LOCAL_PORTLAND_ID = 'Portland'
const SATRAD_SECTOR_LOCAL_PUERTO_RICO_ID = 'PuertoRico'
const SATRAD_SECTOR_LOCAL_REGINA_ID = 'Regina'
const SATRAD_SECTOR_LOCAL_RHODE_ISLAND_ID = 'Rhode_Island'
const SATRAD_SECTOR_LOCAL_SE_COAST_ID = 'SE_Coast'
const SATRAD_SECTOR_LOCAL_SE_COLORADO_ID = 'SE_Colorado'
const SATRAD_SECTOR_LOCAL_SE_MONTANA_ID = 'SE_Montana'
const SATRAD_SECTOR_LOCAL_SE_ONTARIO_ID = 'SE_Ontario'
const SATRAD_SECTOR_LOCAL_SW_MISSOURI_ID = 'SW_Missouri'
const SATRAD_SECTOR_LOCAL_SW_TEXAS_ID = 'SW_Texas'
const SATRAD_SECTOR_LOCAL_SW_UTAH_ID = 'SW_Utah'
const SATRAD_SECTOR_LOCAL_S_CALIFORNIA_ID = 'S_California'
const SATRAD_SECTOR_LOCAL_S_DAKOTA_ID = 'S_Dakota'
const SATRAD_SECTOR_LOCAL_S_FLORIDA_ID = 'S_Florida'
const SATRAD_SECTOR_LOCAL_S_IDAHO_ID = 'S_Idaho'
const SATRAD_SECTOR_LOCAL_S_ILLINOIS_ID = 'S_Illinois'
const SATRAD_SECTOR_LOCAL_S_MAINE_ID = 'S_Maine'
const SATRAD_SECTOR_LOCAL_S_MINNESOTA_ID = 'S_Minnesota'
const SATRAD_SECTOR_LOCAL_S_OREGON_ID = 'S_Oregon'
const SATRAD_SECTOR_LOCAL_SALT_LAKE_ID = 'Salt_Lake'
const SATRAD_SECTOR_LOCAL_SEATTLE_ID = 'Seattle'
const SATRAD_SECTOR_LOCAL_SERRANIAS_DEL_BURRO_ID = 'Serranias_del_Burro'
const SATRAD_SECTOR_LOCAL_SONORA_ID = 'Sonora'
const SATRAD_SECTOR_LOCAL_SOUX_FALLS_ID = 'Souix_Falls'
const SATRAD_SECTOR_LOCAL_TAHOE_ID = 'Tahoe'
const SATRAD_SECTOR_LOCAL_TENNESSEE_ID = 'Tennessee'
const SATRAD_SECTOR_LOCAL_TRI_STATE_ID = 'Tri_State'
const SATRAD_SECTOR_LOCAL_TURKS_AND_CAICOS_ID = 'Turks_and_Caicos'
const SATRAD_SECTOR_LOCAL_UP_ID = 'UP'
const SATRAD_SECTOR_LOCAL_VERMONT_ID = 'Vermont'
const SATRAD_SECTOR_LOCAL_VIRGINIA_ID = 'Virginia'
const SATRAD_SECTOR_LOCAL_W_MONTANA_ID = 'W_Montana'
const SATRAD_SECTOR_LOCAL_W_VIRGINIA_ID = 'W_Virginia'
const SATRAD_SECTOR_LOCAL_WHITE_SANDS_ID = 'White_Sands'
const SATRAD_SECTOR_LOCAL_WICHITA_FALLS_ID = 'Wichita_Falls'
const SATRAD_SECTOR_LOCAL_WINNIPEG_ID = 'Winnipeg'
const SATRAD_SECTOR_LOCAL_WISCONSIN_ID = 'Wisconsin'
const SATRAD_SECTOR_LOCAL_WYOMING_ID = 'Wyoming'
const SATRAD_SECTOR_LOCAL_YELLOWSTONE_ID = 'Yellowstone'
const SATRAD_SECTOR_LOCAL_YUCATAN_ID = 'Yucatan'
const SATRAD_SECTOR_LOCAL_CA_ST_JOHNS_ID = 'ca_stjohns'

export const SATRAD_SECTORS_LOCAL_NAMER = {
	[SATRAD_SECTOR_LOCAL_ALABAMA_ID]: {
		name: 'Alabama',
		type: 'Geobox',
		coordinates: [
			[31.81, -90.3],
			[35.3, -81.63],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_ARIZONA_ID]: {
		name: 'Arizona',
		type: 'Geobox',
		coordinates: [
			[32.98, -115.82],
			[37.33, -107.68],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_ARKANSAS_ID]: {
		name: 'Arkansas',
		type: 'Geobox',
		coordinates: [
			[-92.4 + local_longitude_modifier, 34.7 - local_latitude_modifier],
			[-92.4 - local_longitude_modifier, 34.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_AUSTIN_ID]: {
		name: 'Austin',
		type: 'Geobox',
		coordinates: [
			[-97.74 + local_longitude_modifier, 30.27 - local_latitude_modifier],
			[-97.74 - local_longitude_modifier, 30.27 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BAHAMAS_ID]: {
		name: 'Bahamas',
		type: 'Geobox',
		coordinates: [
			[-76.8 + local_longitude_modifier, 24.8 - local_latitude_modifier],
			[-76.8 - local_longitude_modifier, 24.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BEATRICE_ID]: {
		name: 'Beatrice',
		type: 'Geobox',
		coordinates: [
			[-96.75 + local_longitude_modifier, 40.26 - local_latitude_modifier],
			[-96.75 - local_longitude_modifier, 40.26 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BERMUDA_ID]: {
		name: 'Bermuda',
		type: 'Geobox',
		coordinates: [
			[-64.7 + local_longitude_modifier, 32.3 - local_latitude_modifier],
			[-64.7 - local_longitude_modifier, 32.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BLACK_HILLS_ID]: {
		name: 'Black Hills',
		type: 'Geobox',
		coordinates: [
			[-103.9 + local_longitude_modifier, 43.7 - local_latitude_modifier],
			[-103.9 - local_longitude_modifier, 43.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BRANDON_ID]: {
		name: 'Brandon',
		type: 'Geobox',
		coordinates: [
			[-101.0 + local_longitude_modifier, 50.0 - local_latitude_modifier],
			[-101.0 - local_longitude_modifier, 50.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BROWNSVILLE_ID]: {
		name: 'Brownsville',
		type: 'Geobox',
		coordinates: [
			[-95.3 + local_longitude_modifier, 25.3 - local_latitude_modifier],
			[-95.3 - local_longitude_modifier, 25.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CABO_ID]: {
		name: 'Cabo',
		type: 'Geobox',
		coordinates: [
			[-109.5 + local_longitude_modifier, 23.2 - local_latitude_modifier],
			[-109.5 - local_longitude_modifier, 23.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CALGARY_ID]: {
		name: 'Calgary',
		type: 'Geobox',
		coordinates: [
			[-113.0 + local_longitude_modifier, 50.5 - local_latitude_modifier],
			[-113.0 - local_longitude_modifier, 50.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CAMPECHE_ID]: {
		name: 'Campeche',
		type: 'Geobox',
		coordinates: [
			[-90.0 + local_longitude_modifier, 20.8 - local_latitude_modifier],
			[-90.0 - local_longitude_modifier, 20.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CAROLINA_ID]: {
		name: 'Carolina',
		type: 'Geobox',
		coordinates: [
			[-81.7 + local_longitude_modifier, 34.8 - local_latitude_modifier],
			[-81.7 - local_longitude_modifier, 34.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CAYMAN_ID]: {
		name: 'Cayman',
		type: 'Geobox',
		coordinates: [
			[-80.0 + local_longitude_modifier, 20.75 - local_latitude_modifier],
			[-80.0 - local_longitude_modifier, 20.75 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CEN_CALIFORNIA_ID]: {
		name: 'Central California',
		type: 'Geobox',
		coordinates: [
			[-120.0 + local_longitude_modifier, 35.0 - local_latitude_modifier],
			[-120.0 - local_longitude_modifier, 35.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CEN_TEXAS_ID]: {
		name: 'Central Texas',
		type: 'Geobox',
		coordinates: [
			[-100.6 + local_longitude_modifier, 32.2 - local_latitude_modifier],
			[-100.6 - local_longitude_modifier, 32.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CHIHUAHUA_ID]: {
		name: 'Chihuahua',
		type: 'Geobox',
		coordinates: [
			[-106.3 + local_longitude_modifier, 29.9 - local_latitude_modifier],
			[-106.3 - local_longitude_modifier, 29.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CLOVIS_ID]: {
		name: 'Clovis',
		type: 'Geobox',
		coordinates: [
			[-102.9 + local_longitude_modifier, 34.6 - local_latitude_modifier],
			[-102.9 - local_longitude_modifier, 34.6 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_COLORADO_ID]: {
		name: 'Colorado',
		type: 'Geobox',
		coordinates: [
			[-105.6 + local_longitude_modifier, 39.8 - local_latitude_modifier],
			[-105.6 - local_longitude_modifier, 39.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_COZUMEL_ID]: {
		name: 'Cozumel',
		type: 'Geobox',
		coordinates: [
			[-85.9 + local_longitude_modifier, 20.4 - local_latitude_modifier],
			[-85.9 - local_longitude_modifier, 20.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_E_WASHINGTON_ID]: {
		name: 'Eastern Washington',
		type: 'Geobox',
		coordinates: [
			[-118.0 + local_longitude_modifier, 46.0 - local_latitude_modifier],
			[-118.0 - local_longitude_modifier, 46.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_FL_PANHANDLE_ID]: {
		name: 'Florida Panhandle',
		type: 'Geobox',
		coordinates: [
			[-84.9 + local_longitude_modifier, 30.0 - local_latitude_modifier],
			[-84.9 - local_longitude_modifier, 30.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_FARGO_ID]: {
		name: 'Fargo',
		type: 'Geobox',
		coordinates: [
			[-96.8 + local_longitude_modifier, 46.86 - local_latitude_modifier],
			[-96.8 - local_longitude_modifier, 46.86 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_FOUR_CORNERS_ID]: {
		name: 'Four Corners',
		type: 'Geobox',
		coordinates: [
			[-109.0 + local_longitude_modifier, 37.0 - local_latitude_modifier],
			[-109.0 - local_longitude_modifier, 37.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_GEORGIA_ID]: {
		name: 'Georgia',
		type: 'Geobox',
		coordinates: [
			[-83.1 + local_longitude_modifier, 32.67 - local_latitude_modifier],
			[-83.1 - local_longitude_modifier, 32.67 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_GRAND_FORKS_ID]: {
		name: 'Grand Forks',
		type: 'Geobox',
		coordinates: [
			[-97.15 + local_longitude_modifier, 48.44 - local_latitude_modifier],
			[-97.15 - local_longitude_modifier, 48.44 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_GULF_STREAM_ID]: {
		name: 'Gulf Stream',
		type: 'Geobox',
		coordinates: [
			[-77.8 + local_longitude_modifier, 27.8 - local_latitude_modifier],
			[-77.8 - local_longitude_modifier, 27.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_HATTERAS_ID]: {
		name: 'Hatteras',
		type: 'Geobox',
		coordinates: [
			[-75.0 + local_longitude_modifier, 35.22 - local_latitude_modifier],
			[-75.0 - local_longitude_modifier, 35.22 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_HAVANA_ID]: {
		name: 'Havana',
		type: 'Geobox',
		coordinates: [
			[-82.3 + local_longitude_modifier, 23.3 - local_latitude_modifier],
			[-82.3 - local_longitude_modifier, 23.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_HISPANIOLA_ID]: {
		name: 'Hispaniola',
		type: 'Geobox',
		coordinates: [
			[-71.0 + local_longitude_modifier, 19.0 - local_latitude_modifier],
			[-71.0 - local_longitude_modifier, 19.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_HOUSTON_ID]: {
		name: 'Houston',
		type: 'Geobox',
		coordinates: [
			[-95.1 + local_longitude_modifier, 28.8 - local_latitude_modifier],
			[-95.1 - local_longitude_modifier, 28.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_INDIANA_ID]: {
		name: 'Indiana',
		type: 'Geobox',
		coordinates: [
			[-86.41 + local_longitude_modifier, 40.17 - local_latitude_modifier],
			[-86.41 - local_longitude_modifier, 40.17 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_IOWA_ID]: {
		name: 'Iowa',
		type: 'Geobox',
		coordinates: [
			[-93.7 + local_longitude_modifier, 42.0 - local_latitude_modifier],
			[-93.7 - local_longitude_modifier, 42.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_JACKSONVILLE_ID]: {
		name: 'Jacksonville',
		type: 'Geobox',
		coordinates: [
			[-80.7 + local_longitude_modifier, 29.9 - local_latitude_modifier],
			[-80.7 - local_longitude_modifier, 29.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_JAMAICA_ID]: {
		name: 'Jamaica',
		type: 'Geobox',
		coordinates: [
			[-76.9 + local_longitude_modifier, 19.3 - local_latitude_modifier],
			[-76.9 - local_longitude_modifier, 19.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_KANSAS_ID]: {
		name: 'Kansas',
		type: 'Geobox',
		coordinates: [
			[-98.2 + local_longitude_modifier, 38.4 - local_latitude_modifier],
			[-98.2 - local_longitude_modifier, 38.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_KELWONA_ID]: {
		name: 'Kelowna',
		type: 'Geobox',
		coordinates: [
			[-120.0 + local_longitude_modifier, 50.0 - local_latitude_modifier],
			[-120.0 - local_longitude_modifier, 50.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_KENTUCKY_ID]: {
		name: 'Kentucky',
		type: 'Geobox',
		coordinates: [
			[-85.65 + local_longitude_modifier, 37.45 - local_latitude_modifier],
			[-85.65 - local_longitude_modifier, 37.45 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_LAKE_ERIE_ID]: {
		name: 'Lake Erie',
		type: 'Geobox',
		coordinates: [
			[-81.04 + local_longitude_modifier, 42.08 - local_latitude_modifier],
			[-81.04 - local_longitude_modifier, 42.08 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_LAKE_HURON_ID]: {
		name: 'Lake Huron',
		type: 'Geobox',
		coordinates: [
			[-82.07 + local_longitude_modifier, 44.53 - local_latitude_modifier],
			[-82.07 - local_longitude_modifier, 44.53 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_LAKE_ONTARIO_ID]: {
		name: 'Lake Ontario',
		type: 'Geobox',
		coordinates: [
			[-77.0 + local_longitude_modifier, 43.0 - local_latitude_modifier],
			[-77.0 - local_longitude_modifier, 43.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_LAKE_SUPERIOR_ID]: {
		name: 'Lake Superior',
		type: 'Geobox',
		coordinates: [
			[-88.0 + local_longitude_modifier, 47.8 - local_latitude_modifier],
			[-88.0 - local_longitude_modifier, 47.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_LAWRENCE_ID]: {
		name: 'Lawrence',
		type: 'Geobox',
		coordinates: [
			[-95.25 + local_longitude_modifier, 38.97 - local_latitude_modifier],
			[-95.25 - local_longitude_modifier, 38.97 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_MADISON_ID]: {
		name: 'Madison',
		type: 'Geobox',
		coordinates: [
			[-89.5 + local_longitude_modifier, 43.07 - local_latitude_modifier],
			[-89.5 - local_longitude_modifier, 43.07 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_MICHIGAN_ID]: {
		name: 'Michigan',
		type: 'Geobox',
		coordinates: [
			[-86.1 + local_longitude_modifier, 42.9 - local_latitude_modifier],
			[-86.1 - local_longitude_modifier, 42.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_MID_BAJA_ID]: {
		name: 'Mid Baja',
		type: 'Geobox',
		coordinates: [
			[-113.2 + local_longitude_modifier, 26.7 - local_latitude_modifier],
			[-113.2 - local_longitude_modifier, 26.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_MISSISSIPPI_ID]: {
		name: 'Mississippi',
		type: 'Geobox',
		coordinates: [
			[-89.5 + local_longitude_modifier, 31.7 - local_latitude_modifier],
			[-89.5 - local_longitude_modifier, 31.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_MITTEN_CI_ID]: {
		name: 'Mitten CI',
		type: 'Geobox',
		coordinates: [
			[-86.1 + local_longitude_modifier, 42.9 - local_latitude_modifier],
			[-86.1 - local_longitude_modifier, 42.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_MONTREAL_ID]: {
		name: 'Montreal',
		type: 'Geobox',
		coordinates: [
			[-73.66 + local_longitude_modifier, 45.54 - local_latitude_modifier],
			[-73.66 - local_longitude_modifier, 45.54 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NC_VA_ID]: {
		name: 'NC VA',
		type: 'Geobox',
		coordinates: [
			[-78.36 + local_longitude_modifier, 36.45 - local_latitude_modifier],
			[-78.36 - local_longitude_modifier, 36.45 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NE_COLORADO_ID]: {
		name: 'NE Colorado',
		type: 'Geobox',
		coordinates: [
			[-103.0 + local_longitude_modifier, 41.0 - local_latitude_modifier],
			[-103.0 - local_longitude_modifier, 41.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NE_MONTANA_ID]: {
		name: 'NE Montana',
		type: 'Geobox',
		coordinates: [
			[-106.8 + local_longitude_modifier, 48.0 - local_latitude_modifier],
			[-106.8 - local_longitude_modifier, 48.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NE_OREGON_ID]: {
		name: 'NE Oregon',
		type: 'Geobox',
		coordinates: [
			[-117.85 + local_longitude_modifier, 45.5 - local_latitude_modifier],
			[-117.85 - local_longitude_modifier, 45.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NE_TEXAS_ID]: {
		name: 'NE Texas',
		type: 'Geobox',
		coordinates: [
			[-95.0 + local_longitude_modifier, 33.0 - local_latitude_modifier],
			[-95.0 - local_longitude_modifier, 33.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_CALIFORNIA_ID]: {
		name: 'N California',
		type: 'Geobox',
		coordinates: [
			[-121.6 + local_longitude_modifier, 40.5 - local_latitude_modifier],
			[-121.6 - local_longitude_modifier, 40.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_DAKOTA_ID]: {
		name: 'N Dakota',
		type: 'Geobox',
		coordinates: [
			[-100.4 + local_longitude_modifier, 49.0 - local_latitude_modifier],
			[-100.4 - local_longitude_modifier, 49.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_ILLINOIS_ID]: {
		name: 'N Illinois',
		type: 'Geobox',
		coordinates: [
			[-88.75 + local_longitude_modifier, 42.0 - local_latitude_modifier],
			[-88.75 - local_longitude_modifier, 42.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_LOUISIANA_ID]: {
		name: 'N Louisiana',
		type: 'Geobox',
		coordinates: [
			[-92.45 + local_longitude_modifier, 32.13 - local_latitude_modifier],
			[-92.45 - local_longitude_modifier, 32.13 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_MINNESOTA_ID]: {
		name: 'N Minnesota',
		type: 'Geobox',
		coordinates: [
			[-93.6 + local_longitude_modifier, 48.12 - local_latitude_modifier],
			[-93.6 - local_longitude_modifier, 48.12 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_MISSISSIPPI_ID]: {
		name: 'N Mississippi',
		type: 'Geobox',
		coordinates: [
			[-89.56 + local_longitude_modifier, 33.94 - local_latitude_modifier],
			[-89.56 - local_longitude_modifier, 33.94 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_N_NEW_MEXICO_ID]: {
		name: 'N New Mexico',
		type: 'Geobox',
		coordinates: [
			[-106.0 + local_longitude_modifier, 35.6 - local_latitude_modifier],
			[-106.0 - local_longitude_modifier, 35.6 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NEBRASKA_ID]: {
		name: 'Nebraska',
		type: 'Geobox',
		coordinates: [
			[-99.68 + local_longitude_modifier, 41.3 - local_latitude_modifier],
			[-99.68 - local_longitude_modifier, 41.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NEVADA_ID]: {
		name: 'Nevada',
		type: 'Geobox',
		coordinates: [
			[-116.3 + local_longitude_modifier, 39.4 - local_latitude_modifier],
			[-116.3 - local_longitude_modifier, 39.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NEW_BRUNSWICK_ID]: {
		name: 'New Brunswick',
		type: 'Geobox',
		coordinates: [
			[-66.1 + local_longitude_modifier, 46.33 - local_latitude_modifier],
			[-66.1 - local_longitude_modifier, 46.33 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NEW_JERSEY_ID]: {
		name: 'New Jersey',
		type: 'Geobox',
		coordinates: [
			[-74.34 + local_longitude_modifier, 40.22 - local_latitude_modifier],
			[-74.34 - local_longitude_modifier, 40.22 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NEW_ORLEANS_ID]: {
		name: 'New Orleans',
		type: 'Geobox',
		coordinates: [
			[-90.0 + local_longitude_modifier, 29.3 - local_latitude_modifier],
			[-90.0 - local_longitude_modifier, 29.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NEWFOUNDLAND_ID]: {
		name: 'Newfoundland',
		type: 'Geobox',
		coordinates: [
			[-57.75 + local_longitude_modifier, 47.17 - local_latitude_modifier],
			[-57.75 - local_longitude_modifier, 47.17 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NOVA_SCOTIA_ID]: {
		name: 'Nova Scotia',
		type: 'Geobox',
		coordinates: [
			[-62.2 + local_longitude_modifier, 44.65 - local_latitude_modifier],
			[-62.2 - local_longitude_modifier, 44.65 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NUEVO_LEON_ID]: {
		name: 'Nuevo Leon',
		type: 'Geobox',
		coordinates: [
			[-99.6 + local_longitude_modifier, 25.77 - local_latitude_modifier],
			[-99.6 - local_longitude_modifier, 25.77 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_OHIO_ID]: {
		name: 'Ohio',
		type: 'Geobox',
		coordinates: [
			[-82.5 + local_longitude_modifier, 40.2 - local_latitude_modifier],
			[-82.5 - local_longitude_modifier, 40.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_OKLAHOMA_ID]: {
		name: 'Oklahoma',
		type: 'Geobox',
		coordinates: [
			[-97.0 + local_longitude_modifier, 35.4 - local_latitude_modifier],
			[-97.0 - local_longitude_modifier, 35.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_ORLANDO_ID]: {
		name: 'Orlando',
		type: 'Geobox',
		coordinates: [
			[-82.46 + local_longitude_modifier, 28.0 - local_latitude_modifier],
			[-82.46 - local_longitude_modifier, 28.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_PHOENIX_ID]: {
		name: 'Phoenix',
		type: 'Geobox',
		coordinates: [
			[-111.92 + local_longitude_modifier, 33.59 - local_latitude_modifier],
			[-111.92 - local_longitude_modifier, 33.59 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_PORTLAND_ID]: {
		name: 'Portland',
		type: 'Geobox',
		coordinates: [
			[-122.7 + local_longitude_modifier, 45.5 - local_latitude_modifier],
			[-122.7 - local_longitude_modifier, 45.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_PUERTO_RICO_ID]: {
		name: 'Puerto Rico',
		type: 'Geobox',
		coordinates: [
			[-66.11 + local_longitude_modifier, 18.22 - local_latitude_modifier],
			[-66.11 - local_longitude_modifier, 18.22 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_REGINA_ID]: {
		name: 'Regina',
		type: 'Geobox',
		coordinates: [
			[-104.6 + local_longitude_modifier, 50.45 - local_latitude_modifier],
			[-104.6 - local_longitude_modifier, 50.45 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_RHODE_ISLAND_ID]: {
		name: 'Rhode Island',
		type: 'Geobox',
		coordinates: [
			[-71.05 + local_longitude_modifier, 41.86 - local_latitude_modifier],
			[-71.05 - local_longitude_modifier, 41.86 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SE_COAST_ID]: {
		name: 'SE Coast',
		type: 'Geobox',
		coordinates: [
			[-78.5 + local_longitude_modifier, 31.9 - local_latitude_modifier],
			[-78.5 - local_longitude_modifier, 31.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SE_COLORADO_ID]: {
		name: 'SE Colorado',
		type: 'Geobox',
		coordinates: [
			[-103.2 + local_longitude_modifier, 38.1 - local_latitude_modifier],
			[-103.2 - local_longitude_modifier, 38.1 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SE_MONTANA_ID]: {
		name: 'SE Montana',
		type: 'Geobox',
		coordinates: [
			[-106.8 + local_longitude_modifier, 45.7 - local_latitude_modifier],
			[-106.8 - local_longitude_modifier, 45.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SE_ONTARIO_ID]: {
		name: 'SE Ontario',
		type: 'Geobox',
		coordinates: [
			[-80.0 + local_longitude_modifier, 43.4 - local_latitude_modifier],
			[-80.0 - local_longitude_modifier, 43.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SW_MISSOURI_ID]: {
		name: 'SW Missouri',
		type: 'Geobox',
		coordinates: [
			[-93.2 + local_longitude_modifier, 37.8 - local_latitude_modifier],
			[-93.2 - local_longitude_modifier, 37.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SW_TEXAS_ID]: {
		name: 'SW Texas',
		type: 'Geobox',
		coordinates: [
			[-102.9 + local_longitude_modifier, 30.65 - local_latitude_modifier],
			[-102.9 - local_longitude_modifier, 30.65 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SW_UTAH_ID]: {
		name: 'SW Utah',
		type: 'Geobox',
		coordinates: [
			[-113.2 + local_longitude_modifier, 37.2 - local_latitude_modifier],
			[-113.2 - local_longitude_modifier, 37.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_CALIFORNIA_ID]: {
		name: 'S California',
		type: 'Geobox',
		coordinates: [
			[-117.5 + local_longitude_modifier, 33.3 - local_latitude_modifier],
			[-117.5 - local_longitude_modifier, 33.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_DAKOTA_ID]: {
		name: 'S Dakota',
		type: 'Geobox',
		coordinates: [
			[-100.0 + local_longitude_modifier, 44.25 - local_latitude_modifier],
			[-100.0 - local_longitude_modifier, 44.25 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_FLORIDA_ID]: {
		name: 'S Florida',
		type: 'Geobox',
		coordinates: [
			[-81.09 + local_longitude_modifier, 24.8 - local_latitude_modifier],
			[-81.09 - local_longitude_modifier, 24.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_IDAHO_ID]: {
		name: 'S Idaho',
		type: 'Geobox',
		coordinates: [
			[-114.0 + local_longitude_modifier, 43.4 - local_latitude_modifier],
			[-114.0 - local_longitude_modifier, 43.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_ILLINOIS_ID]: {
		name: 'S Illinois',
		type: 'Geobox',
		coordinates: [
			[-89.25 + local_longitude_modifier, 37.84 - local_latitude_modifier],
			[-89.25 - local_longitude_modifier, 37.84 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_MAINE_ID]: {
		name: 'S Maine',
		type: 'Geobox',
		coordinates: [
			[-69.0 + local_longitude_modifier, 43.75 - local_latitude_modifier],
			[-69.0 - local_longitude_modifier, 43.75 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_MINNESOTA_ID]: {
		name: 'S Minnesota',
		type: 'Geobox',
		coordinates: [
			[-94.3 + local_longitude_modifier, 45.1 - local_latitude_modifier],
			[-94.3 - local_longitude_modifier, 45.1 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_S_OREGON_ID]: {
		name: 'S Oregon',
		type: 'Geobox',
		coordinates: [
			[-121.2 + local_longitude_modifier, 43.0 - local_latitude_modifier],
			[-121.2 - local_longitude_modifier, 43.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SALT_LAKE_ID]: {
		name: 'Salt Lake',
		type: 'Geobox',
		coordinates: [
			[-110.9 + local_longitude_modifier, 40.7 - local_latitude_modifier],
			[-110.9 - local_longitude_modifier, 40.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SEATTLE_ID]: {
		name: 'Seattle',
		type: 'Geobox',
		coordinates: [
			[-122.6 + local_longitude_modifier, 48.4 - local_latitude_modifier],
			[-122.6 - local_longitude_modifier, 48.4 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SERRANIAS_DEL_BURRO_ID]: {
		name: 'Serranias del Burro',
		type: 'Geobox',
		coordinates: [
			[-101.0 + local_longitude_modifier, 27.9 - local_latitude_modifier],
			[-101.0 - local_longitude_modifier, 27.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SONORA_ID]: {
		name: 'Sonora',
		type: 'Geobox',
		coordinates: [
			[-112.2 + local_longitude_modifier, 30.6 - local_latitude_modifier],
			[-112.2 - local_longitude_modifier, 30.6 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SOUX_FALLS_ID]: {
		name: 'Souix Falls',
		type: 'Geobox',
		coordinates: [
			[-96.73 + local_longitude_modifier, 43.53 - local_latitude_modifier],
			[-96.73 - local_longitude_modifier, 43.53 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_TAHOE_ID]: {
		name: 'Tahoe',
		type: 'Geobox',
		coordinates: [
			[-120.3 + local_longitude_modifier, 38.2 - local_latitude_modifier],
			[-120.3 - local_longitude_modifier, 38.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_TENNESSEE_ID]: {
		name: 'Tennessee',
		type: 'Geobox',
		coordinates: [
			[-86.02 + local_longitude_modifier, 35.6 - local_latitude_modifier],
			[-86.02 - local_longitude_modifier, 35.6 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_TRI_STATE_ID]: {
		name: 'Tri State',
		type: 'Geobox',
		coordinates: [
			[-91.4 + local_longitude_modifier, 40.06 - local_latitude_modifier],
			[-91.4 - local_longitude_modifier, 40.06 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_TURKS_AND_CAICOS_ID]: {
		name: 'Turks and Caicos',
		type: 'Geobox',
		coordinates: [
			[-72.7 + local_longitude_modifier, 21.8 - local_latitude_modifier],
			[-72.7 - local_longitude_modifier, 21.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_UP_ID]: {
		name: 'UP',
		type: 'Geobox',
		coordinates: [
			[-87.2 + local_longitude_modifier, 46.0 - local_latitude_modifier],
			[-87.2 - local_longitude_modifier, 46.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_VERMONT_ID]: {
		name: 'Vermont',
		type: 'Geobox',
		coordinates: [
			[-72.74 + local_longitude_modifier, 43.92 - local_latitude_modifier],
			[-72.74 - local_longitude_modifier, 43.92 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_VIRGINIA_ID]: {
		name: 'Virginia',
		type: 'Geobox',
		coordinates: [
			[-76.8 + local_longitude_modifier, 38.8 - local_latitude_modifier],
			[-76.8 - local_longitude_modifier, 38.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_W_MONTANA_ID]: {
		name: 'W Montana',
		type: 'Geobox',
		coordinates: [
			[-113.2 + local_longitude_modifier, 47.8 - local_latitude_modifier],
			[-113.2 - local_longitude_modifier, 47.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_W_VIRGINIA_ID]: {
		name: 'W Virginia',
		type: 'Geobox',
		coordinates: [
			[-80.45 + local_longitude_modifier, 38.71 - local_latitude_modifier],
			[-80.45 - local_longitude_modifier, 38.71 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_WHITE_SANDS_ID]: {
		name: 'White Sands',
		type: 'Geobox',
		coordinates: [
			[-106.3 + local_longitude_modifier, 32.5 - local_latitude_modifier],
			[-106.3 - local_longitude_modifier, 32.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_WICHITA_FALLS_ID]: {
		name: 'Wichita Falls',
		type: 'Geobox',
		coordinates: [
			[-98.48 + local_longitude_modifier, 33.91 - local_latitude_modifier],
			[-98.48 - local_longitude_modifier, 33.91 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_WINNIPEG_ID]: {
		name: 'Winnipeg',
		type: 'Geobox',
		coordinates: [
			[-96.4 + local_longitude_modifier, 50.0 - local_latitude_modifier],
			[-96.4 - local_longitude_modifier, 50.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_WISCONSIN_ID]: {
		name: 'Wisconsin',
		type: 'Geobox',
		coordinates: [
			[-89.52 + local_longitude_modifier, 45.1 - local_latitude_modifier],
			[-89.52 - local_longitude_modifier, 45.1 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_WYOMING_ID]: {
		name: 'Wyoming',
		type: 'Geobox',
		coordinates: [
			[-107.0 + local_longitude_modifier, 42.5 - local_latitude_modifier],
			[-107.0 - local_longitude_modifier, 42.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_YELLOWSTONE_ID]: {
		name: 'Yellowstone',
		type: 'Geobox',
		coordinates: [
			[-112.0 + local_longitude_modifier, 45.0 - local_latitude_modifier],
			[-112.0 - local_longitude_modifier, 45.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_YUCATAN_ID]: {
		name: 'Yucatan',
		type: 'Geobox',
		coordinates: [
			[-90.0 + local_longitude_modifier, 20.8 - local_latitude_modifier],
			[-90.0 - local_longitude_modifier, 20.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_CA_ST_JOHNS_ID]: {
		name: 'St. Johns, Newfoundland',
		type: 'Geobox',
		coordinates: [
			[-52.71 + local_longitude_modifier, 47.0 - local_latitude_modifier],
			[-52.71 - local_longitude_modifier, 47.0 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
}

const SATRAD_SECTOR_LOCAL_ANCHORAGE_ID = 'Anchorage'
const SATRAD_SECTOR_LOCAL_BETHEL_ID = 'Bethel'
const SATRAD_SECTOR_LOCAL_COLD_BAY_ID = 'ColdBay'
const SATRAD_SECTOR_LOCAL_DUTCH_HARBOR_ID = 'DutchHarbor'
const SATRAD_SECTOR_LOCAL_FAIRBANKS_ID = 'Fairbanksub'
const SATRAD_SECTOR_LOCAL_JUNEAU_ID = 'Juneau'
const SATRAD_SECTOR_LOCAL_KING_SALMON_ID = 'KingSalmon'
const SATRAD_SECTOR_LOCAL_NOME_ID = 'Nome'
const SATRAD_SECTOR_LOCAL_SAINT_PAUL_ID = 'SaintPaul'
const SATRAD_SECTOR_LOCAL_YAKUTAT_ID = 'Yakutat'
const SATRAD_SECTOR_LOCAL_UNALAKLEET_ID = 'Unalakleet'
const SATRAD_SECTOR_LOCAL_UTQIAGVIK_ID = 'Utqiagvik'

export const SATRAD_SECTORS_LOCAL_ALASKA = {
	[SATRAD_SECTOR_LOCAL_ANCHORAGE_ID]: {
		name: 'Anchorage',
		type: 'Geobox',
		coordinates: [
			[-149.9 + local_longitude_modifier, 61.2 - local_latitude_modifier],
			[-149.9 - local_longitude_modifier, 61.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_BETHEL_ID]: {
		name: 'Bethel',
		type: 'Geobox',
		coordinates: [
			[-161.77 + local_longitude_modifier, 60.8 - local_latitude_modifier],
			[-161.77 - local_longitude_modifier, 60.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_COLD_BAY_ID]: {
		name: 'Cold Bay',
		type: 'Geobox',
		coordinates: [
			[-162.71 + local_longitude_modifier, 55.2 - local_latitude_modifier],
			[-162.71 - local_longitude_modifier, 55.2 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_DUTCH_HARBOR_ID]: {
		name: 'Dutch Harbor',
		type: 'Geobox',
		coordinates: [
			[-166.55 + local_longitude_modifier, 53.9 - local_latitude_modifier],
			[-166.55 - local_longitude_modifier, 53.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_FAIRBANKS_ID]: {
		name: 'Fairbanks',
		type: 'Geobox',
		coordinates: [
			[-147.7 + local_longitude_modifier, 64.8 - local_latitude_modifier],
			[-147.7 - local_longitude_modifier, 64.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_JUNEAU_ID]: {
		name: 'Juneau',
		type: 'Geobox',
		coordinates: [
			[-134.2 + local_longitude_modifier, 58.15 - local_latitude_modifier],
			[-134.2 - local_longitude_modifier, 58.15 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_KING_SALMON_ID]: {
		name: 'King Salmon',
		type: 'Geobox',
		coordinates: [
			[-156.66 + local_longitude_modifier, 58.7 - local_latitude_modifier],
			[-156.66 - local_longitude_modifier, 58.7 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_NOME_ID]: {
		name: 'Nome',
		type: 'Geobox',
		coordinates: [
			[-165.41 + local_longitude_modifier, 64.5 - local_latitude_modifier],
			[-165.41 - local_longitude_modifier, 64.5 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_SAINT_PAUL_ID]: {
		name: 'Saint Paul',
		type: 'Geobox',
		coordinates: [
			[-160.15 + local_longitude_modifier, 58.8 - local_latitude_modifier],
			[-160.15 - local_longitude_modifier, 58.8 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_YAKUTAT_ID]: {
		name: 'Yakutat',
		type: 'Geobox',
		coordinates: [
			[-139.88 + local_longitude_modifier, 59.85 - local_latitude_modifier],
			[-139.88 - local_longitude_modifier, 59.85 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_UNALAKLEET_ID]: {
		name: 'Unalakleet',
		type: 'Geobox',
		coordinates: [
			[-160.79 + local_longitude_modifier, 63.89 - local_latitude_modifier],
			[-160.79 - local_longitude_modifier, 63.89 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_UTQIAGVIK_ID]: {
		name: 'Utqiagvik',
		type: 'Geobox',
		coordinates: [
			[-156.79 + local_longitude_modifier, 71.3 - local_latitude_modifier],
			[-156.79 - local_longitude_modifier, 71.3 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
}

const SATRAD_SECTOR_LOCAL_HI_BIG_ISLAND_ID = 'HI_BigIsland'
const SATRAD_SECTOR_LOCAL_HI_CEN_ISL_ID = 'HI_CenIsl'
const SATRAD_SECTOR_LOCAL_HI_WRN_ISL_ID = 'HI_WrnIsl'

export const SATRAD_SECTORS_LOCAL_HAWAII = {
	[SATRAD_SECTOR_LOCAL_HI_BIG_ISLAND_ID]: {
		name: 'Big Island',
		type: 'Geobox',
		coordinates: [
			[-155.5 + local_longitude_modifier, 19.65 - local_latitude_modifier],
			[-155.5 - local_longitude_modifier, 19.65 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_HI_CEN_ISL_ID]: {
		name: 'Central Islands',
		type: 'Geobox',
		coordinates: [
			[-156.6 + local_longitude_modifier, 20.9 - local_latitude_modifier],
			[-156.6 - local_longitude_modifier, 20.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
	[SATRAD_SECTOR_LOCAL_HI_WRN_ISL_ID]: {
		name: 'Western Islands',
		type: 'Geobox',
		coordinates: [
			[-158.9 + local_longitude_modifier, 21.9 - local_latitude_modifier],
			[-158.9 - local_longitude_modifier, 21.9 + local_latitude_modifier],
		],
		products: SATRAD_PRODUCTS,
	},
}
