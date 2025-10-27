import { useEffect, useRef, useState } from 'react'

/**
 * Hazard type to color mapping
 * Based on NWS standard hazard colors
 */
const HAZARD_COLOR_MAP: Record<string, [number, number, number, number]> = {
	TORNADO_WARNING: [255, 0, 0, 255], // Red
	TORNADO_WATCH: [255, 100, 100, 255], // Light red
	SEVERE_WARNING: [0, 100, 225, 255], // Blue
	SEVERE_WATCH: [50, 150, 255, 255], // Light blue
	SEVERE_THUNDERSTORM_WARNING: [0, 100, 225, 255], // Blue
	SEVERE_THUNDERSTORM_WATCH: [50, 150, 255, 255], // Light blue
	FIRE_WARNING: [255, 110, 0, 255], // Orange
	FIRE_ADVISORY: [232, 100, 0, 255], // Dark orange
	FIRE_WEATHER_ADVISORY: [232, 100, 0, 255], // Dark orange
	WIND_WARNING: [255, 150, 0, 255], // Orange-red
	WIND_ADVISORY: [255, 180, 0, 255], // Light orange
	WINTER_WARNING: [0, 153, 255, 255], // Cyan
	WINTER_WATCH: [0, 180, 255, 255], // Light cyan
	WINTER_ADVISORY: [100, 200, 255, 255], // Very light cyan
	WINTER_STORM_WATCH: [0, 180, 255, 255], // Light cyan
	MARINE_WARNING: [0, 100, 150, 255], // Dark blue
	MARINE_WATCH: [100, 150, 200, 255], // Light blue
	HYDROLOGICAL_WARNING: [0, 100, 200, 255], // Blue
	HYDROLOGICAL_ADVISORY: [100, 150, 255, 255], // Light blue
	TROPICAL_WARNING: [255, 0, 100, 255], // Magenta
	TROPICAL_WATCH: [255, 100, 150, 255], // Light magenta
	NONMET_WARNING: [150, 150, 150, 255], // Grey
	NONMET_ADVISORY: [200, 200, 200, 255], // Light grey
	NONPRECIP_WARNING: [200, 100, 0, 255], // Brown
	NONPRECIP_ADVISORY: [220, 150, 100, 255], // Light brown
	SPECIALWX_WARNING: [255, 200, 0, 255], // Yellow
	SPECIALWX_ADVISORY: [255, 220, 100, 255], // Light yellow
}

/**
 * Parse alert event type to get hazard type and level
 * e.g., "Tornado Warning" -> { type: "TORNADO", level: "WARNING" }
 */
const parseAlertEvent = (event: string): { type: string; level: string } => {
	const parts = event.split(' ')
	const level = parts[parts.length - 1].toUpperCase() // WARNING, WATCH, ADVISORY, STATEMENT
	const type = parts.slice(0, -1).join('_').toUpperCase() // TORNADO, SEVERE, etc.

	return { type, level }
}

/**
 * Get color for an alert based on type and level
 */
const getAlertColor = (event: string): [number, number, number, number] => {
	const { type, level } = parseAlertEvent(event)
	const key = `${type}_${level}`

	return HAZARD_COLOR_MAP[key] || [128, 128, 128, 255] // Default grey
}

/**
 * Extract color from alert object (API format or array format)
 */
const getColorFromAlert = (alert: any): [number, number, number, number] => {
	// If alert has a color property from API (HazardData format)
	if (alert.color) {
		if (Array.isArray(alert.color)) {
			// Already an array
			return alert.color
		} else if (alert.color.rgb) {
			// Parse RGB string like "255,0,0"
			const [r, g, b] = alert.color.rgb.split(',').map(Number)
			return [r, g, b, 255]
		} else if (typeof alert.color === 'string') {
			// Hex string - try to parse it
			const hex = alert.color.replace('#', '')
			const r = parseInt(hex.substring(0, 2), 16)
			const g = parseInt(hex.substring(2, 4), 16)
			const b = parseInt(hex.substring(4, 6), 16)
			return [r, g, b, 255]
		}
	}

	// Fall back to calculating from event
	if (alert.event) {
		return getAlertColor(alert.event)
	}

	return [128, 128, 128, 255] // Default grey
}

/**
 * Animation state for a single county with multiple alerts
 */
interface CountyAnimationState {
	currentAlertIndex: number
	isAnimating: boolean
}

/**
 * Hook to manage animation of counties with 2+ alerts
 * Cycles through alert colors with a 1.5 second pause between transitions
 *
 * @param currentFrameAlertMap - Map of county IDs to their alert information
 * @param enabled - Whether animation is enabled
 * @returns Object with animated colors and county animation states
 */
export function useMultiAlertAnimation(currentFrameAlertMap: Record<string, any>, enabled: boolean = true) {
	// Track animation state for each county
	const [animationStates, setAnimationStates] = useState<Record<string, CountyAnimationState>>({})

	// Track animated colors for counties with multiple alerts
	const [animatedColors, setAnimatedColors] = useState<Record<string, [number, number, number, number]>>({})

	// Refs to track animation intervals
	const animationIntervalsRef = useRef<Record<string, NodeJS.Timeout>>({})
	const animationTimersRef = useRef<Record<string, NodeJS.Timeout>>({})

	// Initialize animation states when alert map changes
	useEffect(() => {
		if (!enabled || !currentFrameAlertMap) return

		const newAnimationStates: Record<string, CountyAnimationState> = {}
		const newAnimatedColors: Record<string, [number, number, number, number]> = {}

		// Find all counties with 2+ alerts
		Object.entries(currentFrameAlertMap).forEach(([countyId, alertInfo]) => {
			const alerts = alertInfo.alerts || []

			if (alerts.length >= 2) {
				// Initialize animation state for this county
				newAnimationStates[countyId] = {
					currentAlertIndex: 0,
					isAnimating: true,
				}

				// Set initial color to first alert (use API color if available, otherwise calculate)
				if (alerts[0]) {
					const color = getColorFromAlert(alerts[0])
					newAnimatedColors[countyId] = color
				}
			}
		})

		setAnimationStates(newAnimationStates)
		setAnimatedColors(newAnimatedColors)

		// Cleanup previous intervals
		Object.values(animationIntervalsRef.current).forEach((interval) => clearInterval(interval))
		Object.values(animationTimersRef.current).forEach((timer) => clearTimeout(timer))
		animationIntervalsRef.current = {}
		animationTimersRef.current = {}

		// Set up animation for each county with multiple alerts
		Object.entries(newAnimationStates).forEach(([countyId]) => {
			const alerts = currentFrameAlertMap[countyId]?.alerts || []

			if (alerts.length >= 2) {
				// Create a closure that captures the current alerts array
				const createAnimationLoop = (alertsArray: any[]) => {
					let currentIndex = 0

					const animateToNextAlert = () => {
						// Move to next alert
						currentIndex = (currentIndex + 1) % alertsArray.length
						const nextColor = getColorFromAlert(alertsArray[currentIndex])

						// Update animated color (use API color if available, otherwise calculate)
						setAnimatedColors((colorPrev) => ({
							...colorPrev,
							[countyId]: nextColor,
						}))

						// Schedule next animation after pause
						const timer = setTimeout(animateToNextAlert, 1500) // 1.5 second pause
						animationTimersRef.current[countyId] = timer
					}

					// Start animation after initial pause
					const timer = setTimeout(animateToNextAlert, 1500)
					animationTimersRef.current[countyId] = timer
				}

				createAnimationLoop(alerts)
			}
		})

		// Cleanup on unmount or when dependencies change
		return () => {
			Object.values(animationIntervalsRef.current).forEach((interval) => clearInterval(interval))
			Object.values(animationTimersRef.current).forEach((timer) => clearTimeout(timer))
			animationIntervalsRef.current = {}
			animationTimersRef.current = {}
		}
	}, [currentFrameAlertMap, enabled])

	return {
		animatedColors,
		animationStates,
		isCountyAnimating: (countyId: string) => animationStates[countyId]?.isAnimating || false,
	}
}
