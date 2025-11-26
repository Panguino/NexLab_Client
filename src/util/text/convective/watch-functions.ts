import { ATTR_MAX_HAIL, ATTR_MAX_TOPS, ATTR_MAX_WIND_GUSTS, ATTR_PDS, ATTR_STORM_MOTION } from '@/data/text/convective/watch-products'
import type { WatchAttributes } from '@/types/text/convective/watch'

/**
 * Returns CSS class name based on probability value
 * @param value - Probability percentage string (e.g., "30%")
 * @param styles - Styles object containing highProb and moderateProb classes
 * @returns CSS class name for high or moderate probability
 */
export function getProbabilityClass(value: string, styles: Record<string, string>): string {
	const numValue = parseInt(value)
	return numValue >= 30 ? styles.highProb : styles.moderateProb
}

/**
 * Returns CSS class name based on watch type and status
 * @param watchType - Watch type string ('Tornado' or 'Severe Thunderstorm')
 * @param notActive - Whether the watch is expired/inactive
 * @param styles - Styles object containing tornado, severeThunderstorm, expired, default classes
 * @returns CSS class name for watch type
 */
export function getTypeClass(watchType?: string, notActive?: boolean, styles?: Record<string, string>): string {
	if (!styles) return ''
	if (notActive) return styles.expired
	if (watchType?.includes('Tornado')) return styles.tornado
	if (watchType?.includes('Severe Thunderstorm')) return styles.severeThunderstorm
	return styles.default
}

/**
 * Decodes raw watch attributes into formatted display values
 * @param attributes - Raw attribute values from API
 * @returns Object mapping attribute IDs to formatted display strings
 */
export function decodeAttributes(attributes: WatchAttributes): Record<string, string> {
	const decoded: Record<string, string> = {}

	// Max Hail
	if (attributes[ATTR_MAX_HAIL]) {
		decoded[ATTR_MAX_HAIL] = `${attributes[ATTR_MAX_HAIL]} in.`
	}

	// Max Tops
	if (attributes[ATTR_MAX_TOPS]) {
		const tops = parseInt(attributes[ATTR_MAX_TOPS])
		decoded[ATTR_MAX_TOPS] = `${(tops * 100).toLocaleString()} ft`
	}

	// Max Wind Gusts
	if (attributes[ATTR_MAX_WIND_GUSTS]) {
		decoded[ATTR_MAX_WIND_GUSTS] = `${attributes[ATTR_MAX_WIND_GUSTS]} kts`
	}

	// Storm Motion
	if (attributes[ATTR_STORM_MOTION]) {
		const parts = attributes[ATTR_STORM_MOTION].split('/')
		if (parts.length === 2) {
			const direction = parts[0].trim()
			const speed = parts[1].trim()
			decoded[ATTR_STORM_MOTION] = `${direction}° @ ${speed} kts`
		} else {
			decoded[ATTR_STORM_MOTION] = attributes[ATTR_STORM_MOTION]
		}
	}

	// PDS
	if (attributes[ATTR_PDS]) {
		decoded[ATTR_PDS] = attributes[ATTR_PDS]
	}

	return decoded
}
