import lakesData from '@/data/d3Map/lakes.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface LakesLayerProps {
	visible: boolean
	oceanColor: number[]
}

/**
 * LakesLayer - Renders Great Lakes using ocean color to match water
 * Uses theme color blue1-blue2: Light mode: #8aadcf (138, 173, 207), Dark mode: #233544 (35, 53, 68)
 */
export const createLakesLayer = ({ visible, oceanColor }: LakesLayerProps) => {
	if (!visible) return []

	return [
		new GeoJsonLayer({
			id: 'lakes-layer',
			data: lakesData as any,
			filled: true,
			stroked: false,
			getFillColor: () => oceanColor as any,
			opacity: 1,
			pickable: false,
			updateTriggers: {
				getFillColor: [oceanColor],
			},
		}),
	]
}
