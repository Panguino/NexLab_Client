export const HYDRO_TEXT_PRODUCT_ERO_ID = 'ero'
export const HYDRO_TEXT_PRODUCT_QPF_DAY1_ID = 'qpfday1'
export const HYDRO_TEXT_PRODUCT_QPF_DAY2_ID = 'qpfday2'
export const HYDRO_TEXT_PRODUCT_QPF_DAY3_ID = 'qpfday3'
export const HYDRO_TEXT_PRODUCT_QPF_DAY4_5_ID = 'qpfday45'
export const HYDRO_TEXT_PRODUCT_QPF_DAY6_7_ID = 'qpfday67'
export const HYDRO_TEXT_PRODUCT_QPF_DAY1_2_ID = 'qpfday12'
export const HYDRO_TEXT_PRODUCT_QPF_DAY1_3_ID = 'qpfday13'
export const HYDRO_TEXT_PRODUCT_QPF_DAY1_5_ID = 'qpfday15'
export const HYDRO_TEXT_PRODUCT_QPF_DAY1_7_ID = 'qpfday17'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_1HR_ID = '1HR'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_3HR_ID = '3HR'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_6HR_ID = '6HR'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_12HR_ID = '12HR'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_24HR_ID = '24HR'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_48HR_ID = '48HR'
export const HYDRO_TEXT_PRODUCT_MRMS_QPE_72HR_ID = '72HR'
export const HYDRO_TEXT_PRODUCT_FFG_1HR_ID = 'ffg-1hr'
export const HYDRO_TEXT_PRODUCT_FFG_3HR_ID = 'ffg-3hr'
export const HYDRO_TEXT_PRODUCT_FFG_6HR_ID = 'ffg-6hr'
// pils = "ESP,FFG,FFH,HMD,HYD,QPFERD,SPE,CRF,SWE,ESG".split(",")
export const HYDRO_TEXT_PRODUCT_CRF_ID = 'CRF'
export const HYDRO_TEXT_PRODUCT_ESG_ID = 'ESG'
export const HYDRO_TEXT_PRODUCT_ESP_ID = 'ESP'
export const HYDRO_TEXT_PRODUCT_FFG_ID = 'FFG'
export const HYDRO_TEXT_PRODUCT_FFH_ID = 'FFH'
export const HYDRO_TEXT_PRODUCT_HMD_ID = 'HMD'
export const HYDRO_TEXT_PRODUCT_HYD_ID = 'HYD'
export const HYDRO_TEXT_PRODUCT_SWE_ID = 'SWE'

// export const HYDRO_ERO_PRODUCTS = {
// 	[HYDRO_TEXT_PRODUCT_ERO_ID]: {
// 		label: 'ERO',
// 	},
// 	[HYDRO_TEXT_PRODUCT_ERO_DAY2_ID]: {
// 		label: 'Day 2',
// 		productQueryString: 'KWBC/FOUS30_QPFERD',
// 	},
// 	[HYDRO_TEXT_PRODUCT_ERO_DAY3_ID]: {
// 		label: 'Day 3',
// 		productQueryString: 'KWBC/FOUS30_QPFERD',
// 	},
// }

export const HYDRO_TEXT_MRMS_QPE_PRODUCTS = {
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_1HR_ID]: {
		label: '1 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/01/mrmsqpe_01_latest.png',
	},
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_3HR_ID]: {
		label: '3 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/03/mrmsqpe_03_latest.png',
	},
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_6HR_ID]: {
		label: '6 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/06/mrmsqpe_06_latest.png',
	},
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_12HR_ID]: {
		label: '12 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/12/mrmsqpe_12_latest.png',
	},
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_24HR_ID]: {
		label: '24 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/24/mrmsqpe_24_latest.png',
	},
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_48HR_ID]: {
		label: '48 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/48/mrmsqpe_48_latest.png',
	},
	[HYDRO_TEXT_PRODUCT_MRMS_QPE_72HR_ID]: {
		label: '72 Hr',
		latest: 'https://weather.cod.edu/cdata/text/images/mrms/msqpe/72/mrmsqpe_72_latest.png',
	},
}

export const HYDRO_FFG_PRODUCTS = {
	[HYDRO_TEXT_PRODUCT_FFG_1HR_ID]: {
		label: '1 Hr',
	},
	[HYDRO_TEXT_PRODUCT_FFG_3HR_ID]: {
		label: '3 Hr',
	},
	[HYDRO_TEXT_PRODUCT_FFG_6HR_ID]: {
		label: '6 Hr',
	},
}

export const HYDRO_TEXT_PRODUCTS = {
	[HYDRO_TEXT_PRODUCT_CRF_ID]: {
		label: 'Contingency River Forecast',
	},
	[HYDRO_TEXT_PRODUCT_ESG_ID]: {
		label: 'Extended Streamflow Guidance',
	},
	[HYDRO_TEXT_PRODUCT_ESP_ID]: {
		label: 'Ensemble Streamflow Prediction',
	},
	[HYDRO_TEXT_PRODUCT_FFG_ID]: {
		label: 'Flash Flood Guidance',
	},
	[HYDRO_TEXT_PRODUCT_FFH_ID]: {
		label: 'Headwater Guidance',
	},
	[HYDRO_TEXT_PRODUCT_HMD_ID]: {
		label: 'Hydrometeorological Discussion',
	},
	[HYDRO_TEXT_PRODUCT_HYD_ID]: {
		label: 'Daily Hydrologic Products',
	},
	[HYDRO_TEXT_PRODUCT_SWE_ID]: {
		label: 'Snow Water Equivalent',
	},
}
