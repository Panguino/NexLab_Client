import statesData from '@/data/d3Map/states.json'
import { GeoJsonLayer } from '@deck.gl/layers'

export interface StatesLayerProps {
	showFill: boolean
	showBorders: boolean
	statesColor: number[]
	borderColor: number[]
}

/**
 * StatesLayer - Renders US state boundaries and fills
 * Fill: Light mode: white (#ffffff), Dark mode: grey13 (#5f5f5f)
 * Borders: Light mode: grey10 (#6b6b6b), Dark mode: grey10 (#6b6b6b)
 */
export const createStatesLayers = ({ showFill, showBorders, statesColor, borderColor }: StatesLayerProps) => {
	const layers = []

	// State fills layer
	if (showFill) {
		layers.push(
			new GeoJsonLayer({
				id: 'states-fill-layer',
				data: statesData as any,
				filled: true,
				stroked: false,
				getFillColor: () => statesColor as any,
				opacity: 1,
				pickable: false,
				updateTriggers: {
					getFillColor: [statesColor],
				},
			}),
		)
	}

	// State borders layer
	if (showBorders) {
		layers.push(
			new GeoJsonLayer({
				id: 'states-layer',
				data: statesData as any,
				filled: false,
				stroked: true,
				lineWidthMinPixels: 1,
				lineWidthMaxPixels: 2,
				getLineColor: () => borderColor as any,
				opacity: 1,
				pickable: false,
				updateTriggers: {
					getLineColor: [borderColor],
				},
			}),
		)
	}

	return layers
}
