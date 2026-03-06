import cwaZonesData from '@/data/d3Map/cwaZones.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface CwaZonesLayerProps {
	showFill: boolean
	showBorders: boolean
	hoveredCwaId: string | null
	selectedWFOId?: string | null // Selected WFO ID for highlighting in detail view
	alertMap: Record<string, any> | null // Alert data aggregated by CWA ID
	cwaBorderColor: number[] // Border color for CWA zones - darker than counties, lighter than states
	animatedColors?: Record<string, number[]> // Animated colors for multi-alert CWAs
	renderMode?: 'both' | 'fill' | 'border' // Control what to render for layering
}

/**
 * CwaZonesLayer - Renders CWA (County Warning Areas) zones with alert-based coloring
 * Uses darker borders than counties for better visual hierarchy
 * Highlights the selected WFO region in detail view with a subtle tint
 * Supports multi-alert animation for CWAs containing multiple alert types
 */
export const createCwaZonesLayer = ({
	showFill,
	showBorders,
	hoveredCwaId,
	selectedWFOId,
	alertMap,
	cwaBorderColor,
	animatedColors,
	renderMode = 'both',
}: CwaZonesLayerProps) => {
	if (!showFill && !showBorders) return []

	const isFill = renderMode === 'both' || renderMode === 'fill'
	const isBorder = renderMode === 'both' || renderMode === 'border'

	return [
		new GeoJsonLayer({
			id: `cwa-zones-layer-${renderMode}`,
			data: cwaZonesData as any,
			filled: showFill && isFill,
			stroked: showBorders && isBorder,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1.5,
			getLineColor: (d: any) => {
				const wfoId = d.properties?.FULLSTAID || d.properties?.WFO
				const isSelected = selectedWFOId && (wfoId === selectedWFOId || d.properties?.WFO === selectedWFOId)

				if (isSelected) {
					// Subtle blue border for selected zone
					return [100, 150, 200, 200]
				}
				// Use darker CWA border color for better visual hierarchy
				return cwaBorderColor as any
			},
			getFillColor: (d: any) => {
				const cwaId = d.properties?.CWA
				const wfoId = d.properties?.FULLSTAID || d.properties?.WFO
				const isSelected = selectedWFOId && (wfoId === selectedWFOId || d.properties?.WFO === selectedWFOId)

				// Check if this CWA has alerts
				const alertInfo = alertMap && cwaId && alertMap[cwaId]
				const hasAlert = alertInfo?.hasAlert

				if (isSelected) {
					// Subtle blue tint for selected zone
					return [150, 200, 255, 40]
				}

				// Check for animated color first (multi-alert animation)
				if (animatedColors && cwaId && animatedColors[cwaId]) {
					return animatedColors[cwaId]
				}

				// If CWA has alerts, use the alert color
				if (hasAlert && alertInfo?.color) {
					return alertInfo.color
				}

				// Default light grey for no alerts
				return [200, 200, 200, 50]
			},
			opacity: 1,
			updateTriggers: {
				getLineColor: [hoveredCwaId, selectedWFOId, cwaBorderColor],
				getFillColor: [hoveredCwaId, selectedWFOId, alertMap, animatedColors],
			},
		}),
	]
}
