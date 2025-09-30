export const SURFACE_PRODUCT_FRONTS = 'fronts'
export const SURFACE_PRODUCT_RAW = 'raw'
export const SURFACE_PRODUCT_MOISTURE_DIVERGENCE = 'mdiv'
export const SURFACE_PRODUCT_THETAE = 'thte'
export const SURFACE_PRODUCT_TEMPERATURE_SLP = 'tpsl'
export const SURFACE_PRODUCT_PRESSURE_FALLS = 'pfalls'
export const SURFACE_PRODUCT_PDF = 'pdf'
export const SURFACE_PRODUCT_METARS = 'metar'
export const SURFACE_PRODUCT_DECODED_OBS = 'cooked'
export const SURFACE_PRODUCT_DEFAULT = SURFACE_PRODUCT_RAW

export const ALL_SURFACE_PRODUCTS = {
	[SURFACE_PRODUCT_FRONTS]: {
		label: 'Frontal Analysis',
	},
	[SURFACE_PRODUCT_RAW]: {
		label: 'Station Plots',
		infoId: 't6jq4sc2wkkxfku7zhfmhw2h',
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
	[SURFACE_PRODUCT_METARS]: {
		label: 'Raw METARs',
	},
	[SURFACE_PRODUCT_DECODED_OBS]: {
		label: 'Decoded Observations',
	},
}
