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
 * @returns Object mapping attribute IDs to { value: string, isHighThreshold: boolean }
 */
export function decodeAttributes(attributes: WatchAttributes | null | undefined): Record<string, { value: string; isHighThreshold: boolean }> {
	const decoded: Record<string, { value: string; isHighThreshold: boolean }> = {}

	// Guard clause: return empty object if attributes is null or undefined
	if (!attributes) {
		console.warn('decodeAttributes called with null or undefined attributes')
		return decoded
	}

	// Max Hail (threshold: 2)
	if (attributes[ATTR_MAX_HAIL]) {
		const hailValue = parseFloat(attributes[ATTR_MAX_HAIL])
		decoded[ATTR_MAX_HAIL] = {
			value: `${attributes[ATTR_MAX_HAIL]} in.`,
			isHighThreshold: hailValue > 2,
		}
	}

	// Max Tops (threshold: 500)
	if (attributes[ATTR_MAX_TOPS]) {
		const tops = parseInt(attributes[ATTR_MAX_TOPS])
		decoded[ATTR_MAX_TOPS] = {
			value: `${(tops * 100).toLocaleString()} ft`,
			isHighThreshold: tops > 500,
		}
	}

	// Max Wind Gusts (threshold: 65)
	if (attributes[ATTR_MAX_WIND_GUSTS]) {
		const windValue = parseInt(attributes[ATTR_MAX_WIND_GUSTS])
		decoded[ATTR_MAX_WIND_GUSTS] = {
			value: `${attributes[ATTR_MAX_WIND_GUSTS]} kts`,
			isHighThreshold: windValue > 65,
		}
	}

	// Storm Motion (threshold for speed: 35)
	if (attributes[ATTR_STORM_MOTION]) {
		const direction = attributes[ATTR_STORM_MOTION].substring(0, 3)
		const speed = attributes[ATTR_STORM_MOTION].substring(3).trim()
		const speedValue = parseInt(speed)
		decoded[ATTR_STORM_MOTION] = {
			value: `${direction}° @ ${speed} kts`,
			isHighThreshold: speedValue > 35,
		}
	}

	// PDS (threshold: "YES")
	if (attributes[ATTR_PDS]) {
		decoded[ATTR_PDS] = {
			value: attributes[ATTR_PDS],
			isHighThreshold: attributes[ATTR_PDS].toUpperCase() === 'YES',
		}
	}

	return decoded
}
