'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { LAYER_CONFIG_PRESETS } from '@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { mapZoomState } from '@/types/general'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './HazardsAnimator.module.scss'

// Region view state configurations for different geographic regions
const REGION_VIEW_STATES: Record<string, mapZoomState> = {
	conus: { zoom: 3.8, latitude: 39.8283, longitude: -98.5795 },
	ak: { zoom: 4.2, latitude: 64.2, longitude: -152 },
	hi: { zoom: 6, latitude: 20.5, longitude: -157 },
	pr: { zoom: 8, latitude: 18.21, longitude: -66 },
	sam: { zoom: 8, latitude: -14.27, longitude: -170.7 },
	gum: { zoom: 8, latitude: 13.45, longitude: 144.8 },
}

// Region name mapping (store uses short codes, API uses full names)
const REGION_NAME_MAP: Record<string, string> = {
	conus: 'Continental United States',
	ak: 'Alaska',
	hi: 'Hawaii',
	pr: 'Puerto Rico',
	sam: 'American Samoa',
	gum: 'Guam',
}

// Bounding boxes for region detection [minLat, maxLat, minLon, maxLon]
const REGION_BOUNDS: Record<string, [number, number, number, number]> = {
	conus: [24, 50, -125, -66],
	ak: [51, 72, -180, -129],
	hi: [18, 23, -161, -154],
	pr: [17, 19, -68, -65],
	sam: [-15, -13, -172, -169],
	gum: [12, 15, 143, 146],
}

/**
 * Detect which region the map center is in based on lat/lon
 * Returns the region code or null if not in any defined region
 */
const detectRegionFromPosition = (latitude: number, longitude: number): string | null => {
	for (const [regionCode, [minLat, maxLat, minLon, maxLon]] of Object.entries(REGION_BOUNDS)) {
		if (latitude >= minLat && latitude <= maxLat && longitude >= minLon && longitude <= maxLon) {
			return regionCode
		}
	}
	return null
}

interface HazardsAnimatorProps {
	/** Pre-loaded alerts data from the server (from allHazards store) */
	alerts: Record<string, Record<string, any>>
	/** All coastal/offshore regions (for showing inactive borders) */
	allCoastalRegions?: any
}

/**
 * HazardsAnimator - Deck.gl map-based hazards visualization
 *
 * This component wraps the Animator with map mode to display
 * weather hazards. It reads from the hazards store for:
 * - selectedRegion: which region to display
 * - regionHazards: the hazard data to visualize
 * - activeHazards/Types/Levels: for sidebar hover highlighting
 */
export const HazardsAnimator = ({ alerts, allCoastalRegions }: HazardsAnimatorProps) => {
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()
	const setSelectedRegion = useRootStore.use.setSelectedRegion()
	const regionHazards = useRootStore.use.regionHazards()

	// Hazard filter state from store (for sidebar hover interaction)
	const isHazardVisible = useRootStore.use.isHazardVisible()
	const anyActiveOrToggledHazards = useRootStore.use.anyActiveOrToggledHazards()

	const [frames, setFrames] = useState<MapFrame[]>([])
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})
	const [targetZoomState, setTargetZoomState] = useState<mapZoomState | undefined>(REGION_VIEW_STATES.conus)

	// Track whether region change was triggered by panning (to prevent zoom animation)
	const regionChangeFromPanRef = useRef(false)

	// Update region hazards when alerts or selected region changes
	useEffect(() => {
		if (selectedRegion && alerts) {
			const regionName = REGION_NAME_MAP[selectedRegion]
			if (regionName && alerts[regionName]) {
				setRegionHazards(alerts[regionName])
			}
		}
	}, [selectedRegion, alerts, setRegionHazards])

	// Update zoom state when region changes (only if not triggered by panning)
	useEffect(() => {
		if (regionChangeFromPanRef.current) {
			// Region change was triggered by panning - don't animate
			regionChangeFromPanRef.current = false
			return
		}
		const viewState = REGION_VIEW_STATES[selectedRegion]
		if (viewState) {
			setTargetZoomState(viewState)
		}
	}, [selectedRegion])

	// Convert regionHazards to MapFrame format
	// Separates county alerts from coastal/offshore alerts
	useEffect(() => {
		if (!regionHazards || Object.keys(regionHazards).length === 0) {
			setFrames([])
			return
		}

		// Convert HEX color to RGBA array
		const hexToRgba = (hex: string): [number, number, number, number] => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
			if (result) {
				return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255]
			}
			return [128, 128, 128, 255]
		}

		// Helper to check if an ID is a coastal/offshore region
		// Coastal IDs typically start with letters (e.g., "ANZ", "AMZ", "GMZ", "PKZ", "PHZ", "PMZ", "PZZ", "LSZ", "LEZ", "LMZ", "LOZ", "LHZ", "LCZ", "SLZ")
		// County IDs are numeric FIPS codes (e.g., "53073")
		const isCoastalId = (id: string): boolean => {
			// If ID starts with a letter, it's likely a coastal/offshore zone
			return /^[A-Za-z]/.test(id)
		}

		const countyFeatures: any[] = []
		const coastalFeatures: any[] = []

		// Create GeoJSON features from regionHazards, separating counties from coastal
		Object.entries(regionHazards).forEach(([regionId, data]: [string, any]) => {
			const { shape, alerts: regionAlerts, properties } = data
			const firstAlert = regionAlerts[0]
			const alertColor = firstAlert?.hazardInfo?.color?.HEX || '#808080'

			const feature = {
				type: 'Feature' as const,
				geometry: shape.geometry,
				properties: {
					...properties,
					id: regionId,
					ID: regionId, // Include both formats for compatibility
					alertColor: hexToRgba(alertColor),
					hasAlert: true,
					alerts: regionAlerts.map((alert: any) => ({
						...alert,
						event: alert.event,
						headline: alert.headline,
						hazardType: alert.hazardInfo?.type?.type,
						hazardLevel: alert.hazardInfo?.level?.level,
						color: hexToRgba(alert.hazardInfo?.color?.HEX || '#808080'),
					})),
				},
			}

			if (isCoastalId(regionId)) {
				coastalFeatures.push(feature)
			} else {
				countyFeatures.push(feature)
			}
		})

		const countyGeoJSON = {
			type: 'FeatureCollection' as const,
			features: countyFeatures,
		}

		const coastalGeoJSON = {
			type: 'FeatureCollection' as const,
			features: coastalFeatures,
		}

		const frame: MapFrame = {
			id: 'current-hazards',
			timestamp: new Date(),
			data: countyGeoJSON,
			coastalData: coastalFeatures.length > 0 ? coastalGeoJSON : undefined,
			metadata: {
				alertCount: countyFeatures.length + coastalFeatures.length,
				countyAlerts: countyFeatures.length,
				coastalAlerts: coastalFeatures.length,
				region: selectedRegion,
			},
		}

		setFrames([frame])
	}, [regionHazards, selectedRegion])

	// Handle county click - open slideout panel with details
	// Note: countyData is available but not used since we read from regionHazards store
	const handleCountyClick = useCallback(
		(countyId: string) => {
			setSelectedCounty(countyId)
			openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT)
		},
		[setSelectedCounty, openSlideoutPanel],
	)

	// Handle zoom state updates from map interactions
	// Also detects when user pans to a different region and auto-switches data
	const handleMapZoomStateChange = useCallback(
		(newZoomState: mapZoomState) => {
			// Detect if user has panned to a different region
			const detectedRegion = detectRegionFromPosition(newZoomState.latitude, newZoomState.longitude)
			if (detectedRegion && detectedRegion !== selectedRegion) {
				// Mark that this region change is from panning (to prevent zoom animation)
				regionChangeFromPanRef.current = true
				setSelectedRegion(detectedRegion)
			}
		},
		[selectedRegion, setSelectedRegion],
	)

	// Hazard opacity function for sidebar hover interaction
	// Returns 1 (full opacity) if county should be visible, 0.2 (dimmed) otherwise
	const hazardOpacityFn = useCallback(
		(countyAlerts: any[]): number => {
			// If no filters are active, show all counties at full opacity
			if (anyActiveOrToggledHazards()) {
				return 1
			}

			// Check if any of the county's alerts match the active filter
			if (countyAlerts && countyAlerts.length > 0) {
				for (const alert of countyAlerts) {
					const hazardType = alert.hazardType || alert.hazardInfo?.type?.type
					const hazardLevel = alert.hazardLevel || alert.hazardInfo?.level?.level
					if (hazardType && hazardLevel && isHazardVisible(hazardType, hazardLevel)) {
						return 1 // Full opacity - this county has a matching alert
					}
				}
			}

			// No matching alerts - dim the county
			return 0.2
		},
		[anyActiveOrToggledHazards, isHazardVisible],
	)

	// Layer configuration for hazards display
	// Based on COUNTY_ALERTS preset but with CWA zones explicitly disabled
	const layerConfig = useMemo(
		() => ({
			...LAYER_CONFIG_PRESETS.COUNTY_ALERTS,
			// Explicitly disable CWA zones - this is the hazards page, not the WFO page
			'cwa-zones-inactive-layer': { active: false, initialValue: false },
			'cwa-zones-fill-layer': { active: false, initialValue: false },
		}),
		[],
	)

	// Show empty state if no hazards for this region
	if (frames.length === 0) {
		return (
			<div className={styles.hazardsAnimator}>
				<div className={styles.loading}>
					<p>No active hazards for this region</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.hazardsAnimator}>
			<Animator
				frames={frames}
				mode="map"
				mapRegion="conus"
				imageInfo={{ width: 1200, height: 800 }}
				mapDataType="alerts"
				layerConfig={layerConfig}
				autoPlay={false}
				interval={500}
				hideControls={true}
				mapLayerVisibility={mapLayerVisibility}
				setMapLayerVisibility={setMapLayerVisibility}
				onCountyClick={handleCountyClick}
				initialMapZoomState={targetZoomState}
				setMapZoomState={handleMapZoomStateChange}
				disableCwaDetection={true}
				hazardOpacityFn={hazardOpacityFn}
				allCoastalRegions={allCoastalRegions}
			/>
		</div>
	)
}
