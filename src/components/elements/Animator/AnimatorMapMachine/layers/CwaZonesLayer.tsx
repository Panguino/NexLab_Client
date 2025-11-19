import cwaZonesData from '@/data/d3Map/cwaZones.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface CwaZonesLayerProps {
	showFill: boolean
	showBorders: boolean
	hoveredCwaId: string | null
	selectedWFOId?: string | null // Selected WFO ID for highlighting in detail view
}

/**
 * CwaZonesLayer - Renders CWA (County Warning Areas) zones with hover feedback
 * Shows both fill and borders with conditional styling based on hover state
 * Highlights the selected WFO region in detail view
 */
export const createCwaZonesLayer = ({ showFill, showBorders, hoveredCwaId, selectedWFOId }: CwaZonesLayerProps) => {
	if (!showFill && !showBorders) return []

	return [
		new GeoJsonLayer({
			id: 'cwa-zones-layer',
			data: cwaZonesData as any,
			filled: showFill,
			stroked: showBorders,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 2,
			getLineColor: (d: any) => {
				const cwaId = d.properties?.CWA
				const wfoId = d.properties?.FULLSTAID || d.properties?.WFO
				const isHovered = hoveredCwaId === cwaId
				const isSelected = selectedWFOId && (wfoId === selectedWFOId || d.properties?.WFO === selectedWFOId)

				if (isSelected) {
					// Bright blue border for selected zone
					return [0, 150, 255, 255]
				}
				if (isHovered) {
					// Bright purple border for hovered zone
					return [200, 0, 255, 255]
				}
				// Default purple border
				return [128, 0, 200, 200]
			},
			getFillColor: (d: any) => {
				const cwaId = d.properties?.CWA
				const wfoId = d.properties?.FULLSTAID || d.properties?.WFO
				const isHovered = hoveredCwaId === cwaId
				const isSelected = selectedWFOId && (wfoId === selectedWFOId || d.properties?.WFO === selectedWFOId)

				if (isSelected) {
					// Brighter blue fill for selected zone
					return [150, 200, 255, 60]
				}
				if (isHovered) {
					// Brighter fill for hovered zone (light purple)
					return [220, 200, 255, 80]
				}
				// Default very light fill with low opacity (closer to county color)
				return [220, 220, 240, 25]
			},
			opacity: 0.8,
			updateTriggers: {
				getLineColor: [hoveredCwaId, selectedWFOId],
				getFillColor: [hoveredCwaId, selectedWFOId],
			},
		}),
	]
}
