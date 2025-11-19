import { GeoJsonLayer } from '@deck.gl/layers'

export interface CountiesLayerProps {
	data: any
	showInactiveBorders: boolean
	showAlertData: boolean
	countyBorderColor: number[]
	hoveredCountyId: string | null
	alertMap: Record<string, any> | null
	animatedColors?: Record<string, number[]>
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
}: CountiesLayerProps) => {
	if (!data) return []

	return [
		new GeoJsonLayer({
			id: 'counties-layer',
			data: data as any,
			filled: true,
			stroked: true,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: (d: any) => {
				const regionId = d.properties?.id || d.properties?.ID
				const alertInfo = alertMap && regionId && alertMap[regionId]
				const hasAlert = alertInfo?.hasAlert

				// For counties without alerts, respect the inactive toggle
				if (!showInactiveBorders) {
					if (hasAlert && showAlertData) {
						return countyBorderColor as any
					}
					return [0, 0, 0, 0]
				}

				// Always show white outline for hovered region
				if (showAlertData && hoveredCountyId && regionId === hoveredCountyId) {
					return [255, 255, 255, 255]
				}

				// If county has alert, always show border
				if (hasAlert) {
					return countyBorderColor as any
				}

				// Show border for inactive counties when toggle is on
				return countyBorderColor as any
			},
			getFillColor: (d: any) => {
				const regionId = d.properties?.id || d.properties?.ID
				const alertInfo = alertMap && regionId && alertMap[regionId]
				const hasAlert = alertInfo?.hasAlert

				// If county data is disabled, use default color for all counties
				if (!showAlertData) {
					return [200, 200, 200, 0]
				}

				// If county has alert and county data is enabled, show alert color
				if (animatedColors && regionId && animatedColors[regionId]) {
					return animatedColors[regionId]
				}
				if (hasAlert && alertInfo) {
					return alertInfo.color
				}

				// No alert - show default fill
				return [200, 200, 200, 0]
			},
			opacity: 1,
			pickable: false, // Use lat/long-based detection instead of deck.gl picking
			updateTriggers: {
				getLineColor: [countyBorderColor, hoveredCountyId, showInactiveBorders, showAlertData, alertMap],
				getFillColor: [showAlertData, alertMap, animatedColors],
			},
		}),
	]
}
