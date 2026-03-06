'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { zoomToCwaZone } from '@/components/elements/Animator/AnimatorMapMachine/utils/mapZoomUtils'
import cwaZonesData from '@/data/d3Map/cwaZones.json'
import { useRootStore } from '@/store/useRootStore'
import { mapZoomState } from '@/types/general'
import { createCountyAlertFrame } from '@/util/dataCalls/alerts/createCountyAlertFrames'
import { fetchRealTimeHazards, parseHazardsToCountyMap } from '@/util/dataCalls/alerts/parseCountyAlerts'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './WFOAnimator.module.scss'

interface WFOAnimatorProps {
	selectedWFOId?: string | null
	view?: 'overview' | 'detail'
}

export const WFOAnimator = ({ selectedWFOId, view = 'overview' }: WFOAnimatorProps) => {
	const router = useRouter()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})
	const [targetZoomStateRaw, setTargetZoomStateRaw] = useState<mapZoomState | undefined>(() => {
		if (view === 'detail' && selectedWFOId) {
			const viewportWidth = 1200
			const viewportHeight = 800
			return zoomToCwaZone(cwaZonesData as any, selectedWFOId, viewportWidth, viewportHeight, 0.3) || undefined
		} else if (view === 'overview') {
			return {
				zoom: 4,
				latitude: 39.8283,
				longitude: -98.5795,
			}
		}
		return undefined
	})

	// Memoize targetZoomState to prevent infinite loop
	// The object reference must remain stable unless the actual values change
	const targetZoomState = useMemo(() => targetZoomStateRaw, [targetZoomStateRaw?.zoom, targetZoomStateRaw?.latitude, targetZoomStateRaw?.longitude])

	// Handle CWA zone click - navigate to WFO detail page
	// Works in both overview and detail view to allow switching between WFO regions
	const handleCwaClick = useCallback(
		(cwaId: string, wfoId: string) => {
			console.log(`CWA zone clicked: ${cwaId}, WFO: ${wfoId}`)

			// Navigate to WFO detail page (route is the source of truth)
			const wfoBasePath = '/weather-data/text-hazards-outlooks/nws-wfo-national-weather-service-forecast-offices'
			router.push(`${wfoBasePath}/${wfoId}`)
		},
		[router],
	)

	// Handle county click - open slideout panel with alert details
	// Only works in detail view (onCountyClick is only passed in detail mode)
	const handleCountyClick = useCallback(
		(countyId: string, countyData: any) => {
			// Only handle county clicks in detail view
			if (view !== 'detail') return

			console.log(`County clicked: ${countyId}`, countyData)

			// Transform alerts from HazardData format to match hazards page structure
			// The hazards page expects alerts with hazardInfo property containing type, level, and color
			const transformedAlerts = (countyData.alerts || []).map((alert: any) => {
				// If alert already has hazardInfo, use it as-is
				if (alert.hazardInfo) {
					return alert
				}

				// Otherwise, transform from HazardData format
				// Extract type and level from hazardType and hazardLevel fields
				const hazardType = alert.hazardType || 'UNKNOWN'
				const hazardLevel = alert.hazardLevel || 'UNKNOWN'

				// Map type and level to display names
				// Using inline mappings to avoid import issues
				const HAZARD_TYPE_NAMES_MAP: Record<string, string> = {
					TORNADO: 'Tornado',
					SEVERE: 'SEVERE',
					FIRE: 'FIRE',
					HYDROLOGICAL: 'Hydro',
					MARINE: 'Marine',
					NONMET: 'Non-Met',
					NONPRECIP: 'Non-Precip',
					TROPICAL: 'Tropical',
					WINTER: 'Winter',
					SPECIALWX: 'Special',
				}

				const HAZARD_LEVEL_NAMES_MAP: Record<string, string> = {
					WARNING: 'Warning',
					WATCH: 'Watch',
					ADVISORY: 'Advisory',
					STATEMENT: 'Statement',
				}

				const hazardTypeName = HAZARD_TYPE_NAMES_MAP[hazardType] || hazardType
				const hazardLevelName = HAZARD_LEVEL_NAMES_MAP[hazardLevel] || hazardLevel

				// Parse color - it can be either:
				// 1. An object with hex/rgb properties from the API
				// 2. An RGBA array [r, g, b, a] from parseHazardsToCountyMap
				let hexColor = '#808080' // Default grey

				if (alert.color) {
					if (typeof alert.color === 'object' && 'hex' in alert.color) {
						// API format: { hex: '#FF0000', rgb: '255,0,0' }
						hexColor = alert.color.hex
					} else if (Array.isArray(alert.color) && alert.color.length >= 3) {
						// RGBA array format: [255, 0, 0, 255]
						const [r, g, b] = alert.color
						hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
					}
				}

				console.log('Alert color transformation:', {
					originalColor: alert.color,
					hexColor,
					hazardType,
					hazardLevel,
				})

				return {
					...alert,
					hazardInfo: {
						type: {
							type: hazardType,
							name: hazardTypeName,
						},
						level: {
							level: hazardLevel,
							name: hazardLevelName,
						},
						color: {
							HEX: hexColor,
						},
					},
				}
			})

			// Format county data to match hazards page structure
			// The regionHazards state expects a Record where keys are county IDs
			// and values contain {shape, alerts, properties}
			const formattedRegionHazards = {
				[countyId]: {
					shape: countyData.shape,
					alerts: transformedAlerts,
					properties: countyData.properties,
				},
			}

			// Update zustand store with county data
			setRegionHazards(formattedRegionHazards)
			setSelectedCounty(countyId)

			// Open slideout panel - HazardsDetailPanel will read from the store
			// Using the constant from @/data/vars
			const SLIDEOUT_PANEL_ID = 'DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT'
			openSlideoutPanel(SLIDEOUT_PANEL_ID)
		},
		[view, setRegionHazards, setSelectedCounty, openSlideoutPanel],
	)

	// Update target zoom state when view or selectedWFOId changes
	useEffect(() => {
		console.log('WFOAnimator Effect Triggered:', { view, selectedWFOId })
		if (view === 'detail' && selectedWFOId) {
			// Calculate zoom state for the selected WFO
			// Use standard viewport dimensions for calculation
			const viewportWidth = 1200
			const viewportHeight = 800
			const zoomState = zoomToCwaZone(cwaZonesData as any, selectedWFOId, viewportWidth, viewportHeight, 0.3)

			console.log('Calculated Zoom State:', zoomState)

			if (zoomState) {
				setTargetZoomStateRaw({
					zoom: zoomState.zoom,
					latitude: zoomState.latitude,
					longitude: zoomState.longitude,
				})
			}
		} else if (view === 'overview') {
			// Reset to overview zoom (CONUS)
			setTargetZoomStateRaw({
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
		setTargetZoomStateRaw(newZoomState)
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
					// Coastal regions removed from WFO page - not needed for WFO office alerts
					'coastal-regions-inactive-layer': { active: false, initialValue: false },
					'coastal-data-regions-layer': { active: false, initialValue: false },
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
				hideControls={true} // Hide controls - WFO animator only shows a single frame (current alerts), no animation needed
				mapLayerVisibility={mapLayerVisibility}
				setMapLayerVisibility={setMapLayerVisibility}
				onCwaClick={handleCwaClick} // Enable CWA clicks in both overview and detail view
				onCountyClick={view === 'detail' ? handleCountyClick : undefined} // Enable county clicks only in detail view
				selectedWFOId={view === 'detail' ? selectedWFOId : null} // Pass selected WFO for filtering
				initialMapZoomState={targetZoomState}
				setMapZoomState={handleMapZoomStateChange}
			/>
		</div>
	)
}
