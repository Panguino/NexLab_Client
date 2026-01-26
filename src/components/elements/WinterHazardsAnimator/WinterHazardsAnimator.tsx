'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { Animator } from '@/components/elements/Animator/Animator'
import { LAYER_CONFIG_PRESETS } from '@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { HAZARD_TYPE_WINTER_ID } from '@/data/hazardMapVars'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { mapZoomState } from '@/types/general'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './WinterHazardsAnimator.module.scss'

// Winter hazard type to filter for
const WINTER_HAZARD_TYPES = [HAZARD_TYPE_WINTER_ID]

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
 */
const detectRegionFromPosition = (latitude: number, longitude: number): string | null => {
	for (const [regionCode, [minLat, maxLat, minLon, maxLon]] of Object.entries(REGION_BOUNDS)) {
		if (latitude >= minLat && latitude <= maxLat && longitude >= minLon && longitude <= maxLon) {
			return regionCode
		}
	}
	return null
}

/**
 * Check if a hazard is a winter type
 */
const isWinterHazard = (alert: any): boolean => {
	const hazardType = alert?.hazardInfo?.type?.type || alert?.hazardType
	return WINTER_HAZARD_TYPES.includes(hazardType)
}

/**
 * Filter alerts to only include winter hazards
 */
const filterWinterAlerts = (alerts: any[]): any[] => {
	return alerts.filter(isWinterHazard)
}

interface WinterHazardsAnimatorProps {
	/** Pre-loaded alerts data from the server (from allHazards store) */
	alerts: Record<string, Record<string, any>>
	/** All coastal/offshore regions (for showing inactive borders) */
	allCoastalRegions?: any
}

/**
 * WinterHazardsAnimator - Deck.gl map-based winter hazards visualization
 *
 * This component wraps the Animator with map mode to display
 * winter weather hazards (Blizzard, Winter Storm, Ice Storm, Wind Chill, Snow, Freeze warnings/watches/advisories).
 * It filters the hazard data to only show winter-related alerts.
 */
export const WinterHazardsAnimator = ({ alerts, allCoastalRegions }: WinterHazardsAnimatorProps) => {
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const selectedRegion = useRootStore.use.selectedRegion()
	const setSelectedRegion = useRootStore.use.setSelectedRegion()

	// Fullscreen state from store
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const setHazardMapFullScreen = useRootStore.use.setHazardMapFullScreen()

	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [filteredRegionHazards, setFilteredRegionHazards] = useState<Record<string, any>>({})
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})
	const [targetZoomState, setTargetZoomState] = useState<mapZoomState | undefined>(REGION_VIEW_STATES.conus)

	// Track whether region change was triggered by panning
	const regionChangeFromPanRef = useRef(false)

	// Filter and set region hazards when alerts or selected region changes
	useEffect(() => {
		// When alerts prop changes, assume data is being (re)fetched and show loading
		setIsLoading(true)

		if (selectedRegion && alerts) {
			const regionName = REGION_NAME_MAP[selectedRegion]

			if (regionName && alerts[regionName]) {
				const regionAlerts = alerts[regionName]

				// Filter to only include locations with winter alerts
				const filteredAlerts: Record<string, any> = {}

				Object.entries(regionAlerts).forEach(([locationId, locationData]: [string, any]) => {
					const locationAlerts = locationData.alerts || []
					const winterAlerts = filterWinterAlerts(locationAlerts)

					if (winterAlerts.length > 0) {
						filteredAlerts[locationId] = {
							...locationData,
							alerts: winterAlerts,
						}
					}
				})

				setFilteredRegionHazards(filteredAlerts)
			} else {
				setFilteredRegionHazards({})
			}
		}
	}, [selectedRegion, alerts])

	// Update zoom state when region changes (only if not triggered by panning)
	useEffect(() => {
		if (regionChangeFromPanRef.current) {
			regionChangeFromPanRef.current = false
			return
		}
		const viewState = REGION_VIEW_STATES[selectedRegion]
		if (viewState) {
			setTargetZoomState(viewState)
		}
	}, [selectedRegion])

	// Convert filteredRegionHazards to MapFrame format
	useEffect(() => {
		if (!filteredRegionHazards || Object.keys(filteredRegionHazards).length === 0) {
			setFrames([])
			setIsLoading(false)
			return
		}

		const hexToRgba = (hex: string): [number, number, number, number] => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
			if (result) {
				return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255]
			}
			return [128, 128, 128, 255]
		}

		const isCoastalId = (id: string): boolean => /^[A-Za-z]/.test(id)

		const countyFeatures: any[] = []
		const coastalFeatures: any[] = []

		Object.entries(filteredRegionHazards).forEach(([regionId, data]: [string, any]) => {
			const { shape, alerts: regionAlerts, properties } = data
			const firstAlert = regionAlerts[0]
			const alertColor = firstAlert?.hazardInfo?.color?.HEX || '#808080'

			const feature = {
				type: 'Feature' as const,
				geometry: shape.geometry,
				properties: {
					...properties,
					id: regionId,
					ID: regionId,
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
			id: 'current-winter-hazards',
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
		setIsLoading(false)
	}, [filteredRegionHazards, selectedRegion])

	// Handle county click - open slideout panel with details
	const handleCountyClick = useCallback(
		(countyId: string) => {
			setSelectedCounty(countyId)
			openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT)
		},
		[setSelectedCounty, openSlideoutPanel],
	)

	// Handle zoom state updates from map interactions
	const handleMapZoomStateChange = useCallback(
		(newZoomState: mapZoomState) => {
			const detectedRegion = detectRegionFromPosition(newZoomState.latitude, newZoomState.longitude)
			if (detectedRegion && detectedRegion !== selectedRegion) {
				regionChangeFromPanRef.current = true
				setSelectedRegion(detectedRegion)
			}
		},
		[selectedRegion, setSelectedRegion],
	)

	// Layer configuration for hazards display
	const layerConfig = useMemo(
		() => ({
			...LAYER_CONFIG_PRESETS.COUNTY_ALERTS,
			'cwa-zones-inactive-layer': { active: false, initialValue: false },
			'cwa-zones-fill-layer': { active: false, initialValue: false },
		}),
		[],
	)

	// Show empty state if no winter hazards for this region
	if (frames.length === 0 && !isLoading) {
		return (
			<div className={styles.winterHazardsAnimator}>
				<div className={styles.emptyState}>
					<p>No active winter hazards</p>
					<p className={styles.emptyStateSubtext}>
						No current Blizzard, Winter Storm, Ice Storm, Wind Chill, or Freeze warnings/watches/advisories. Check back during active
						winter weather events.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.winterHazardsAnimator}>
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
				allCoastalRegions={allCoastalRegions}
				fullScreen={hazardMapFullScreen}
				setFullScreen={setHazardMapFullScreen}
			/>
			{isLoading && (
				<div className={styles.loadingIndicator}>
					<LoadingPanel />
				</div>
			)}
		</div>
	)
}
