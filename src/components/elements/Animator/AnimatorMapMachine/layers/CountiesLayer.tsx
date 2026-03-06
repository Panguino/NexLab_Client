import { GeoJsonLayer } from '@deck.gl/layers'

export interface CountiesLayerProps {
	data: any
	showInactiveBorders: boolean
	showAlertData: boolean
	countyBorderColor: number[]
	hoveredCountyId: string | null
	alertMap: Record<string, any> | null
	animatedColors?: Record<string, number[]>
	filterCountyFn?: (countyId: string) => boolean // Optional filter function to show only specific counties
	hazardOpacityFn?: (alerts: any[]) => number // Optional function to determine opacity based on alerts (for sidebar hover filtering)
}

/**
 * Extract county ID from feature properties
 * Handles multiple property formats: id, ID, CODE_LOCAL, or FIPS (extracts numeric part)
 */
const getCountyId = (feature: any): string | null => {
	const props = feature.properties
	if (!props) return null

	// Try direct id properties first
	if (props.id) return props.id
	if (props.ID) return props.ID
	if (props.CODE_LOCAL) return props.CODE_LOCAL

	// Try FIPS format (e.g., "US53073" -> "53073")
	if (props.FIPS) {
		const fipsMatch = props.FIPS.match(/(\d{5})/)
		return fipsMatch ? fipsMatch[1] : null
	}

	return null
}

/**
 * CountiesLayer - Renders US counties with alert colors and hover feedback
 *
 * Toggles:
 * - showInactiveBorders: Controls border opacity for counties without alerts (0 opacity when off, except for hovered)
 * - showAlertData: Controls whether to show alert colors and hover interactivity (when off, all fills use default color)
 */
export const createCountiesLayer = ({
	data,
	showInactiveBorders,
	showAlertData,
	countyBorderColor,
	hoveredCountyId,
	alertMap,
	animatedColors,
	filterCountyFn,
	hazardOpacityFn,
}: CountiesLayerProps) => {
	if (!data) return []

	// Filter data if filter function is provided
	let filteredData = data
	if (filterCountyFn && data.features) {
		filteredData = {
			...data,
			features: data.features.filter((feature: any) => {
				const countyId = getCountyId(feature)
				if (!countyId) return false
				return filterCountyFn(countyId)
			}),
		}
	}

	return [
		new GeoJsonLayer({
			id: 'counties-layer',
			data: filteredData as any,
			filled: true,
			stroked: true,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: (d: any) => {
				const regionId = getCountyId(d)
				const alertInfo = alertMap && regionId && alertMap[regionId]
				const hasAlert = alertInfo?.hasAlert

				// For counties without alerts, respect the inactive toggle
				if (!showInactiveBorders) {
					if (hasAlert && showAlertData) {
						return countyBorderColor as any
					}
					return [0, 0, 0, 0]
				}

				// If county has alert, always show border
				if (hasAlert) {
					return countyBorderColor as any
				}

				// Show border for inactive counties when toggle is on
				return countyBorderColor as any
			},
			getFillColor: (d: any) => {
				const regionId = getCountyId(d)
				const alertInfo = alertMap && regionId && alertMap[regionId]
				const hasAlert = alertInfo?.hasAlert
				const alerts = d.properties?.alerts || alertInfo?.alerts || []

				// If county data is disabled, use default color for all counties
				if (!showAlertData) {
					return [200, 200, 200, 0]
				}

				// Calculate opacity from hazard filter (for sidebar hover interaction)
				// Default opacity is 1 (fully visible), hazardOpacityFn returns 0-1
				const filterOpacity = hazardOpacityFn ? hazardOpacityFn(alerts) : 1

				// If county has alert and county data is enabled, show alert color
				let baseColor: number[]
				if (animatedColors && regionId && animatedColors[regionId]) {
					baseColor = animatedColors[regionId]
				} else if (hasAlert && alertInfo) {
					baseColor = alertInfo.color
				} else {
					// No alert - show default fill
					return [200, 200, 200, 0]
				}

				// Apply filter opacity to the alpha channel
				// baseColor is [R, G, B, A] - we multiply A by filterOpacity
				const alpha = (baseColor[3] ?? 255) * filterOpacity
				return [baseColor[0], baseColor[1], baseColor[2], alpha]
			},
			opacity: 1,
			pickable: false, // Use lat/long-based detection instead of deck.gl picking
			updateTriggers: {
				getLineColor: [countyBorderColor, hoveredCountyId, showInactiveBorders, showAlertData, alertMap],
				getFillColor: [showAlertData, alertMap, animatedColors, hazardOpacityFn],
			},
		}),
	]
}
