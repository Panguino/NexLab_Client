import { GeoJsonLayer } from '@deck.gl/layers'

export interface HoverHighlightLayerProps {
	hoveredCountyId: string | null
	hoveredCwaId: string | null
	countyData: any
	cwaZonesData: any
}

/**
 * HoverHighlightLayer - Renders a bright highlight border for hovered regions
 * Always rendered at the top of all layers for maximum visibility
 * Shows only the border (no fill) of the currently hovered county or CWA region
 */
export const createHoverHighlightLayer = ({
	hoveredCountyId,
	hoveredCwaId,
	countyData,
	cwaZonesData,
}: HoverHighlightLayerProps) => {
	// Only render if something is hovered
	if (!hoveredCountyId && !hoveredCwaId) {
		return []
	}

	// Determine which data source to use and filter to the hovered feature
	let filteredData = null

	if (hoveredCwaId && cwaZonesData?.features) {
		// Filter CWA zones data to show only the hovered CWA
		const hoveredFeature = cwaZonesData.features.find((f: any) => f.properties?.CWA === hoveredCwaId)
		if (hoveredFeature) {
			filteredData = {
				type: 'FeatureCollection',
				features: [hoveredFeature],
			}
		}
	} else if (hoveredCountyId && countyData?.features) {
		// Filter county data to show only the hovered county
		const hoveredFeature = countyData.features.find((f: any) => {
			let countyId = f.properties?.id || f.properties?.ID
			if (!countyId && f.properties?.FIPS) {
				const fipsMatch = f.properties.FIPS.match(/(\d{5})/)
				countyId = fipsMatch ? fipsMatch[1] : null
			}
			return countyId === hoveredCountyId
		})
		if (hoveredFeature) {
			filteredData = {
				type: 'FeatureCollection',
				features: [hoveredFeature],
			}
		}
	}

	// If no feature found, return empty array
	if (!filteredData) {
		return []
	}

	return [
		new GeoJsonLayer({
			id: 'hover-highlight-layer',
			data: filteredData as any,
			filled: false, // No fill, only border
			stroked: true,
			lineWidthMinPixels: 2,
			lineWidthMaxPixels: 3,
			getLineColor: [255, 255, 255, 255], // Bright white for high contrast
			opacity: 1,
			pickable: false,
			updateTriggers: {
				data: [hoveredCountyId, hoveredCwaId],
			},
		}),
	]
}
