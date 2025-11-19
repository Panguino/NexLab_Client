import cwaZonesData from '@/data/d3Map/cwaZones.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface CwaZonesLayerProps {
	showFill: boolean
	showBorders: boolean
	hoveredCwaId: string | null
}

/**
 * CwaZonesLayer - Renders CWA (County Warning Areas) zones with hover feedback
 * Shows both fill and borders with conditional styling based on hover state
 */
export const createCwaZonesLayer = ({ showFill, showBorders, hoveredCwaId }: CwaZonesLayerProps) => {
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
				const isHovered = hoveredCwaId === cwaId

				if (isHovered) {
					// Bright purple border for hovered zone
					return [200, 0, 255, 255]
				}
				// Default purple border
				return [128, 0, 200, 200]
			},
			getFillColor: (d: any) => {
				const cwaId = d.properties?.CWA
				const isHovered = hoveredCwaId === cwaId

				if (isHovered) {
					// Brighter fill for hovered zone (light purple)
					return [220, 200, 255, 80]
				}
				// Default very light fill with low opacity (closer to county color)
				return [220, 220, 240, 25]
			},
			opacity: 0.8,
			updateTriggers: {
				getLineColor: [hoveredCwaId],
				getFillColor: [hoveredCwaId],
			},
		}),
	]
}
