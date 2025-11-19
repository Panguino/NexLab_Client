import { GeoJsonLayer } from '@deck.gl/layers'

export interface OceanLayerProps {
	oceanColor: number[]
}

/**
 * OceanLayer - Renders ocean background
 * Uses theme color blue1-blue2: Light mode: #8aadcf (138, 173, 207), Dark mode: #233544 (35, 53, 68)
 */
export const createOceanLayer = ({ oceanColor }: OceanLayerProps) => {
	return new GeoJsonLayer({
		id: 'ocean-layer',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[-180, -90],
								[180, -90],
								[180, 90],
								[-180, 90],
								[-180, -90],
							],
						],
					},
					properties: {},
				},
			],
		} as any,
		filled: true,
		stroked: false,
		getFillColor: () => oceanColor as any,
		opacity: 1,
		updateTriggers: {
			getFillColor: [oceanColor],
		},
	})
}
