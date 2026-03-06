import worldData from '@/data/d3Map/world.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface WorldLayerProps {
	visible: boolean
	worldColor: number[]
}

/**
 * WorldLayer - Renders world countries as faded background
 * Uses theme color grey2-grey16: Light mode: #d8d8d8 (216, 216, 216), Dark mode: #484848 (72, 72, 72)
 */
export const createWorldLayer = ({ visible, worldColor }: WorldLayerProps) => {
	if (!visible) return []

	return [
		new GeoJsonLayer({
			id: 'world-layer',
			data: worldData as any,
			filled: true,
			stroked: true,
			lineWidthMinPixels: 0.5,
			lineWidthMaxPixels: 1,
			getLineColor: () => [0, 0, 0, 255], // Black borders
			getLineWidth: () => 0.5,
			getFillColor: () => worldColor as any,
			opacity: 0.3, // Faded/subtle - reduced to prevent covering states
			pickable: false,
			updateTriggers: {
				getFillColor: [worldColor],
			},
		}),
	]
}
