import { GeoJsonLayer } from '@deck.gl/layers'

export interface CoastalRegionsLayerProps {
	/** All coastal/offshore regions (for showing inactive borders) */
	allCoastalRegions: any
	showInactiveBorders: boolean
	showAlertData: boolean
	oceanColor: number[]
	alertMap: Record<string, any> | null
}

/**
 * Helper function to get region ID from feature properties
 * Handles different property formats from API data
 */
const getRegionId = (feature: any): string | null => {
	const props = feature.properties
	if (!props) return null
	// Try common ID property names
	if (props.id) return props.id
	if (props.ID) return props.ID
	if (props.Id) return props.Id
	if (props.CODE) return props.CODE
	if (props.NAME) return props.NAME
	return null
}

/**
 * CoastalRegionsLayer - Renders coastal/ocean regions with alert colors
 *
 * Toggles:
 * - showInactiveBorders: Controls border opacity for regions without alerts (0 opacity when off, except for hovered)
 * - showAlertData: Controls whether to show alert colors and hover interactivity (when off, all fills are ocean color)
 */
export const createCoastalRegionsLayer = ({
	allCoastalRegions,
	showInactiveBorders,
	showAlertData,
	oceanColor,
	alertMap,
}: CoastalRegionsLayerProps) => {
	// Use allCoastalRegions as the base data (contains ALL coastal regions, not just those with alerts)
	if (!allCoastalRegions) return []

	return [
		new GeoJsonLayer({
			id: 'coastal-regions-layer',
			data: allCoastalRegions as any,
			filled: true,
			stroked: true,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: (d: any) => {
				const regionId = getRegionId(d)
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
				const regionId = getRegionId(d)
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
