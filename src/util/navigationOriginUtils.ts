import { NavigationOrigin } from '@/store/navigationSlice'

export type OriginType = 'main' | 'height-comparison' | 'run-comparison' | 'models-comparison'

/**
 * Determines the origin type and label from a route path
 */
export const getOriginFromRoute = (route: string): { type: OriginType; label: string } | null => {
	if (!route || !route.includes('/weather-data/forecast-models/')) {
		return null
	}

	if (route.includes('/compare-height/')) {
		return {
			type: 'height-comparison',
			label: 'Height Comparison'
		}
	}
	
	if (route.includes('/compare-runs/')) {
		return {
			type: 'run-comparison',
			label: 'Run Comparison'
		}
	}
	
	if (route.includes('/compare-models/')) {
		return {
			type: 'models-comparison',
			label: 'Models Comparison'
		}
	}
	
	// Check if it's the main model viewer (no comparison in path)
	const pathParts = route.split('/')
	const forecastIndex = pathParts.indexOf('forecast-models')
	if (forecastIndex !== -1 && pathParts.length === forecastIndex + 6) {
		// Pattern: /weather-data/forecast-models/[run]/[model]/[sector]/[level]/[product]
		return {
			type: 'main',
			label: 'Main Model Viewer'
		}
	}
	
	return null
}

/**
 * Extracts essential state from the current route and store for restoration
 */
export const extractStateFromRoute = (route: string, store: any): NavigationOrigin['state'] => {
	const state: NavigationOrigin['state'] = {}
	
	// Extract valid time from route if it's a comparison view
	if (route.includes('/compare-height/') || route.includes('/compare-runs/') || route.includes('/compare-models/')) {
		const pathParts = route.split('/')
		const validTime = pathParts[pathParts.length - 1]
		if (validTime && !isNaN(Number(validTime))) {
			state.validTime = validTime
		}
	}
	
	// Get current zoom state
	if (store.forecastZoomState) {
		state.zoomState = { ...store.forecastZoomState }
	}
	
	// Get current frame valid time
	if (store.forecastFrameValidTime) {
		state.frameValidTime = store.forecastFrameValidTime
	}
	
	// Get run flag for comparison views
	if (store.runFlag) {
		state.runFlag = store.runFlag
	}
	
	return state
}

/**
 * Creates a navigation origin object from current context
 */
export const createNavigationOrigin = (route: string, store: any): NavigationOrigin | null => {
	const originInfo = getOriginFromRoute(route)
	if (!originInfo) {
		return null
	}
	
	return {
		route,
		label: originInfo.label,
		timestamp: Date.now(),
		state: extractStateFromRoute(route, store)
	}
}

/**
 * Determines if a route represents a direct sounding access (no origin)
 */
export const isDirectSoundingAccess = (previousRoute: string | null, _currentRoute: string): boolean => {
	// If there's no previous route, it's direct access
	if (!previousRoute) {
		return true
	}

	// If previous route is not a forecast model route, it's direct access
	if (!previousRoute.includes('/weather-data/forecast-models/')) {
		return true
	}

	// If previous route is already a sounding, it's navigation between soundings
	if (previousRoute.includes('/sounding/')) {
		return true
	}

	return false
}

/**
 * Builds the back navigation route from an origin
 */
export const buildBackRoute = (origin: NavigationOrigin): string => {
	return origin.route
}

/**
 * Restores UI state after navigation
 */
export const restoreUIState = (origin: NavigationOrigin, store: any): void => {
	if (!origin.state) {
		return
	}
	
	const { state } = origin
	
	// Restore zoom state
	if (state.zoomState && store.setForecastZoomState) {
		store.setForecastZoomState(state.zoomState)
	}
	
	// Restore frame valid time
	if (state.frameValidTime && store.setForecastFrameValidTime) {
		store.setForecastFrameValidTime(state.frameValidTime)
	}
	
	// Restore run flag
	if (state.runFlag && store.setRunFlag) {
		store.setRunFlag(state.runFlag)
	}
}

/**
 * Validates that an origin is still valid (not too old)
 */
export const isOriginValid = (origin: NavigationOrigin | null, maxAgeMs: number = 30 * 60 * 1000): boolean => {
	if (!origin) {
		return false
	}
	
	const age = Date.now() - origin.timestamp
	return age <= maxAgeMs
}
