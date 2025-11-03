// there's a little freedom in naming these this time around
// but we'll try to keep them as relevant as possible

// for all basins
const ATLANTIC_TROPICAL_WEATHER_OUTLOOK = 'TWOAT'
const EASTERN_PACIFIC_TROPICAL_WEATHER_OUTLOOK = 'TWOEP'
const CENTRAL_PACIFIC_TROPICAL_WEATHER_OUTLOOK = 'TWOCP'
const NORTH_ATLANTIC_TROPICAL_DISCUSSION = 'TWDAT'
const EASTERN_PACIFIC_TROPICAL_DISCUSSION = 'TWDEP'

// storm specific - these require storm IDs
// these loosely come from pil codes - sans wallet number - making them generalized
const TROPICAL_CYCLONE_PUBLIC_ADVISORY = 'TCP'
const TROPICAL_CYCLONE_FORECAST_ADVISORY = 'TCM'
const TROPICAL_CYCLONE_FORECAST_DISCUSSION = 'TCD'
const TROPICAL_CYCLONE_AVIATION_ADVISORY = 'TCA'
const TROPICAL_CYCLONE_WIND_SPEED_PROBABILITIES = 'PWS'

// these are graphical storm specific products
const TROPICAL_CYCLONE_MIN_PRESSURE_FORECAST = 'pmin'
const TROPICAL_CYCLONE_MAX_WIND_FORECAST = 'vmax'

export const TROPICAL_PRODUCTS = {
	[ATLANTIC_TROPICAL_WEATHER_OUTLOOK]: {
		name: 'Tropical Weather Outlook (Atlantic)',
		requiresStorm: false,
	},
	[EASTERN_PACIFIC_TROPICAL_WEATHER_OUTLOOK]: {
		name: 'Tropical Weather Outlook (Eastern Pacific)',
		requiresStorm: false,
	},
	[CENTRAL_PACIFIC_TROPICAL_WEATHER_OUTLOOK]: {
		name: 'Tropical Weather Outlook (Central Pacific)',
		requiresStorm: false,
	},
	[NORTH_ATLANTIC_TROPICAL_DISCUSSION]: {
		name: 'Tropical Discussion (Atlantic)',
		requiresStorm: false,
	},
	[EASTERN_PACIFIC_TROPICAL_DISCUSSION]: {
		name: 'Tropical Discussion (Eastern Pacific)',
		requiresStorm: false,
	},
	[TROPICAL_CYCLONE_PUBLIC_ADVISORY]: {
		name: 'Public Advisory',
		requiresStorm: true,
	},
	[TROPICAL_CYCLONE_FORECAST_ADVISORY]: {
		name: 'Forecast Advisory',
		requiresStorm: true,
	},
	[TROPICAL_CYCLONE_FORECAST_DISCUSSION]: {
		name: 'Forecast Discussion',
		requiresStorm: true,
	},
	[TROPICAL_CYCLONE_AVIATION_ADVISORY]: {
		name: 'Aviation Advisory',
		requiresStorm: true,
	},
	[TROPICAL_CYCLONE_WIND_SPEED_PROBABILITIES]: {
		name: 'Wind Speed Probabilities',
		requiresStorm: true,
	},
	[TROPICAL_CYCLONE_MIN_PRESSURE_FORECAST]: {
		name: 'Minimum Pressure Ensemble Forecast',
		requiresStorm: true,
	},
	[TROPICAL_CYCLONE_MAX_WIND_FORECAST]: {
		name: 'Maximum Wind Ensemble Forecast',
		requiresStorm: true,
	},
}
