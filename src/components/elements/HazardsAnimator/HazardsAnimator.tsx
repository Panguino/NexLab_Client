'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { LAYER_CONFIG_PRESETS } from '@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes'
import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { mapZoomState } from '@/types/general'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './HazardsAnimator.module.scss'

// Region view state configurations for different geographic regions
// Note: Zoom must be > 4.5 for counties to show in AnimatorMapMachine
const REGION_VIEW_STATES: Record<string, mapZoomState> = {
	conus: { zoom: 4.6, latitude: 39.8283, longitude: -98.5795 },
	ak: { zoom: 4.6, latitude: 64.2, longitude: -152 },
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

interface HazardsAnimatorProps {
	/** Pre-loaded alerts data from the server (from allHazards store) */
	alerts: Record<string, Record<string, any>>
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
export const HazardsAnimator = ({ alerts }: HazardsAnimatorProps) => {
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()
	const regionHazards = useRootStore.use.regionHazards()

	const [frames, setFrames] = useState<MapFrame[]>([])
	const [mapLayerVisibility, setMapLayerVisibility] = useState<Record<string, boolean>>({})
	const [targetZoomState, setTargetZoomState] = useState<mapZoomState | undefined>(REGION_VIEW_STATES.conus)

	// Update region hazards when alerts or selected region changes
	useEffect(() => {
		if (selectedRegion && alerts) {
			const regionName = REGION_NAME_MAP[selectedRegion]
			if (regionName && alerts[regionName]) {
				setRegionHazards(alerts[regionName])
			}
		}
	}, [selectedRegion, alerts, setRegionHazards])

	// Update zoom state when region changes
	useEffect(() => {
		const viewState = REGION_VIEW_STATES[selectedRegion]
		if (viewState) {
			setTargetZoomState(viewState)
		}
	}, [selectedRegion])

	// Convert regionHazards to MapFrame format
	useEffect(() => {
		if (!regionHazards || Object.keys(regionHazards).length === 0) {
			setFrames([])
			return
		}

		// Create GeoJSON features from regionHazards
		const features = Object.entries(regionHazards).map(([countyId, data]: [string, any]) => {
			const { shape, alerts: countyAlerts, properties } = data
			const firstAlert = countyAlerts[0]
			const alertColor = firstAlert?.hazardInfo?.color?.HEX || '#808080'

			// Convert HEX color to RGBA array
			const hexToRgba = (hex: string): [number, number, number, number] => {
				const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
				if (result) {
					return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255]
				}
				return [128, 128, 128, 255]
			}

			return {
				type: 'Feature' as const,
				geometry: shape.geometry,
				properties: {
					...properties,
					id: countyId,
					alertColor: hexToRgba(alertColor),
					hasAlert: true,
					alerts: countyAlerts.map((alert: any) => ({
						...alert,
						event: alert.event,
						headline: alert.headline,
						hazardType: alert.hazardInfo?.type?.type,
						hazardLevel: alert.hazardInfo?.level?.level,
						color: hexToRgba(alert.hazardInfo?.color?.HEX || '#808080'),
					})),
				},
			}
		})

		const geoJSON = {
			type: 'FeatureCollection' as const,
			features,
		}

		const frame: MapFrame = {
			id: 'current-hazards',
			timestamp: new Date(),
			data: geoJSON,
			metadata: {
				alertCount: features.length,
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
	const handleMapZoomStateChange = useCallback((newZoomState: mapZoomState) => {
		setTargetZoomState(newZoomState)
	}, [])

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
			/>
		</div>
	)
}
