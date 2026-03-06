/**
 * Watch Attributes Interface
 * Represents the raw attribute data from the watch API
 */
export interface WatchAttributes {
	'MAX HAIL /INCHES/'?: string
	'MAX TOPS /X 100 FEET/'?: string
	'MAX WIND GUSTS SURFACE /KNOTS/'?: string
	'MEAN STORM MOTION VECTOR /DEGREES AND KNOTS/'?: string
	'PARTICULARLY DANGEROUS SITUATION'?: string
}

/**
 * Watch Probabilities Interface
 * Represents the raw probability data from the watch API
 */
export interface WatchProbabilities {
	'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES'?: string
	'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES'?: string
	'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS'?: string
	'PROB OF 10 OR MORE SEVERE HAIL EVENTS'?: string
	'PROB OF 10 OR MORE SEVERE WIND EVENTS'?: string
	'PROB OF 2 OR MORE TORNADOES'?: string
	'PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS'?: string
}
