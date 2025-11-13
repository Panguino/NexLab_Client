/**
 * Parse county alerts from NexLab API
 * Transforms raw alert data into county-based alert information with colors
 */

import countiesData from '@/data/d3Map/counties.json'
import { HAZARD_COLORS, HAZARD_LEVEL_NAMES, HAZARD_TYPE_NAMES } from '@/data/hazardMapVars'
import getAlertIdByEvent from '@/util/getAlertIdByEvent'
import { Feature, FeatureCollection } from 'geojson'

const ALERTS_API_BASE = 'https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com'

/**
 * Hazard type to color mapping
 * Based on NWS standard hazard colors
 */
export const HAZARD_COLOR_MAP: Record<string, [number, number, number, number]> = {
	TORNADO_WARNING: [255, 0, 0, 255], // Red
	TORNADO_WATCH: [255, 100, 100, 255], // Light red
	SEVERE_WARNING: [0, 100, 225, 255], // Blue
	SEVERE_WATCH: [50, 150, 255, 255], // Light blue
	FIRE_WARNING: [255, 110, 0, 255], // Orange
	FIRE_ADVISORY: [232, 100, 0, 255], // Dark orange
	WINTER_WARNING: [0, 153, 255, 255], // Cyan
	WINTER_ADVISORY: [0, 180, 255, 255], // Light cyan
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
 * Alert data from API (old format)
 */
export interface AlertsAPIResponse {
	success: boolean
	data: {
		alerts: Record<string, any>
		timeline: Array<{
			timestamp: string
			changes: Record<string, string>
		}>
	}
}

/**
 * Hazard data from new /api/hazards endpoint
 */
export interface HazardData {
	id: string
	locationId: string
	locationType: 'county' | 'coast' | 'offshore'
	locationName: string
	state: string
	lat: number
	lon: number
	event: string
	hazardType: string
	hazardLevel: string
	color: { hex: string; rgb: string }
	sent: string
	effective: string
	onset: string
	expires: string
	ends: string
	headline: string
	description: string
	areaDesc: string
	severity: string
	certainty: string
	urgency: string
}

/**
 * Response from /api/hazards endpoint
 */
export interface HazardsAPIResponse {
	success: boolean
	message: string
	data: HazardData[]
	timestamp?: string
}

/**
 * County alert mapping
 */
export interface CountyAlertMap {
	[countyId: string]: {
		color: [number, number, number, number]
		alerts: any[]
		headline?: string
	}
}

/**
 * Coastal/Ocean region alert mapping
 */
export interface CoastalAlertMap {
	[regionId: string]: {
		color: [number, number, number, number]
		alerts: any[]
		headline?: string
		name?: string
		type: 'coast' | 'offshore'
	}
}

/**
 * Fetch real-time hazards from /api/hazards endpoint
 */
export const fetchRealTimeHazards = async (filters?: {
	region?: 'CONUS' | 'ALASKA' | 'HAWAII'
	state?: string
	hazardType?: string
	hazardLevel?: string
}): Promise<HazardsAPIResponse> => {
	try {
		let endpoint = `${ALERTS_API_BASE}/api/hazards`
		const params = new URLSearchParams()

		if (filters?.region) params.append('region', filters.region)
		if (filters?.state) params.append('state', filters.state)
		if (filters?.hazardType) params.append('hazardType', filters.hazardType)
		if (filters?.hazardLevel) params.append('hazardLevel', filters.hazardLevel)

		if (params.toString()) {
			endpoint += `?${params.toString()}`
		}

		const response = await fetch(endpoint, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return data as HazardsAPIResponse
	} catch (error) {
		console.error('Error fetching real-time hazards:', error)
		throw error
	}
}

/**
 * Fetch hazards for a specific county by FIPS code
 */
export const fetchCountyHazards = async (fipsCode: string): Promise<HazardsAPIResponse> => {
	try {
		const endpoint = `${ALERTS_API_BASE}/api/hazards/county/${fipsCode}`
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return data as HazardsAPIResponse
	} catch (error) {
		console.error(`Error fetching hazards for county ${fipsCode}:`, error)
		throw error
	}
}

/**
 * Fetch alerts from the last X hours
 */
export const fetchCountyAlertsLastHours = async (hours: number = 24): Promise<AlertsAPIResponse> => {
	try {
		const endpoint = `${ALERTS_API_BASE}/api/alerts/history/last?hours=${hours}`
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return data as AlertsAPIResponse
	} catch (error) {
		console.error(`Error fetching county alerts for last ${hours} hours:`, error)
		throw error
	}
}

/**
 * Fetch alerts for a specific date
 */
export const fetchCountyAlertsForDate = async (date: string): Promise<AlertsAPIResponse> => {
	try {
		const endpoint = `${ALERTS_API_BASE}/api/alerts/history/optimized?date=${date}`
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return data as AlertsAPIResponse
	} catch (error) {
		console.error(`Error fetching county alerts for date ${date}:`, error)
		throw error
	}
}

/**
 * Parse alert event type to get hazard type and level
 * e.g., "Tornado Warning" -> { type: "TORNADO", level: "WARNING" }
 */
export const parseAlertEvent = (event: string): { type: string; level: string } => {
	const parts = event.split(' ')
	const level = parts[parts.length - 1].toUpperCase() // WARNING, WATCH, ADVISORY, STATEMENT
	const type = parts.slice(0, -1).join('_').toUpperCase() // TORNADO, SEVERE, etc.

	return { type, level }
}

/**
 * Get complete hazard info for an alert event
 * Returns type, level, names, and color - matching the D3 hazards map structure
 */
export const getHazardInfoFromEvent = (
	event: string,
): {
	type: string
	typeName: string
	level: string
	levelName: string
	color: string // HEX color
	rgba: [number, number, number, number]
} => {
	const alertInfo = getAlertIdByEvent(event)
	const { type, level } = alertInfo

	// Get names from the mapping
	const typeName = HAZARD_TYPE_NAMES[type] || type
	const levelName = HAZARD_LEVEL_NAMES[level] || level

	// Look up color from HAZARD_COLORS
	const colorStr = HAZARD_COLORS[type]?.[level]
	let rgba: [number, number, number, number] = [128, 128, 128, 255]
	let hexColor = '#808080'

	if (colorStr) {
		const [r, g, b] = colorStr.split(',').map(Number)
		rgba = [r, g, b, 255]
		hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
	}

	return {
		type,
		typeName,
		level,
		levelName,
		color: hexColor,
		rgba,
	}
}

/**
 * Get color for an alert based on type and level
 * Uses comprehensive alert event mapping and hazard colors
 */
export const getAlertColor = (event: string): [number, number, number, number] => {
	return getHazardInfoFromEvent(event).rgba
}

/**
 * Determine severity level of an alert for prioritization
 * Higher number = more severe
 * Used to select the most severe alert color when a county has multiple alerts
 */
export const getAlertSeverity = (alert: any): number => {
	const { level } = parseAlertEvent(alert.event || '')

	// Severity ranking: WARNING > WATCH > ADVISORY > STATEMENT
	const severityMap: Record<string, number> = {
		WARNING: 4,
		WATCH: 3,
		ADVISORY: 2,
		STATEMENT: 1,
	}

	return severityMap[level] || 0
}

/**
 * Deduplicate alerts by event type, keeping only the most severe one of each type
 * Removes duplicate alerts that have the same event name
 */
export const deduplicateAlerts = (alerts: any[]): any[] => {
	const alertsByEvent: Record<string, any> = {}

	alerts.forEach((alert) => {
		const eventType = alert.event || 'unknown'
		const existingAlert = alertsByEvent[eventType]

		// Keep the alert with higher severity, or the first one if same severity
		if (!existingAlert || getAlertSeverity(alert) > getAlertSeverity(existingAlert)) {
			alertsByEvent[eventType] = alert
		}
	})

	return Object.values(alertsByEvent)
}

/**
 * Extract county IDs from alert
 * Alerts have a locations array with county information
 * Returns array of county IDs (FIPS codes)
 */
export const extractCountyIds = (alert: any): string[] => {
	const countyIds: string[] = []

	// Check if alert has locations array with county data
	if (alert.locations && Array.isArray(alert.locations)) {
		alert.locations.forEach((location: any) => {
			if (location.type === 'county' && location.locationId) {
				countyIds.push(location.locationId)
			}
		})
	}

	// If no locations array, try fallback methods
	if (countyIds.length === 0) {
		// Try direct county ID properties
		if (alert.countyId) {
			countyIds.push(alert.countyId)
		} else if (alert.county_id) {
			countyIds.push(alert.county_id)
		} else if (alert.properties?.countyId) {
			countyIds.push(alert.properties.countyId)
		} else if (alert.properties?.county_id) {
			countyIds.push(alert.properties.county_id)
		} else if (alert.areaDesc) {
			// Parse from area description like "County, State"
			const match = alert.areaDesc.match(/(\d{5})/)
			if (match) {
				countyIds.push(match[1])
			}
		}
	}

	return countyIds
}

/**
 * Extract county ID from alert properties (legacy - returns first county)
 * Alerts may have county ID in different formats
 */
export const extractCountyId = (alert: any): string | null => {
	const countyIds = extractCountyIds(alert)
	if (countyIds.length > 0) return countyIds[0]

	// Fallback to old formats
	if (alert.countyId) return alert.countyId
	if (alert.county_id) return alert.county_id
	if (alert.properties?.countyId) return alert.properties.countyId
	if (alert.properties?.county_id) return alert.properties.county_id
	if (alert.areaDesc) {
		// Parse from area description like "County, State"
		const match = alert.areaDesc.match(/(\d{5})/)
		if (match) return match[1]
	}
	return null
}

/**
 * Convert hazard data from /api/hazards to county alert map
 * Groups hazards by county and assigns colors
 */
export const parseHazardsToCountyMap = (hazardsResponse: HazardsAPIResponse): CountyAlertMap => {
	const countyMap: CountyAlertMap = {}

	if (!hazardsResponse.data || !Array.isArray(hazardsResponse.data)) {
		return countyMap
	}

	hazardsResponse.data.forEach((hazard: HazardData) => {
		// Only process county-level hazards
		if (hazard.locationType !== 'county') return

		const countyId = hazard.locationId
		if (!countyId) return

		// Parse color from hex or use hazard type/level mapping
		let color: [number, number, number, number]
		if (hazard.color?.rgb) {
			const [r, g, b] = hazard.color.rgb.split(',').map(Number)
			color = [r, g, b, 255]
		} else {
			color = getAlertColor(hazard.event || '')
		}

		if (!countyMap[countyId]) {
			countyMap[countyId] = {
				color,
				alerts: [],
				headline: hazard.headline,
			}
		}

		// Ensure color is attached to hazard object for animation hook to use
		const hazardWithColor = { ...hazard, color }
		countyMap[countyId].alerts.push(hazardWithColor)

		// Update color if this hazard is more severe than the most severe hazard already in the county
		const mostSevereHazard = countyMap[countyId].alerts.reduce((prev: any, curr: any) =>
			getAlertSeverity(curr) > getAlertSeverity(prev) ? curr : prev,
		)
		const mostSevereSeverity = getAlertSeverity(mostSevereHazard)
		if (getAlertSeverity(hazard) >= mostSevereSeverity) {
			countyMap[countyId].color = color
			countyMap[countyId].headline = hazard.headline
		}
	})

	// Deduplicate alerts for each county (keep only most severe of each event type)
	Object.keys(countyMap).forEach((countyId) => {
		countyMap[countyId].alerts = deduplicateAlerts(countyMap[countyId].alerts)
	})

	return countyMap
}

/**
 * Convert hazard data from /api/hazards to coastal/ocean alert map
 * Groups hazards by coastal or offshore region and assigns colors
 */
export const parseHazardsToCoastalMap = (hazardsResponse: HazardsAPIResponse): CoastalAlertMap => {
	const coastalMap: CoastalAlertMap = {}

	if (!hazardsResponse.data || !Array.isArray(hazardsResponse.data)) {
		return coastalMap
	}

	hazardsResponse.data.forEach((hazard: HazardData) => {
		// Only process coastal and offshore hazards
		if (hazard.locationType !== 'coast' && hazard.locationType !== 'offshore') return

		const regionId = hazard.locationId
		if (!regionId) return

		// Parse color from hex or use hazard type/level mapping
		let color: [number, number, number, number]
		if (hazard.color?.rgb) {
			const [r, g, b] = hazard.color.rgb.split(',').map(Number)
			color = [r, g, b, 255]
		} else {
			color = getAlertColor(hazard.event || '')
		}

		if (!coastalMap[regionId]) {
			coastalMap[regionId] = {
				color,
				alerts: [],
				headline: hazard.headline,
				name: hazard.locationName,
				type: hazard.locationType as 'coast' | 'offshore',
			}
		}

		// Ensure color is attached to hazard object for animation hook to use
		const hazardWithColor = { ...hazard, color }
		coastalMap[regionId].alerts.push(hazardWithColor)

		// Update color if this hazard is more severe than the most severe hazard already in the region
		const mostSevereHazard = coastalMap[regionId].alerts.reduce((prev: any, curr: any) =>
			getAlertSeverity(curr) > getAlertSeverity(prev) ? curr : prev,
		)
		const mostSevereSeverity = getAlertSeverity(mostSevereHazard)
		if (getAlertSeverity(hazard) >= mostSevereSeverity) {
			coastalMap[regionId].color = color
			coastalMap[regionId].headline = hazard.headline
		}
	})

	// Deduplicate alerts for each coastal region (keep only most severe of each event type)
	Object.keys(coastalMap).forEach((regionId) => {
		coastalMap[regionId].alerts = deduplicateAlerts(coastalMap[regionId].alerts)
	})

	return coastalMap
}

/**
 * Parse API alerts into county-based alert map (old format)
 * Groups alerts by county and assigns colors
 * Each alert can affect multiple counties
 */
export const parseAlertsToCountyMap = (apiResponse: AlertsAPIResponse): CountyAlertMap => {
	const countyMap: CountyAlertMap = {}

	if (!apiResponse.data?.alerts) {
		return countyMap
	}

	Object.values(apiResponse.data.alerts).forEach((alert: any) => {
		if (!alert || alert.status === 'expired') return

		const countyIds = extractCountyIds(alert)
		if (countyIds.length === 0) return

		const color = getAlertColor(alert.event || '')
		const alertSeverity = getAlertSeverity(alert)

		// Add this alert to all affected counties
		countyIds.forEach((countyId: string) => {
			if (!countyMap[countyId]) {
				countyMap[countyId] = {
					color,
					alerts: [],
					headline: alert.headline,
				}
			}

			// Attach color to alert object for animation hook to use
			const alertWithColor = { ...alert, color }
			countyMap[countyId].alerts.push(alertWithColor)

			// Update color if this alert is more severe than the most severe alert already in the county
			const mostSevereAlert = countyMap[countyId].alerts.reduce((prev: any, curr: any) =>
				getAlertSeverity(curr) > getAlertSeverity(prev) ? curr : prev,
			)
			const mostSevereSeverity = getAlertSeverity(mostSevereAlert)
			if (alertSeverity >= mostSevereSeverity) {
				countyMap[countyId].color = color
				countyMap[countyId].headline = alert.headline
			}
		})
	})

	// Deduplicate alerts for each county (keep only most severe of each event type)
	Object.keys(countyMap).forEach((countyId) => {
		countyMap[countyId].alerts = deduplicateAlerts(countyMap[countyId].alerts)
	})

	return countyMap
}

/**
 * Parse API alerts into coastal/offshore region alert map (old format)
 * Groups alerts by coastal or offshore region and assigns colors
 */
export const parseAlertsToCoastalMap = (apiResponse: AlertsAPIResponse): CoastalAlertMap => {
	const coastalMap: CoastalAlertMap = {}

	if (!apiResponse.data?.alerts) {
		return coastalMap
	}

	Object.values(apiResponse.data.alerts).forEach((alert: any) => {
		if (!alert || alert.status === 'expired') return

		// Extract coastal/offshore region IDs from locations array
		const coastalRegionIds: string[] = []
		if (alert.locations && Array.isArray(alert.locations)) {
			alert.locations.forEach((location: any) => {
				if ((location.type === 'coast' || location.type === 'offshore') && location.locationId) {
					coastalRegionIds.push(location.locationId)
				}
			})
		}

		if (coastalRegionIds.length === 0) return

		const color = getAlertColor(alert.event || '')
		const alertSeverity = getAlertSeverity(alert)

		// Add this alert to all affected coastal regions
		coastalRegionIds.forEach((regionId: string) => {
			if (!coastalMap[regionId]) {
				coastalMap[regionId] = {
					color,
					alerts: [],
					headline: alert.headline,
					name: alert.areaDesc,
				}
			}

			// Attach color to alert object for animation hook to use
			const alertWithColor = { ...alert, color }
			coastalMap[regionId].alerts.push(alertWithColor)

			// Update color if this alert is more severe than the most severe alert already in the region
			const mostSevereAlert = coastalMap[regionId].alerts.reduce((prev: any, curr: any) =>
				getAlertSeverity(curr) > getAlertSeverity(prev) ? curr : prev,
			)
			const mostSevereSeverity = getAlertSeverity(mostSevereAlert)
			if (alertSeverity >= mostSevereSeverity) {
				coastalMap[regionId].color = color
				coastalMap[regionId].headline = alert.headline
			}
		})
	})

	// Deduplicate alerts for each coastal region (keep only most severe of each event type)
	Object.keys(coastalMap).forEach((regionId) => {
		coastalMap[regionId].alerts = deduplicateAlerts(coastalMap[regionId].alerts)
	})

	return coastalMap
}

/**
 * Create a lightweight alert color map for counties
 * This maps county IDs to their alert colors without duplicating geometry data
 * The geometry is already in countiesData, we just need to map colors to it
 */
export const createCountyAlertColorMap = (countyAlertMap: CountyAlertMap): Record<string, any> => {
	const colorMap: Record<string, any> = {}

	// Build a map of county ID -> alert info
	Object.entries(countyAlertMap).forEach(([countyId, alertInfo]) => {
		colorMap[countyId] = {
			color: alertInfo.color,
			hasAlert: true,
			alerts: alertInfo.alerts,
			headline: alertInfo.headline,
		}
	})

	return colorMap
}

/**
 * Create a GeoJSON FeatureCollection with county colors based on alerts
 * This is used as the frame data for AnimatorMapMachine
 * @deprecated Use createCountyAlertColorMap instead - this duplicates geometry data
 */
export const createCountyAlertGeoJSON = (countyAlertMap: CountyAlertMap): FeatureCollection => {
	const counties = countiesData as unknown as FeatureCollection

	const features = counties.features.map((feature: Feature) => {
		// Try multiple property names to find the county ID
		let countyId = feature.properties?.id || feature.properties?.ID

		// If not found, try FIPS and extract the numeric part
		if (!countyId && feature.properties?.FIPS) {
			// FIPS format is "US53073", extract "53073"
			const fipsMatch = feature.properties.FIPS.match(/(\d{5})/)
			countyId = fipsMatch ? fipsMatch[1] : null
		}

		const alertInfo = countyAlertMap[countyId]

		return {
			...feature,
			properties: {
				...feature.properties,
				id: countyId, // Ensure id is set for reference
				alertColor: alertInfo?.color || [200, 200, 200, 100], // Default grey for no alerts
				hasAlert: !!alertInfo,
				alerts: alertInfo?.alerts || [],
			},
		}
	})

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * Create a GeoJSON FeatureCollection with coastal/offshore region colors based on alerts
 * Converts coastal region features with alert information into GeoJSON format
 */
export const createCoastalAlertGeoJSON = (coastalFeatures: any[], coastalAlertMap: CoastalAlertMap): FeatureCollection => {
	const features = coastalFeatures.map((feature: any) => {
		// Get region ID from feature properties
		const regionId = feature.properties?.ID || feature.properties?.id

		const alertInfo = coastalAlertMap[regionId]

		return {
			...feature,
			properties: {
				...feature.properties,
				id: regionId, // Ensure id is set for reference
				alertColor: alertInfo?.color, // Only set if there's an alert
				hasAlert: !!alertInfo,
				alerts: alertInfo?.alerts || [],
			},
		}
	})

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * Create a GeoJSON layer that can be used with Deck.gl
 * Applies colors based on county alerts
 */
export const createCountyAlertLayer = (countyAlertMap: CountyAlertMap) => {
	const geoJSON = createCountyAlertGeoJSON(countyAlertMap)

	return {
		id: 'county-alerts-layer',
		type: 'GeoJsonLayer',
		data: geoJSON,
		stroked: true,
		filled: true,
		lineWidthMinPixels: 0.5,
		lineWidthMaxPixels: 1,
		getLineColor: [100, 100, 100, 255],
		getFillColor: (d: any) => d.properties?.alertColor || [200, 200, 200, 100],
		opacity: 0.8,
		pickable: true,
		autoHighlight: true,
	}
}
