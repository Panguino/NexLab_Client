export const FORECAST_TEXT_PRODUCT_SHORT_TERM_FORECAST_DISCUSSION_ID = 'short-range-discussion'
export const FORECAST_TEXT_PRODUCT_EXTENDED_FORECAST_DISCUSSION_ID = 'extended-discussion'
export const FORECAST_TEXT_PRODUCT_6_TO_14_DAY_DISCUSSION_ID = '6-14-discussion'
export const FORECAST_TEXT_PRODUCT_ALASKA_EXTENDED_DISCUSSION_ID = 'alaska-extended-discussion'
export const FORECAST_TEXT_PRODUCT_HAWAII_EXTENDED_DISCUSSION_ID = 'hawaii-extended-discussion'
export const FORECAST_TEXT_PRODUCT_SOUTH_AMERICA_DISCUSSION_ID = 'south-america-discussion'
export const FORECAST_TEXT_PRODUCT_WPC_FRONTS_12HR_ID = 'wpc-fronts-12hr'
export const FORECAST_TEXT_PRODUCT_WPC_FRONTS_24HR_ID = 'wpc-fronts-24hr'
export const FORECAST_TEXT_PRODUCT_WPC_FRONTS_36HR_ID = 'wpc-fronts-36hr'
export const FORECAST_TEXT_PRODUCT_WPC_FRONTS_48HR_ID = 'wpc-fronts-48hr'

export const FORECAST_TEXT_PRODUCTS = {
	[FORECAST_TEXT_PRODUCT_SHORT_TERM_FORECAST_DISCUSSION_ID]: {
		label: 'Short Term Forecast Discussion',
	},
	[FORECAST_TEXT_PRODUCT_EXTENDED_FORECAST_DISCUSSION_ID]: {
		label: 'Extended Forecast Discussion',
	},
	[FORECAST_TEXT_PRODUCT_6_TO_14_DAY_DISCUSSION_ID]: {
		label: '6-14 Day Discussion',
	},
	[FORECAST_TEXT_PRODUCT_ALASKA_EXTENDED_DISCUSSION_ID]: {
		label: 'Alaska Extended Discussion',
	},
	[FORECAST_TEXT_PRODUCT_HAWAII_EXTENDED_DISCUSSION_ID]: {
		label: 'Hawaii Extended Discussion',
	},
	[FORECAST_TEXT_PRODUCT_SOUTH_AMERICA_DISCUSSION_ID]: {
		label: 'South America Discussion',
	},
}
export const FORECAST_TEXT_WPC_FRONT_PRODUCTS = {
	[FORECAST_TEXT_PRODUCT_WPC_FRONTS_12HR_ID]: {
		label: '12 Hour',
		queryId: '12HR',
		latest: 'https://weather.cod.edu/cdata/text/images/wpc-fronts/12hr/wpc-fronts_12hr_latest.gif',
	},
	[FORECAST_TEXT_PRODUCT_WPC_FRONTS_24HR_ID]: {
		label: '24 Hour',
		queryId: '24HR',
		latest: 'https://weather.cod.edu/cdata/text/images/wpc-fronts/24hr/wpc-fronts_24hr_latest.gif',
	},
	[FORECAST_TEXT_PRODUCT_WPC_FRONTS_36HR_ID]: {
		label: '36 Hour',
		queryId: '36HR',
		latest: 'https://weather.cod.edu/cdata/text/images/wpc-fronts/36hr/wpc-fronts_36hr_latest.gif',
	},
	[FORECAST_TEXT_PRODUCT_WPC_FRONTS_48HR_ID]: {
		label: '48 Hour',
		queryId: '48HR',
		latest: 'https://weather.cod.edu/cdata/text/images/wpc-fronts/48hr/wpc-fronts_48hr_latest.gif',
	},
}
