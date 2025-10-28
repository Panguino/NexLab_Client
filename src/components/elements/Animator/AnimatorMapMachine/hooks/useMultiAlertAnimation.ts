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
 * Easing function for smooth color transitions
 * Uses ease-in-out cubic for natural motion
 */
const easeInOutCubic = (t: number): number => {
	return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Interpolate between two colors
 */
const interpolateColor = (
	fromColor: [number, number, number, number],
	toColor: [number, number, number, number],
	progress: number,
): [number, number, number, number] => {
	const eased = easeInOutCubic(progress)
	return [
		Math.round(fromColor[0] + (toColor[0] - fromColor[0]) * eased),
		Math.round(fromColor[1] + (toColor[1] - fromColor[1]) * eased),
		Math.round(fromColor[2] + (toColor[2] - fromColor[2]) * eased),
		255,
	]
}

/**
 * Animation state for a single county with multiple alerts
 */
interface CountyAnimationState {
	currentAlertIndex: number
	isAnimating: boolean
	transitionStartTime?: number
	fromColor?: [number, number, number, number]
	toColor?: [number, number, number, number]
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

	// Refs to track animation intervals and RAF
	const animationIntervalsRef = useRef<Record<string, NodeJS.Timeout>>({})
	const animationTimersRef = useRef<Record<string, NodeJS.Timeout>>({})
	const animationFrameRef = useRef<number | null>(null)

	// Initialize animation states when alert map changes
	useEffect(() => {
		if (!enabled || !currentFrameAlertMap) {
			return
		}

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
				// Initialize first transition
				const firstColor = getColorFromAlert(alerts[0])
				const secondColor = getColorFromAlert(alerts[1])

				setAnimationStates((prev) => ({
					...prev,
					[countyId]: {
						...prev[countyId],
						transitionStartTime: Date.now(),
						fromColor: firstColor,
						toColor: secondColor,
					},
				}))
			}
		})

		// Cleanup on unmount or when dependencies change
		return () => {
			Object.values(animationIntervalsRef.current).forEach((interval) => clearInterval(interval))
			Object.values(animationTimersRef.current).forEach((timer) => clearTimeout(timer))
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
			animationIntervalsRef.current = {}
			animationTimersRef.current = {}
		}
	}, [currentFrameAlertMap, enabled])

	// Animation frame loop for smooth color transitions
	useEffect(() => {
		if (!enabled || Object.keys(animationStates).length === 0) {
			return
		}

		const TRANSITION_DURATION = 750 // 0.75 seconds
		const PAUSE_DURATION = 450 // 0.45 seconds between transitions (80% reduction)

		const animate = () => {
			const now = Date.now()
			let hasActiveAnimation = false

			setAnimationStates((prevStates) => {
				const newStates = { ...prevStates }
				const newColors: Record<string, [number, number, number, number]> = {}

				Object.entries(prevStates).forEach(([countyId, state]) => {
					if (!state.transitionStartTime || !state.fromColor || !state.toColor) return

					const elapsed = now - state.transitionStartTime
					const totalCycleDuration = TRANSITION_DURATION + PAUSE_DURATION

					if (elapsed < TRANSITION_DURATION) {
						// Currently transitioning
						hasActiveAnimation = true
						const progress = elapsed / TRANSITION_DURATION
						const interpolatedColor = interpolateColor(state.fromColor, state.toColor, progress)
						newColors[countyId] = interpolatedColor
					} else if (elapsed < totalCycleDuration) {
						// In pause period - show target color
						hasActiveAnimation = true
						newColors[countyId] = state.toColor
					} else {
						// Transition complete, move to next alert
						const alerts = currentFrameAlertMap[countyId]?.alerts || []
						if (alerts.length >= 2) {
							const currentIndex = state.currentAlertIndex || 0
							const nextIndex = (currentIndex + 1) % alerts.length
							const nextNextIndex = (nextIndex + 1) % alerts.length

							const fromColor = getColorFromAlert(alerts[nextIndex])
							const toColor = getColorFromAlert(alerts[nextNextIndex])

							newStates[countyId] = {
								...state,
								currentAlertIndex: nextIndex,
								transitionStartTime: now,
								fromColor,
								toColor,
							}

							newColors[countyId] = fromColor
							hasActiveAnimation = true
						}
					}
				})

				setAnimatedColors(newColors)
				return newStates
			})

			if (hasActiveAnimation) {
				animationFrameRef.current = requestAnimationFrame(animate)
			}
		}

		animationFrameRef.current = requestAnimationFrame(animate)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [enabled, animationStates, currentFrameAlertMap])

	return {
		animatedColors,
		animationStates,
		isCountyAnimating: (countyId: string) => animationStates[countyId]?.isAnimating || false,
	}
}
