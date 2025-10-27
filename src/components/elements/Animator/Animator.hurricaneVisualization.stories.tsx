import { StoryFn } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Animator } from './Animator'
import { MapFrame } from './AnimatorMapMachine/types'
import {
	bestTrackPointsToGeoJSON,
	bestTrackToGeoJSON,
	coneToGeoJSON,
	fetchTropicalProducts,
	forecastPointsToGeoJSON,
	forecastTrackToGeoJSON,
	getLatestAdvisory,
	watchWarningsToGeoJSON,
} from './AnimatorMapMachine/utils/tropicalProductsParser'

export default {
	title: 'Components/Animator/Hurricane Visualization',
	component: Animator,
	parameters: {
		layout: 'fullscreen',
	},
}

/**
 * Hurricane Visualization Story
 * Displays real-time tropical products data with:
 * - Forecast track (color-coded by intensity)
 * - Cone of uncertainty
 * - Watch/warning areas
 * - Best track (historical path)
 */
export const HurricaneVisualization: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadHurricaneData = async () => {
			try {
				setIsLoading(true)

				// Fetch tropical products data for Hurricane Melissa (AL13 2025)
				const products = await fetchTropicalProducts('al132025')

				// Get the latest advisory
				const latest = getLatestAdvisory(products)
				if (!latest) {
					setError('No tropical products data available')
					return
				}

				const { data } = latest
				const { cone, pts, ww, bestTrack } = data

				// Create a combined GeoJSON with all visualization layers
				const features: any[] = []

				// Add best track (historical path)
				if (bestTrack && Object.keys(bestTrack).length > 0) {
					const bestTrackGeoJSON = bestTrackToGeoJSON(bestTrack)
					features.push(bestTrackGeoJSON)

					// Add best track points
					const bestTrackPointsGeoJSON = bestTrackPointsToGeoJSON(bestTrack)
					features.push(...bestTrackPointsGeoJSON.features)
				}

				// Add cone of uncertainty
				if (cone && cone.length > 0) {
					const coneGeoJSON = coneToGeoJSON(cone)
					// Add type property for styling
					coneGeoJSON.properties = { ...coneGeoJSON.properties, type: 'Cone of Uncertainty' }
					features.push(coneGeoJSON)
				}

				// Add forecast track
				if (pts) {
					const forecastTrackGeoJSON = forecastTrackToGeoJSON(pts)
					features.push(forecastTrackGeoJSON)

					// Add forecast points
					const forecastPointsGeoJSON = forecastPointsToGeoJSON(pts)
					features.push(...forecastPointsGeoJSON.features)
				}

				// Add watch/warning areas
				if (ww && ww.length > 0) {
					const watchWarningGeoJSON = watchWarningsToGeoJSON(ww)
					// Ensure each feature has type property for styling
					watchWarningGeoJSON.features.forEach((feature: any) => {
						if (!feature.properties) feature.properties = {}
						feature.properties.type = feature.properties.type || 'Unknown'
					})
					features.push(...watchWarningGeoJSON.features)
				}

				// Create a single frame with all data
				const frame: MapFrame = {
					id: 'hurricane-latest',
					timestamp: new Date(),
					data: {
						type: 'FeatureCollection',
						features,
					},
					metadata: {
						source: 'tropical-products',
						stormname: pts?.stormname || 'Unknown',
						advisnum: pts?.advisnum || 'N/A',
						totalFeatures: features.length,
					},
				}

				setFrames([frame])
				setError(null)
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Failed to load hurricane data'
				console.error('Error loading hurricane data:', err)
				setError(errorMsg)
			} finally {
				setIsLoading(false)
			}
		}

		loadHurricaneData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
				<div>Loading hurricane data...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
				<div style={{ color: 'red' }}>Error: {error}</div>
			</div>
		)
	}

	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Animator
				frames={frames}
				mode="map"
				mapRegion="conus"
				imageInfo={{ width: 1200, height: 800 }}
				autoPlay={false}
				interval={500}
				startFrame={0}
			/>
		</div>
	)
}

HurricaneVisualization.parameters = {
	docs: {
		description: {
			story: `
Displays real-time hurricane/tropical storm visualization using NHC tropical products data.

Features:
- **Best Track**: Gray dashed line showing historical storm path
- **Forecast Track**: Color-coded by Saffir-Simpson category (Red=Cat5, Orange=Cat4, Yellow=Cat3, etc.)
- **Forecast Points**: Sized by wind speed, colored by intensity
- **Cone of Uncertainty**: Light blue semi-transparent polygon showing forecast uncertainty
- **Watch/Warning Areas**: 
  - Red filled areas = Hurricane Warnings (HWA)
  - Orange filled areas = Tropical Storm Warnings (TWA)
  - Red dashed outline = Hurricane Watches (HWR)
  - Orange dashed outline = Tropical Storm Watches (TWR)

Data Source: https://climate.cod.edu/data/tropical/web/al132025/products.json
			`,
		},
	},
}

/**
 * Static Hurricane Data Story
 * Uses pre-loaded tropical products data for testing
 */
export const HurricaneVisualizationStatic: StoryFn<typeof Animator> = () => {
	// Sample tropical products data structure
	const sampleFrame: MapFrame = {
		id: 'hurricane-sample',
		timestamp: new Date(),
		data: {
			type: 'FeatureCollection',
			features: [
				// Best track line
				{
					type: 'Feature',
					properties: { name: 'Best Track', type: 'BestTrack' },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-41.5, 10.6],
							[-43.3, 10.9],
							[-45.5, 11.2],
							[-78.0, 16.4],
						],
					},
				},
				// Forecast track line
				{
					type: 'Feature',
					properties: { stormname: 'Hurricane Melissa', advisnum: '25A', type: 'ForecastTrack' },
					geometry: {
						type: 'LineString',
						coordinates: [
							[-78.3, 16.5],
							[-78.3, 16.9],
							[-77.9, 17.8],
							[-76.9, 19.1],
							[-75.5, 20.8],
						],
					},
				},
				// Cone of uncertainty
				{
					type: 'Feature',
					properties: { name: 'Cone of Uncertainty', type: 'Cone of Uncertainty' },
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[-78.0, 16.0],
								[-78.5, 16.5],
								[-77.5, 17.5],
								[-77.0, 17.0],
								[-78.0, 16.0],
							],
						],
					},
				},
				// Sample hurricane warning area
				{
					type: 'Feature',
					properties: { type: 'HWA', name: 'Hurricane Warning Area' },
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[-76.5, 18.5],
								[-76.0, 18.5],
								[-76.0, 19.0],
								[-76.5, 19.0],
								[-76.5, 18.5],
							],
						],
					},
				},
				// Sample tropical storm warning area
				{
					type: 'Feature',
					properties: { type: 'TWA', name: 'Tropical Storm Warning Area' },
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[-75.5, 19.5],
								[-75.0, 19.5],
								[-75.0, 20.0],
								[-75.5, 20.0],
								[-75.5, 19.5],
							],
						],
					},
				},
			],
		},
		metadata: {
			source: 'tropical-products',
			stormname: 'Hurricane Melissa',
			advisnum: '25A',
		},
	}

	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Animator
				frames={[sampleFrame]}
				mode="map"
				mapRegion="conus"
				imageInfo={{ width: 1200, height: 800 }}
				autoPlay={false}
				interval={500}
				startFrame={0}
			/>
		</div>
	)
}

HurricaneVisualizationStatic.parameters = {
	docs: {
		description: {
			story: 'Static hurricane visualization with sample data for testing and development.',
		},
	},
}
