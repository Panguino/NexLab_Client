'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { ProcessedStormData } from '@/components/elements/Animator/AnimatorMapMachine/types/tropicalStormTypes'
import {
	bestTrackPointsToGeoJSON,
	bestTrackToGeoJSON,
	coneToGeoJSON,
	fetchTropicalProducts,
	forecastPointsToGeoJSON,
	forecastTrackToGeoJSON,
	getLatestAdvisory,
	watchWarningsToGeoJSON,
} from '@/components/elements/Animator/AnimatorMapMachine/utils/tropicalProductsParser'
import { fetchTropicalStormData } from '@/components/elements/Animator/AnimatorMapMachine/utils/tropicalStormUtils'
import { useEffect, useState } from 'react'
import styles from './TropicalAnimator.module.scss'

interface TropicalAnimatorProps {
	selectedStormId?: string | null
	onStormSelect?: (stormId: string) => void
	view?: 'overview' | 'detail'
}

export const TropicalAnimator = ({ selectedStormId, onStormSelect, view = 'overview' }: TropicalAnimatorProps) => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})
	const [allStorms, setAllStorms] = useState<ProcessedStormData[]>([])
	const [currentStorm, setCurrentStorm] = useState<ProcessedStormData | null>(null)

	// Load all active storms for overview
	useEffect(() => {
		const loadActiveStorms = async () => {
			try {
				setIsLoading(true)
				setError(null)

				// Load active storms from live data
				const stormsData = await fetchTropicalStormData('https://climate.cod.edu/data/tropical/gis/CurrentStorms.json')

				setAllStorms(stormsData)
			} catch (err) {
				setError('Failed to load tropical storm data')
				setAllStorms([])
			} finally {
				setIsLoading(false)
			}
		}

		if (view === 'overview') {
			loadActiveStorms()
		}
	}, [view])

	// Load detail view data when storm is selected
	useEffect(() => {
		const loadStormDetail = async () => {
			if (!selectedStormId) return

			try {
				setIsLoading(true)
				setError(null)

				// Find the storm in our list
				const storm = allStorms.find((s) => s.id === selectedStormId)
				if (storm) {
					setCurrentStorm(storm)
				}

				// Fetch tropical products data for this storm
				let products
				try {
					products = await fetchTropicalProducts(selectedStormId)
				} catch (err) {
					// Create an empty frame if products can't be fetched
					const frame: MapFrame = {
						id: `storm-${selectedStormId}`,
						timestamp: new Date(),
						data: {
							type: 'FeatureCollection',
							features: [],
						},
					}
					setFrames([frame])
					setIsLoading(false)
					return
				}

				// Get the latest advisory
				const latest = getLatestAdvisory(products)
				if (!latest) {
					console.warn('No tropical products data available for this storm')
					// Create an empty frame if no advisory data
					const frame: MapFrame = {
						id: `storm-${selectedStormId}`,
						timestamp: new Date(),
						data: {
							type: 'FeatureCollection',
							features: [],
						},
					}
					setFrames([frame])
					setIsLoading(false)
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
					watchWarningGeoJSON.features.forEach((feature: any) => {
						if (!feature.properties) feature.properties = {}
						feature.properties.type = feature.properties.type || 'Unknown'
					})
					features.push(...watchWarningGeoJSON.features)
				}

				// Create a single frame with all data
				const frame: MapFrame = {
					id: `storm-${selectedStormId}`,
					timestamp: new Date(),
					data: {
						type: 'FeatureCollection',
						features,
					},
					tropicalStorms: currentStorm ? [currentStorm] : [],
				}

				setFrames([frame])
			} catch (err) {
				setError('Failed to load storm data')
			} finally {
				setIsLoading(false)
			}
		}

		if (view === 'detail' && selectedStormId) {
			loadStormDetail()
		}
	}, [selectedStormId, view, allStorms, currentStorm])

	// Handle storm selection from map click
	const handleStormClick = (stormId: string) => {
		onStormSelect?.(stormId)
	}

	if (view === 'overview') {
		const hasStorms = allStorms.length > 0 && !isLoading

		return (
			<div className={styles.tropicalAnimatorOverview}>
				<Animator
					frames={
						hasStorms
							? [
									{
										id: 'overview',
										timestamp: new Date(),
										data: { type: 'FeatureCollection', features: [] },
										tropicalStorms: allStorms,
									},
								]
							: []
					}
					mode="map"
					mapRegion="namer"
					imageInfo={{ width: 1200, height: 800 }}
					autoPlay={false}
					interval={500}
					startFrame={0}
					mapDataType="hurricane"
					layerConfig={
						// Import LAYER_CONFIG_PRESETS from '@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes'
						require('@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes').LAYER_CONFIG_PRESETS
							.TROPICAL_STORM_PICKER
					}
					hideControls={true}
					onStormClick={handleStormClick}
				/>

				{isLoading && <div className={styles.loading}>Loading storms...</div>}
				{error && <div className={styles.error}>{error}</div>}

				{!isLoading && !hasStorms && (
					<div className={styles.skiesClearOverlay}>
						<div className={styles.skiesClearContent}>
							<div className={styles.sunIcon}>☀️</div>
							<h2>Skies Are Clear</h2>
							<p>No active tropical storms at this time</p>
							<p className={styles.subtext}>Check back soon for updates</p>
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<div className={styles.tropicalAnimatorDetail}>
			{currentStorm && (
				<div className={styles.stormInfo}>
					<h2>{currentStorm.name}</h2>
					<div className={styles.stormDetails}>
						<p>
							<strong>Classification:</strong> {currentStorm.classification}
						</p>
						<p>
							<strong>Category:</strong> {currentStorm.category}
						</p>
						<p>
							<strong>Intensity:</strong> {currentStorm.intensity} knots
						</p>
						<p>
							<strong>Pressure:</strong> {currentStorm.pressure} mb
						</p>
						<p>
							<strong>Position:</strong> {currentStorm.latitude.toFixed(2)}°, {currentStorm.longitude.toFixed(2)}°
						</p>
						<p>
							<strong>Movement:</strong> {currentStorm.movementDir}° at {currentStorm.movementSpeed} knots
						</p>
					</div>
				</div>
			)}

			<Animator
				frames={frames}
				mode="map"
				mapRegion="namer"
				imageInfo={{ width: 1200, height: 800 }}
				autoPlay={false}
				interval={500}
				startFrame={0}
				mapDataType="hurricane"
				layerConfig={
					// Import LAYER_CONFIG_PRESETS from '@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes'
					require('@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes').LAYER_CONFIG_PRESETS.TROPICAL
				}
				mapLayerVisibility={mapLayerVisibility}
				setMapLayerVisibility={setMapLayerVisibility}
				onStormClick={handleStormClick}
			/>

			{isLoading && <div className={styles.loading}>Loading storm data...</div>}
			{error && <div className={styles.error}>{error}</div>}
		</div>
	)
}
