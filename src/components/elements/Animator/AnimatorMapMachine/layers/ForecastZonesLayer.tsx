import forecastZonesData from '@/data/d3Map/forecastZones.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface ForecastZonesLayerProps {
	showFill: boolean
	showBorders: boolean
}

/**
 * ForecastZonesLayer - Renders public forecast zones
 * Blue/teal color scheme for forecast zones
 */
export const createForecastZonesLayer = ({ showFill, showBorders }: ForecastZonesLayerProps) => {
	if (!showFill && !showBorders) return []

	return [
		new GeoJsonLayer({
			id: 'forecast-zones-layer',
			data: forecastZonesData as any,
			filled: showFill,
			stroked: showBorders,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: () => [0, 150, 200, 200], // Teal borders
			getFillColor: () => [50, 180, 220, 50], // Light teal fill with low opacity
			opacity: 0.8,
			pickable: false,
		}),
	]
}
