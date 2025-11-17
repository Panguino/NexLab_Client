'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { createCountyAlertFrame } from '@/util/dataCalls/alerts/createCountyAlertFrames'
import { fetchRealTimeHazards, parseHazardsToCountyMap } from '@/util/dataCalls/alerts/parseCountyAlerts'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './WFOAnimator.module.scss'

interface WFOAnimatorProps {
	selectedWFOId?: string | null
	onWFOSelect?: (wfoId: string) => void
	view?: 'overview' | 'detail'
}

export const WFOAnimator = ({ selectedWFOId, onWFOSelect, view = 'overview' }: WFOAnimatorProps) => {
	const router = useRouter()
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})

	// Handle CWA zone click - navigate to WFO detail page
	const handleCwaClick = useCallback(
		(cwaId: string, wfoId: string) => {
			console.log(`CWA zone clicked: ${cwaId}, WFO: ${wfoId}`)

			// Navigate to WFO detail page
			const wfoBasePath = '/weather-data/text-hazards-outlooks/nws-wfo-national-weather-service-forecast-offices'
			router.push(`${wfoBasePath}/${wfoId}`)

			// Call optional callback if provided
			if (onWFOSelect) {
				onWFOSelect(wfoId)
			}
		},
		[router, onWFOSelect],
	)

	// Load county alerts data
	useEffect(() => {
		const loadCountyAlerts = async () => {
			try {
				setIsLoading(true)
				setError(null)

				// Fetch real-time hazards from API
				const hazardsResponse = await fetchRealTimeHazards({ region: 'CONUS' })

				// Parse hazards to county alert map
				const countyAlertMap = parseHazardsToCountyMap(hazardsResponse)

				// Create a single frame with current alerts
				const frame = createCountyAlertFrame(countyAlertMap, new Date(), 'current-alerts', {
					source: 'real-time-hazards',
				})

				setFrames([frame])
			} catch (err) {
				console.error('Failed to load county alerts:', err)
				setError('Failed to load county alerts data')
				setFrames([])
			} finally {
				setIsLoading(false)
			}
		}

		loadCountyAlerts()
	}, [])

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<p>Loading WFO data...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.error}>
				<p>{error}</p>
			</div>
		)
	}

	return (
		<div className={styles.wfoAnimator}>
			<Animator
				frames={frames}
				mode="map"
				mapRegion="conus"
				imageInfo={{ width: 1200, height: 800 }}
				mapDataType="alerts"
				layerConfig={{
					// Static layers for overview mode
					'world-layer': { active: true, initialValue: true },
					'states-layer': { active: true, initialValue: true },
					'lakes-layer': { active: true, initialValue: true },
					'latlong-grid': { active: true, initialValue: true },
					'cwa-zones-inactive-layer': { active: true, initialValue: true },
					'cwa-zones-fill-layer': { active: true, initialValue: true },
					// No data layers in overview mode
				}}
				autoPlay={false}
				interval={500}
				hideControls={true}
				mapLayerVisibility={mapLayerVisibility}
				onMapLayerVisibilityChange={setMapLayerVisibility}
				onCwaClick={handleCwaClick}
			/>
		</div>
	)
}
