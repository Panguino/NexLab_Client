import fireZonesData from '@/data/d3Map/fireZones.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface FireZonesLayerProps {
	showFill: boolean
	showBorders: boolean
}

/**
 * FireZonesLayer - Renders fire weather zones
 * Orange/red color scheme for fire zones
 */
export const createFireZonesLayer = ({ showFill, showBorders }: FireZonesLayerProps) => {
	if (!showFill && !showBorders) return []

	return [
		new GeoJsonLayer({
			id: 'fire-zones-layer',
			data: fireZonesData as any,
			filled: showFill,
			stroked: showBorders,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: () => [255, 100, 0, 200], // Orange borders
			getFillColor: () => [255, 150, 50, 50], // Light orange fill with low opacity
			opacity: 0.8,
			pickable: false,
		}),
	]
}
