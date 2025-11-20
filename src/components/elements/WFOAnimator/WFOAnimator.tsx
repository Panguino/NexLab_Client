'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { zoomToCwaZone } from '@/components/elements/Animator/AnimatorMapMachine/utils/mapZoomUtils'
import { mapZoomState } from '@/components/elements/Animator/types'
import cwaZonesData from '@/data/d3Map/cwaZones.json'
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
	const [targetZoomState, setTargetZoomState] = useState<mapZoomState | undefined>(undefined)

	// Handle CWA zone click - navigate to WFO detail page (only in overview mode)
	const handleCwaClick = useCallback(
		(cwaId: string, wfoId: string) => {
			console.log(`CWA zone clicked: ${cwaId}, WFO: ${wfoId}`)

			// In overview mode, navigate to WFO detail page
			if (view === 'overview') {
				const wfoBasePath = '/weather-data/text-hazards-outlooks/nws-wfo-national-weather-service-forecast-offices'
				router.push(`${wfoBasePath}/${wfoId}`)
			}

			// Call optional callback if provided
			if (onWFOSelect) {
				onWFOSelect(wfoId)
			}
		},
		[router, onWFOSelect, view],
	)

	// Update target zoom state when view or selectedWFOId changes
	useEffect(() => {
		if (view === 'detail' && selectedWFOId) {
			// Calculate zoom state for the selected WFO
			// Use standard viewport dimensions for calculation
			const viewportWidth = 1200
			const viewportHeight = 800
			const zoomState = zoomToCwaZone(cwaZonesData as any, selectedWFOId, viewportWidth, viewportHeight, 0.15)

			if (zoomState) {
				setTargetZoomState({
					zoom: zoomState.zoom,
					latitude: zoomState.latitude,
					longitude: zoomState.longitude,
				})
			}
		} else if (view === 'overview') {
			// Reset to overview zoom (CONUS)
			setTargetZoomState({
				zoom: 4,
				latitude: 39.8283,
				longitude: -98.5795,
			})
		}
	}, [view, selectedWFOId])

	// Callback to receive zoom state updates from Animator
	const handleMapZoomStateChange = useCallback((newZoomState: mapZoomState) => {
		// Update target zoom state to match current state
		// This prevents the zoom from resetting when user manually pans/zooms
		setTargetZoomState(newZoomState)
	}, [])

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

	// Layer configuration based on view mode
	const layerConfig =
		view === 'overview'
			? {
					// Overview mode: Show CWA zones for selection
					'world-layer': { active: true, initialValue: true },
					'states-layer': { active: true, initialValue: true },
					'lakes-layer': { active: true, initialValue: true },
					'latlong-grid': { active: true, initialValue: true },
					'cwa-zones-inactive-layer': { active: true, initialValue: true },
					'cwa-zones-fill-layer': { active: true, initialValue: true },
				}
			: {
					// Detail mode: Show ALL CWA zones (for navigation) + counties in selected region
					'world-layer': { active: true, initialValue: true },
					'states-layer': { active: true, initialValue: true },
					'states-fill-layer': { active: true, initialValue: true },
					'lakes-layer': { active: true, initialValue: true },
					'latlong-grid': { active: true, initialValue: true },
					'cwa-zones-inactive-layer': { active: true, initialValue: true }, // Keep CWA zones visible
					'cwa-zones-fill-layer': { active: true, initialValue: true }, // Keep CWA zones visible
					'counties-inactive-layer': { active: true, initialValue: true }, // Only counties in selected WFO
					'county-data-regions-layer': { active: true, initialValue: true }, // Only counties in selected WFO
					'coastal-regions-inactive-layer': { active: true, initialValue: false },
					'coastal-data-regions-layer': { active: true, initialValue: false },
				}

	return (
		<div className={styles.wfoAnimator}>
			<Animator
				frames={frames}
				mode="map"
				mapRegion="conus"
				imageInfo={{ width: 1200, height: 800 }}
				mapDataType="alerts"
				layerConfig={layerConfig}
				autoPlay={false}
				interval={500}
				hideControls={view === 'detail'} // Hide controls in detail view (single frame, no animation needed)
				mapLayerVisibility={mapLayerVisibility}
				onMapLayerVisibilityChange={setMapLayerVisibility}
				onCwaClick={handleCwaClick} // Enable CWA clicks in both overview and detail view
				selectedWFOId={view === 'detail' ? selectedWFOId : null} // Pass selected WFO for filtering
				initialMapZoomState={targetZoomState}
				setMapZoomState={handleMapZoomStateChange}
			/>
		</div>
	)
}
