import { GeoJsonLayer } from '@deck.gl/layers'

export interface LatLongGridLayerProps {
	visible: boolean
	gridlineColor: number[]
	spacing?: number
	dashLength?: number
	gapLength?: number
}

/**
 * Generate dashed lat-long grid lines
 * Creates a grid of latitude and longitude lines at regular intervals
 * Uses short line segments to simulate dashes
 */
function generateGridLines(spacing: number = 0.5, dashLength: number = 0.25, gapLength: number = 0.25): any {
	const features: any[] = []

	// Latitude lines (horizontal)
	for (let lat = -90; lat <= 90; lat += spacing) {
		// Create dashed line by generating segments
		for (let lon = -180; lon < 180; lon += dashLength + gapLength) {
			features.push({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[lon, lat],
						[Math.min(lon + dashLength, 180), lat],
					],
				},
				properties: { type: 'latitude', value: lat },
			})
		}
	}

	// Longitude lines (vertical)
	for (let lon = -180; lon <= 180; lon += spacing) {
		// Create dashed line by generating segments
		for (let lat = -90; lat < 90; lat += dashLength + gapLength) {
			features.push({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[lon, lat],
						[lon, Math.min(lat + dashLength, 90)],
					],
				},
				properties: { type: 'longitude', value: lon },
			})
		}
	}

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * LatLongGridLayer - Renders latitude/longitude grid lines
 * More visible grey with higher opacity for geographic context
 */
export const createLatLongGridLayer = ({ visible, gridlineColor, spacing = 10, dashLength = 0.2, gapLength = 0.1 }: LatLongGridLayerProps) => {
	if (!visible) return []

	const gridData = generateGridLines(spacing, dashLength, gapLength)

	return [
		new GeoJsonLayer({
			id: 'latlong-grid',
			data: gridData,
			filled: false,
			stroked: true,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: () => gridlineColor as any,
			opacity: 0.5,
			pickable: false,
			updateTriggers: {
				getLineColor: [gridlineColor],
			},
		}),
	]
}
