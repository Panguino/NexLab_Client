// CPC products
export const CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID = '6_14_outlook'
export const CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID = 'monthly_outlook'
export const CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID = 'seasonal_temp_outlook'
export const CLIMATE_TEXT_PRODUCT_SEASONAL_PRECIP_OUTLOOK_ID = 'seasonal_precip_outlook'
export const CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID = 'hawaiian_outlook'
export const CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID = 'tropical_pacific_sst'
// SSTOLR products
export const CLIMATE_TEXT_PRODUCT_SST_ID = 'sst'
export const CLIMATE_TEXT_PRODUCT_SST_ANOMALY_ID = 'ssta'
export const CLIMATE_TEXT_PRODUCT_OLR_1_DAY_MEAN_ID = 'olr_1day_mean'
export const CLIMATE_TEXT_PRODUCT_OLR_7_DAY_MEAN_ID = 'olr_7day_mean'
export const CLIMATE_TEXT_PRODUCT_OLR_30_DAY_MEAN_ID = 'olr_30day_mean'
export const CLIMATE_TEXT_PRODUCT_OLR_90_DAY_MEAN_ID = 'olr_90day_mean'
export const CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_1_DAY_MEAN_ID = 'olr_1day_anom'
export const CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_7_DAY_MEAN_ID = 'olr_7day_anom'
export const CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_30_DAY_MEAN_ID = 'olr_30day_anom'
export const CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_90_DAY_MEAN_ID = 'olr_90day_anom'

export const CLIMATE_TEXT_PRODUCTS = {
	[CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID]: {
		label: '6-14 Day Outlook',
		prodQueryString: 'KWBC/FXUS06_PMDMRD',
	},
	[CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID]: {
		label: 'Monthly Outlook',
		prodQueryString: 'KWBC/FXUS07_PMD30D',
	},
	[CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID]: {
		label: 'Seasonal Outlook (Temperature)',
		prodQueryString: 'KWBC/FXUS05_PMD90D',
	},
	[CLIMATE_TEXT_PRODUCT_SEASONAL_PRECIP_OUTLOOK_ID]: {
		label: 'Seasonal Outlook (Precipitation)',
		prodQueryString: 'KWBC/FXUS05_PMD90D',
	},
	[CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID]: {
		label: 'Hawaiian Outlook',
		prodQueryString: 'KWBC/FXHW40_PMDHCO',
	},
	[CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID]: {
		label: 'Tropical Pacific Mean SST Outlook',
		prodQueryString: 'KWNC/FXUS23_PMDSST',
	},
}

export const CLIMATE_SSTOLR_PRODUCTS = [
	{ id: CLIMATE_TEXT_PRODUCT_SST_ID, name: 'Sea Surface Temperature (SST)' },
	{ id: CLIMATE_TEXT_PRODUCT_SST_ANOMALY_ID, name: 'SST Anomaly' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_1_DAY_MEAN_ID, name: 'OLR 1-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_7_DAY_MEAN_ID, name: 'OLR 7-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_30_DAY_MEAN_ID, name: 'OLR 30-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_90_DAY_MEAN_ID, name: 'OLR 90-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_1_DAY_MEAN_ID, name: 'OLR Anomaly 1-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_7_DAY_MEAN_ID, name: 'OLR Anomaly 7-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_30_DAY_MEAN_ID, name: 'OLR Anomaly 30-Day Mean' },
	{ id: CLIMATE_TEXT_PRODUCT_OLR_ANOMALY_90_DAY_MEAN_ID, name: 'OLR Anomaly 90-Day Mean' },
]
