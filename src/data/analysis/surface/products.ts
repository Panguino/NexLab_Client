export const SURFACE_PRODUCT_FRONTS = 'fronts'
export const SURFACE_PRODUCT_RAW = 'raw'
export const SURFACE_PRODUCT_MOISTURE_DIVERGENCE = 'mdiv'
export const SURFACE_PRODUCT_THETAE = 'thte'
export const SURFACE_PRODUCT_TEMPERATURE_SLP = 'tpsl'
export const SURFACE_PRODUCT_PRESSURE_FALLS = 'pfalls'
export const SURFACE_PRODUCT_PDF = 'pdf'

export const ALL_PRODUCTS = {
	[SURFACE_PRODUCT_FRONTS]: {
		label: 'Frontal Analysis',
	},
	[SURFACE_PRODUCT_RAW]: {
		label: 'Station Plots',
	},
	[SURFACE_PRODUCT_MOISTURE_DIVERGENCE]: {
		label: 'Moisture Convergence',
	},
	[SURFACE_PRODUCT_THETAE]: {
		label: 'Theta-E',
	},
	[SURFACE_PRODUCT_TEMPERATURE_SLP]: {
		label: 'Temperature and SLP',
	},
	[SURFACE_PRODUCT_PDF]: {
		label: 'PDF',
	},
}
