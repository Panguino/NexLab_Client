export const FORECAST_REGION_CONUS_ID = 'CONUS'
export const FORECAST_REGION_NAMER_ID = 'NAMER'

export const FORECAST_REGIONS = {
	[FORECAST_REGION_CONUS_ID]: {
		label: 'Regional Sectors',
		rotate: [98, -40],
		scale: 2,
	},
	[FORECAST_REGION_NAMER_ID]: {
		label: 'Large Sectors',
		rotate: [100, -30],
		scale: 0.75,
	},
}
