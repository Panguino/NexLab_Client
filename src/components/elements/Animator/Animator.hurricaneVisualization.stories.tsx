import { StoryFn } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Animator } from './Animator'
import { LAYER_CONFIG_PRESETS } from './AnimatorMapMachine/config/layerConfigTypes'
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
	title: 'Components/Animator/Tropical',
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
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})

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
					// Add type property for layer recognition
					bestTrackGeoJSON.properties = { ...bestTrackGeoJSON.properties, type: 'best_track' }
					features.push(bestTrackGeoJSON)

					// Add best track points
					const bestTrackPointsGeoJSON = bestTrackPointsToGeoJSON(bestTrack)
					// Add type property to each point
					bestTrackPointsGeoJSON.features.forEach((feature: any) => {
						feature.properties = { ...feature.properties, type: 'best_track_point' }
					})
					features.push(...bestTrackPointsGeoJSON.features)
				}

				// Add cone of uncertainty
				if (cone && cone.length > 0) {
					const coneGeoJSON = coneToGeoJSON(cone)
					// Add type property for layer recognition
					coneGeoJSON.properties = { ...coneGeoJSON.properties, type: 'cone' }
					features.push(coneGeoJSON)
				}

				// Add forecast track
				if (pts) {
					const forecastTrackGeoJSON = forecastTrackToGeoJSON(pts)
					// Add type property for layer recognition
					forecastTrackGeoJSON.properties = { ...forecastTrackGeoJSON.properties, type: 'forecast_track' }
					features.push(forecastTrackGeoJSON)

					// Add forecast points
					const forecastPointsGeoJSON = forecastPointsToGeoJSON(pts)
					// Add type property to each point
					forecastPointsGeoJSON.features.forEach((feature: any) => {
						feature.properties = { ...feature.properties, type: 'forecast_point' }
					})
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
				mapDataType="hurricane"
				layerConfig={LAYER_CONFIG_PRESETS.TROPICAL}
				mapLayerVisibility={mapLayerVisibility}
				setMapLayerVisibility={setMapLayerVisibility}
				hideControls={true}
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
 * Storm Chooser
 * Map animator with animated tropical storm visualization
 * Displays hurricane icons with intensity-based colors
 * Shows realistic storm tracks with movement and intensity changes over time
 * Displays Irma, Jose, and Katia from the 2017 Atlantic hurricane season
 */
export const StormChooser: StoryFn = () => {
	// Import ANIMATED_STORM_FRAMES from './AnimatorMapMachine/staticMapData/animatedStormTracks'
	const ANIMATED_STORM_FRAMES = require('./AnimatorMapMachine/staticMapData/animatedStormTracks').ANIMATED_STORM_FRAMES

	const handleStormClick = (stormId: string) => {
		console.log('Storm clicked:', stormId)
		alert(`Storm clicked: ${stormId}`)
	}

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<Animator
				frames={ANIMATED_STORM_FRAMES}
				mode="map"
				mapRegion="namer"
				imageInfo={{ width: 1000, height: 600 }}
				hideControls={true}
				hideZoomControls={false}
				disableZoom={false}
				layerConfig={LAYER_CONFIG_PRESETS.TROPICAL_STORM_PICKER}
				onStormClick={handleStormClick}
			/>
		</div>
	)
}

StormChooser.parameters = {
	docs: {
		description: {
			story: 'Animated tropical storm visualization showing realistic storm tracks with movement and intensity changes over time. Displays Irma, Jose, and Katia from the 2017 Atlantic hurricane season. Click on any storm to select it.',
		},
	},
}

/**
 * Hurricane Melissa Animation
 * Historical animation of Hurricane Melissa (AL13 2025) from October 21-31, 2025
 * Shows the storm's complete evolution from Tropical Storm to Category 5 Hurricane
 *
 * Timeline:
 * - Oct 21: Tropical Storm (Cat 1, 70kt)
 * - Oct 22-25: Rapid intensification to Cat 4 (135kt)
 * - Oct 26-28: Peak intensity Cat 5 (160kt)
 * - Oct 29-30: Weakening to Cat 2 (95kt)
 *
 * Features all tropical product layers:
 * - Best Track (historical path)
 * - Forecast Track (color-coded by intensity)
 * - Cone of Uncertainty
 * - Forecast Points
 * - Watch/Warning Areas
 */
export const HurricaneMelissaAnimation: StoryFn = () => {
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})

	// Import the Melissa frames
	const { MELISSA_HURRICANE_FRAMES } = require('./AnimatorMapMachine/staticMapData/melissaHurricaneFrames')

	// Create frame labels from the metadata
	const frameLabels = MELISSA_HURRICANE_FRAMES.map((frame: any) => {
		const date = new Date(frame.timestamp)
		const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
		const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
		const category = frame.metadata.category
		const maxWind = frame.metadata.maxWind
		const catLabel = category >= 1 ? `Cat ${category}` : 'TS'
		return `${dateStr} ${timeStr} - ${catLabel} (${maxWind}kt)`
	})

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<Animator
				frames={MELISSA_HURRICANE_FRAMES}
				mode="map"
				mapRegion="namer"
				imageInfo={{ width: 1200, height: 800 }}
				autoPlay={true}
				interval={1000}
				startFrame={0}
				mapDataType="hurricane"
				layerConfig={LAYER_CONFIG_PRESETS.TROPICAL}
				mapLayerVisibility={mapLayerVisibility}
				setMapLayerVisibility={setMapLayerVisibility}
				frameLabels={frameLabels}
				displayAllLabels={false}
			/>
		</div>
	)
}

HurricaneMelissaAnimation.parameters = {
	docs: {
		description: {
			story: "Animated visualization of Hurricane Melissa showing the complete storm lifecycle from tropical storm to Category 5 hurricane. Uses historical NHC data from October 2025. Auto-plays through 10 frames showing the storm's evolution over 10 days.",
		},
	},
}

/**
 * Storm Chooser (No Storms)
 * Shows the "Skies Are Clear" overlay when there are no active tropical storms
 * Demonstrates the empty state with a clean map and friendly message
 */
export const StormChooserNoStorms: StoryFn = () => {
	const handleStormClick = (stormId: string) => {
		console.log('Storm clicked:', stormId)
	}

	// Empty frames array to simulate no active storms
	const emptyFrames: MapFrame[] = []
	const isLoading = false
	const hasStorms = false

	return (
		<div style={{ width: '100%', height: '100vh', position: 'relative' }}>
			<Animator
				frames={emptyFrames}
				mode="map"
				mapRegion="namer"
				imageInfo={{ width: 1000, height: 600 }}
				hideControls={true}
				hideZoomControls={false}
				disableZoom={false}
				layerConfig={LAYER_CONFIG_PRESETS.TROPICAL_STORM_PICKER}
				onStormClick={handleStormClick}
			/>

			{/* Skies Are Clear Overlay - matching TropicalAnimator styling */}
			{!isLoading && !hasStorms && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.1) 0%, rgba(100, 180, 220, 0.05) 100%)',
						zIndex: 50,
						backdropFilter: 'blur(2px)',
					}}
				>
					<div
						style={{
							textAlign: 'center',
							color: 'var(--color-grey7)',
							animation: 'fadeInScale 0.6s ease-out',
						}}
					>
						<div
							style={{
								fontSize: '80px',
								marginBottom: '16px',
								display: 'inline-block',
								animation: 'float 3s ease-in-out infinite',
							}}
						>
							☀️
						</div>
						<h2
							style={{
								margin: '0 0 8px 0',
								fontSize: '32px',
								fontWeight: 600,
								color: 'var(--color-grey5)',
								letterSpacing: '0.5px',
							}}
						>
							Skies Are Clear
						</h2>
						<p style={{ margin: '0 0 4px 0', fontSize: '16px', color: 'var(--color-grey7)' }}>No active tropical storms at this time</p>
						<p style={{ fontSize: '14px', color: 'var(--color-grey9)', marginTop: '8px' }}>Check back soon for updates</p>
					</div>
				</div>
			)}
		</div>
	)
}

StormChooserNoStorms.parameters = {
	docs: {
		description: {
			story: 'Shows the empty state when there are no active tropical storms. Displays a "Skies Are Clear" message with a clean map background.',
		},
	},
}
