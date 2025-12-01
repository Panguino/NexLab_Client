// Watch Product Type Constants
export const CONVECTIVE_WATCH_DISCUSSION = 'discussion'
export const CONVECTIVE_WATCH_AVIATION_DISCUSSION = 'aviation-discussion'
export const CONVECTIVE_WATCH_OUTLINES = 'outlines'
export const CONVECTIVE_WATCH_PROBABILITIES_PRODUCT = 'probabilities'
export const CONVECTIVE_WATCH_STATUS_REPORTS = 'status-reports'

// Watch Product Definitions
export const CONVECTIVE_WATCH_PRODUCTS = {
	[CONVECTIVE_WATCH_DISCUSSION]: {
		title: 'Discussion',
		WMOPIL: 'WWUS20_SEL',
		feedKey: 'Watch_Notification_Messages',
	},
	[CONVECTIVE_WATCH_AVIATION_DISCUSSION]: {
		title: 'Aviation Disc.',
		WMOPIL: 'WWUS30_SAW',
		feedKey: 'Watch_Aviation_Notification_Messages',
	},
	[CONVECTIVE_WATCH_OUTLINES]: {
		title: 'Outlines',
		WMOPIL: 'WOUS64_WOU',
		feedKey: 'Watch_Outlines',
	},
	[CONVECTIVE_WATCH_PROBABILITIES_PRODUCT]: {
		title: 'Probabilities',
		WMOPIL: 'WWUS40_WWP',
		feedKey: 'Watch_Probabilities',
	},
	[CONVECTIVE_WATCH_STATUS_REPORTS]: {
		title: 'Status Reports',
		WMOPIL: 'WOUS20_WWA',
		feedKey: 'Watch_Status_Reports',
	},
}

// Watch Attribute ID Constants
export const ATTR_MAX_HAIL = 'MAX HAIL /INCHES/'
export const ATTR_MAX_TOPS = 'MAX TOPS /X 100 FEET/'
export const ATTR_MAX_WIND_GUSTS = 'MAX WIND GUSTS SURFACE /KNOTS/'
export const ATTR_STORM_MOTION = 'MEAN STORM MOTION VECTOR /DEGREES AND KNOTS/'
export const ATTR_PDS = 'PARTICULARLY DANGEROUS SITUATION'

// Watch Attribute Definitions
export const CONVECTIVE_WATCH_ATTRIBUTES = {
	[ATTR_MAX_HAIL]: {
		label: 'Max Hail',
		title: 'Maximum Hail Size (inches)',
	},
	[ATTR_MAX_TOPS]: {
		label: 'Max Tops',
		title: 'Maximum Storm Tops (feet)',
	},
	[ATTR_MAX_WIND_GUSTS]: {
		label: 'Max Wind Gusts',
		title: 'Maximum Wind Gusts at Surface (knots)',
	},
	[ATTR_STORM_MOTION]: {
		label: 'Storm Motion',
		title: 'Mean Storm Motion Vector (degrees and knots)',
	},
	[ATTR_PDS]: {
		label: 'PDS',
		title: 'Particularly Dangerous Situation',
	},
}

// Ordered array of attribute IDs
export const CONVECTIVE_WATCH_ATTRIBUTES_IDS = [ATTR_MAX_HAIL, ATTR_MAX_TOPS, ATTR_MAX_WIND_GUSTS, ATTR_STORM_MOTION, ATTR_PDS]

// Watch Probability ID Constants
export const PROB_TORNADOES = 'PROB OF 2 OR MORE TORNADOES'
export const PROB_EF2_PLUS_TORNADOES = 'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES'
export const PROB_SEVERE_HAIL = 'PROB OF 10 OR MORE SEVERE HAIL EVENTS'
export const PROB_HAIL_2_INCH = 'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES'
export const PROB_SEVERE_WIND = 'PROB OF 10 OR MORE SEVERE WIND EVENTS'
export const PROB_WIND_65_KTS = 'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS'
export const PROB_COMBINED_HAIL_WIND = 'PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS'

// Watch Probability Definitions
export const CONVECTIVE_WATCH_PROBABILITIES = {
	[PROB_TORNADOES]: {
		label: 'Tornadoes',
		title: 'Probability of 2 or more tornadoes',
	},
	[PROB_EF2_PLUS_TORNADOES]: {
		label: 'EF2+ Tornadoes',
		title: 'Probability of 1 or more strong (EF2-EF5) tornadoes',
	},
	[PROB_SEVERE_HAIL]: {
		label: 'Hail',
		title: 'Probability of 10 or more severe hail events',
	},
	[PROB_HAIL_2_INCH]: {
		label: 'Hail >= 2"',
		title: 'Probability of 1 or more hail events >= 2 inches',
	},
	[PROB_SEVERE_WIND]: {
		label: 'Wind',
		title: 'Probability of 10 or more severe wind events',
	},
	[PROB_WIND_65_KTS]: {
		label: 'Wind +65 kts',
		title: 'Probability of 1 or more wind events >= 65 knots',
	},
	[PROB_COMBINED_HAIL_WIND]: {
		label: 'Hail & Wind',
		title: 'Probability of 6 or more combined severe hail/wind events',
	},
}

// Ordered array of probability IDs
export const CONVECTIVE_WATCH_PROBABILITIES_IDS = [
	PROB_TORNADOES,
	PROB_EF2_PLUS_TORNADOES,
	PROB_SEVERE_HAIL,
	PROB_HAIL_2_INCH,
	PROB_SEVERE_WIND,
	PROB_WIND_65_KTS,
	PROB_COMBINED_HAIL_WIND,
]
