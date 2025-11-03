'use client'

import { useEffect, useState } from 'react'
import { Animator } from '@/components/elements/Animator/Animator'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
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
import { ProcessedStormData, processStormDataArray } from '@/components/elements/Animator/AnimatorMapMachine/types/tropicalStormTypes'
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
				const stormsData = await fetchTropicalStormData('https://climate.cod.edu/data/tropical/gis/CurrentStorms.json')
				setAllStorms(stormsData)
			} catch (err) {
				console.error('Error loading active storms:', err)
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
				const products = await fetchTropicalProducts(selectedStormId)

				// Get the latest advisory
				const latest = getLatestAdvisory(products)
				if (!latest) {
					setError('No tropical products data available for this storm')
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
					timestamp: new Date().toISOString(),
					data: {
						type: 'FeatureCollection',
						features,
					},
				}

				setFrames([frame])
			} catch (err) {
				console.error('Error loading storm detail:', err)
				setError('Failed to load storm data')
			} finally {
				setIsLoading(false)
			}
		}

		if (view === 'detail' && selectedStormId) {
			loadStormDetail()
		}
	}, [selectedStormId, view, allStorms])

	// Handle storm selection from map click
	const handleStormClick = (stormId: string) => {
		onStormSelect?.(stormId)
	}

	if (view === 'overview') {
		return (
			<div className={styles.tropicalAnimatorOverview}>
				<Animator
					frames={allStorms.length > 0 ? [{ id: 'overview', timestamp: new Date().toISOString(), data: { type: 'FeatureCollection', features: [] } }] : []}
					mode="map"
					mapRegion="namer"
					imageInfo={{ width: 1200, height: 800 }}
					autoPlay={false}
					interval={500}
					startFrame={0}
					mapDataType="hurricane"
					mapLayerVisibility={mapLayerVisibility}
					setMapLayerVisibility={setMapLayerVisibility}
				/>
				{isLoading && <div className={styles.loading}>Loading storms...</div>}
				{error && <div className={styles.error}>{error}</div>}
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
				mapLayerVisibility={mapLayerVisibility}
				setMapLayerVisibility={setMapLayerVisibility}
			/>

			{isLoading && <div className={styles.loading}>Loading storm data...</div>}
			{error && <div className={styles.error}>{error}</div>}
		</div>
	)
}

