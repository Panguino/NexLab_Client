import { GeoJsonLayer } from '@deck.gl/layers'

export interface CoastalRegionsLayerProps {
	data: any
	showInactiveBorders: boolean
	showAlertData: boolean
	oceanColor: number[]
	alertMap: Record<string, any> | null
}

/**
 * CoastalRegionsLayer - Renders coastal/ocean regions with alert colors
 *
 * Toggles:
 * - showInactiveBorders: Controls border opacity for regions without alerts (0 opacity when off, except for hovered)
 * - showAlertData: Controls whether to show alert colors and hover interactivity (when off, all fills are ocean color)
 */
export const createCoastalRegionsLayer = ({ data, showInactiveBorders, showAlertData, oceanColor, alertMap }: CoastalRegionsLayerProps) => {
	if (!data) return []

	return [
		new GeoJsonLayer({
			id: 'coastal-regions-layer',
			data: data as any,
			filled: true,
			stroked: true,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: (d: any) => {
				const regionId = d.properties?.id || d.properties?.ID
				const alertInfo = alertMap && regionId && alertMap[regionId]
				const hasAlert = alertInfo?.hasAlert

				// For regions without alerts, respect the inactive toggle
				if (!showInactiveBorders) {
					if (hasAlert && showAlertData) {
						return [100, 100, 100, 200]
					}
					return [0, 0, 0, 0]
				}

				// If region has alert, always show border
				if (hasAlert) {
					return [100, 100, 100, 200]
				}

				// Show border for inactive regions when toggle is on
				return [100, 100, 100, 100]
			},
			getFillColor: (d: any) => {
				const regionId = d.properties?.id || d.properties?.ID
				const alertInfo = alertMap && regionId && alertMap[regionId]
				const hasAlert = alertInfo?.hasAlert

				// If coastal data is disabled, use ocean color for all regions
				if (!showAlertData) {
					return oceanColor as any
				}

				// If region has alert and coastal data is enabled, show alert color
				if (hasAlert && alertInfo) {
					return alertInfo.color
				}

				// No alert - show ocean color
				return oceanColor as any
			},
			opacity: 1,
			pickable: false,
			updateTriggers: {
				getLineColor: [showInactiveBorders, showAlertData, alertMap],
				getFillColor: [showAlertData, alertMap, oceanColor],
			},
		}),
	]
}
