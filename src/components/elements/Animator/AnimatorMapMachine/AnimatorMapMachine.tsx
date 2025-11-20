'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import countiesData from '@/data/d3Map/counties.json'
import countriesData from '@/data/d3Map/countries.json'
import { getHazardInfoFromEvent } from '@/util/dataCalls/alerts/parseCountyAlerts'
import { GeoJsonLayer } from '@deck.gl/layers'
import DeckGL from 'deck.gl'
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAnimator } from '../Animator'
import styles from './AnimatorMapMachine.module.scss'
import { CwaTooltip, type CwaTooltipInfo } from './components/CwaTooltip'
import MapAlertTooltip from './components/MapAlertTooltip'
import { StormTooltip } from './components/StormTooltip'
import { getDefaultLayerVisibility } from './config/mapLayers'
import { useClickDetection } from './hooks/useClickDetection'
import { useHoverDetection } from './hooks/useHoverDetection'
import { useMapData } from './hooks/useMapData'
import { useMultiAlertAnimation } from './hooks/useMultiAlertAnimation'
import { createCoastalRegionsLayer } from './layers/CoastalRegionsLayer'
import { createCountiesLayer } from './layers/CountiesLayer'
import { createCwaZonesLayer } from './layers/CwaZonesLayer'
import { createFireZonesLayer } from './layers/FireZonesLayer'
import { createForecastZonesLayer } from './layers/ForecastZonesLayer'
import { createHurricaneLayer, getHurricaneIconCanvasSync, initializeHurricaneIcons } from './layers/HurricaneLayer'
import { createLakesLayer } from './layers/LakesLayer'
import { createLatLongGridLayer } from './layers/LatLongGridLayer'
import { createOceanLayer } from './layers/OceanLayer'
import { createStatesLayers } from './layers/StatesLayer'
import { createStormTrackLayer } from './layers/StormTrackLayer'
import { createWorldLayer } from './layers/WorldLayer'
import { IAnimatorMapMachineProps, MapFrame } from './types'
import { zoomToCwaZone } from './utils/mapZoomUtils'
import { createAffectedRegionsGeoJSON, detectAllAffectedRegions, getWarningColor } from './utils/regionDetection'

// Import booleanPointInPolygon for point-in-polygon detection
let booleanPointInPolygon: any = null
try {
	const turf = require('@turf/turf')
	booleanPointInPolygon = turf.booleanPointInPolygon
} catch (e) {
	console.warn('Failed to load @turf/turf')
}

/**
 * Check if a point is within a bounding box (fast pre-filter)
 */
function isPointInBBox(lon: number, lat: number, bbox: number[]): boolean {
	// bbox format: [minLon, minLat, maxLon, maxLat]
	return lon >= bbox[0] && lon <= bbox[2] && lat >= bbox[1] && lat <= bbox[3]
}

/**
 * Get or compute bounding box for a feature
 */
function getFeatureBBox(feature: any): number[] | null {
	// Check if bbox is already cached in properties
	if (feature.properties?._bbox) {
		return feature.properties._bbox
	}

	// Compute bbox from geometry
	const coords = feature.geometry?.coordinates
	if (!coords) return null

	let minLon = Infinity,
		minLat = Infinity,
		maxLon = -Infinity,
		maxLat = -Infinity

	const processCoords = (coordArray: any) => {
		if (typeof coordArray[0] === 'number') {
			// Single coordinate pair
			minLon = Math.min(minLon, coordArray[0])
			maxLon = Math.max(maxLon, coordArray[0])
			minLat = Math.min(minLat, coordArray[1])
			maxLat = Math.max(maxLat, coordArray[1])
		} else {
			// Nested array
			coordArray.forEach(processCoords)
		}
	}

	processCoords(coords)

	const bbox = [minLon, minLat, maxLon, maxLat]
	// Cache bbox in properties for future use
	if (feature.properties) {
		feature.properties._bbox = bbox
	}
	return bbox
}

/**
 * Find which county, coastal region, or CWA zone a given lat/long point is in
 * Uses point-in-polygon detection with Turf.js
 * Optimized with bounding box pre-filtering
 * Returns object with id and type ('county', 'coastal', or 'cwa')
 *
 * @param selectedWFOId - If provided, skip this WFO when checking CWA zones (to allow county detection in detail view)
 */
function findRegionAtPoint(
	latitude: number,
	longitude: number,
	coastalData?: any,
	cwaData?: any,
	selectedWFOId?: string | null,
): { id: string; type: 'county' | 'coastal' | 'cwa'; wfoId?: string } | null {
	if (!booleanPointInPolygon) return null

	const point = [longitude, latitude]

	// First search through CWA zones if available (only ~125 zones)
	// Skip the selected WFO zone if in detail view to allow county detection
	if (cwaData && cwaData.features) {
		const cwaFeatures = cwaData.features || []
		for (const feature of cwaFeatures) {
			try {
				// Fast bounding box check first
				const bbox = getFeatureBBox(feature)
				if (bbox && !isPointInBBox(longitude, latitude, bbox)) {
					continue // Skip expensive point-in-polygon check
				}

				if (booleanPointInPolygon(point, feature)) {
					const cwaId = feature.properties?.CWA
					const wfoId = feature.properties?.FULLSTAID

					// Skip the selected WFO zone to allow county tooltips in detail view
					if (selectedWFOId && wfoId === selectedWFOId) {
						continue
					}

					if (cwaId) {
						return { id: cwaId, type: 'cwa', wfoId }
					}
				}
			} catch (e) {
				// Skip features that cause errors
				continue
			}
		}
	}

	// Then search through coastal data if available
	if (coastalData && coastalData.features) {
		const coastalFeatures = coastalData.features || []
		for (const feature of coastalFeatures) {
			try {
				// Fast bounding box check first
				const bbox = getFeatureBBox(feature)
				if (bbox && !isPointInBBox(longitude, latitude, bbox)) {
					continue // Skip expensive point-in-polygon check
				}

				if (booleanPointInPolygon(point, feature)) {
					const regionId = feature.properties?.id || feature.properties?.ID
					if (regionId) {
						return { id: regionId, type: 'coastal' }
					}
				}
			} catch (e) {
				// Skip features that cause errors
				continue
			}
		}
	}

	// Finally search through counties data (~3000 counties)
	// Only check counties if we haven't found a CWA or coastal region
	const features = (countiesData as any).features || []
	for (const feature of features) {
		try {
			// Fast bounding box check first
			const bbox = getFeatureBBox(feature)
			if (bbox && !isPointInBBox(longitude, latitude, bbox)) {
				continue // Skip expensive point-in-polygon check
			}

			if (booleanPointInPolygon(point, feature)) {
				// Extract county ID from properties
				let countyId = feature.properties?.id || feature.properties?.ID
				if (!countyId && feature.properties?.FIPS) {
					const fipsMatch = feature.properties.FIPS.match(/(\d{5})/)
					countyId = fipsMatch ? fipsMatch[1] : null
				}
				if (countyId) {
					return { id: countyId, type: 'county' }
				}
			}
		} catch (e) {
			// Skip features that cause errors
			continue
		}
	}

	return null
}

/**
 * AnimatorMapMachine Component
 *
 * Core component for rendering map frames with opacity-based transitions.
 * Similar to AnimatorImageMachine but for geographic/map data.
 *
 * Features:
 * - Frame-based animation with opacity transitions
 * - Deck.gl for GPU-accelerated rendering
 * - Support for multiple map regions
 * - Customizable overlays and styling
 * - Mobile-optimized performance
 */
export const AnimatorMapMachine = forwardRef<HTMLDivElement, IAnimatorMapMachineProps>(
	(
		{
			frames,
			currentFrame,
			loadedFrames: externalLoadedFrames,
			setLoadedFrames: externalSetLoadedFrames,
			zIndex = 30,
			onFrameChange,
			_onViewStateChange,
			containerStyle,
			viewState: externalViewState,
			layerVisibility = {},
			onStormClick,
			onCwaClick,
			selectedWFOId,
		},
		ref,
	) => {
		// Local state
		const [isLoading, setIsLoading] = useState(true)
		const [localLoadedFrames, setLocalLoadedFrames] = useState<MapFrame[]>([])
		const [isDarkMode, setIsDarkMode] = useState(false)
		const [stormHoverInfo, setStormHoverInfo] = useState<any>(null)
		const [showTooltip, setShowTooltip] = useState(false)
		const [isHoveringStorm, setIsHoveringStorm] = useState(false)
		const deckGLRef = useRef<any>(null)
		const containerRef = useRef<HTMLDivElement>(null)

		// Get targetMapZoomState and setMapZoomState from Animator context for smooth zoom animation
		const animatorContext = useAnimator()
		const targetMapZoomState = animatorContext?.targetMapZoomState
		const setMapZoomState = animatorContext?.setMapZoomState

		// Use custom hooks for data and interactions
		const { cwaZonesData } = useMapData()
		const {
			hoveredCountyId,
			setHoveredCountyId,
			hoveredCwaId,
			setHoveredCwaId,
			setHoveredCwaWfoId,
			tooltipVisible,
			setTooltipVisible,
			tooltipTitle,
			setTooltipTitle,
			tooltipAlerts,
			setTooltipAlerts,
			cwaTooltipVisible,
			setCwaTooltipVisible,
			cwaTooltipInfo,
			setCwaTooltipInfo,
		} = useHoverDetection()

		useClickDetection(onStormClick, onCwaClick)

		/**
		 * Memoized mapping of county IDs to CWA zone IDs
		 * This is expensive to compute (point-in-polygon for ~3000 counties x ~125 CWA zones)
		 * but only needs to be done once when the data loads
		 */
		const countyToCwaMap = useMemo(() => {
			if (!cwaZonesData || !booleanPointInPolygon) {
				return new Map<string, string>()
			}

			const map = new Map<string, string>()
			const counties = (countiesData as any).features || []
			const cwaZones = cwaZonesData.features || []

			console.log('🗺️ Building county-to-CWA mapping...', {
				counties: counties.length,
				cwaZones: cwaZones.length,
			})

			// For each county, find which CWA zone it belongs to
			counties.forEach((countyFeature: any) => {
				const countyId = countyFeature.properties?.id || countyFeature.properties?.ID
				if (!countyId) {
					// Extract county ID from FIPS if needed
					if (countyFeature.properties?.FIPS) {
						const fipsMatch = countyFeature.properties.FIPS.match(/(\d{5})/)
						if (!fipsMatch) return
						const finalCountyId = fipsMatch[1]

						const lat = countyFeature.properties?.latitude
						const lon = countyFeature.properties?.longitude
						if (!lat || !lon) return

						const point = [lon, lat]

						// Check which CWA zone this county belongs to
						for (const cwaFeature of cwaZones) {
							try {
								if (booleanPointInPolygon(point, cwaFeature)) {
									const cwaId = cwaFeature.properties?.CWA
									if (cwaId) {
										map.set(finalCountyId, cwaId)
										break // County found, no need to check other CWA zones
									}
								}
							} catch (e) {
								// Skip errors
							}
						}
					}
					return
				}

				const lat = countyFeature.properties?.latitude
				const lon = countyFeature.properties?.longitude
				if (!lat || !lon) return

				const point = [lon, lat]

				// Check which CWA zone this county belongs to
				for (const cwaFeature of cwaZones) {
					try {
						if (booleanPointInPolygon(point, cwaFeature)) {
							const cwaId = cwaFeature.properties?.CWA
							if (cwaId) {
								map.set(countyId, cwaId)
								break // County found, no need to check other CWA zones
							}
						}
					} catch (e) {
						// Skip errors
					}
				}
			})

			console.log('✅ County-to-CWA mapping complete:', {
				mappedCounties: map.size,
				totalCounties: counties.length,
				coverage: `${((map.size / counties.length) * 100).toFixed(1)}%`,
			})

			return map
		}, [cwaZonesData])

		// Initialize layer visibility with defaults if not provided
		const initializedLayerVisibility = useMemo(() => {
			const hasValues = Object.keys(layerVisibility).length > 0
			return hasValues ? layerVisibility : getDefaultLayerVisibility()
		}, [layerVisibility])

		// CONTROLLED COMPONENT: Use the global mapZoomState from parent
		// All state changes (buttons, mouse interactions) update the global state
		// DeckGL always receives the current viewState from the global state
		const viewState = useMemo(
			() =>
				externalViewState ?? {
					longitude: -95,
					latitude: 37,
					zoom: 3,
				},
			[externalViewState],
		)

		// Smooth zoom animation using custom easing
		// Moves a small percentage of the distance each frame for smooth transitions
		useEffect(() => {
			if (!targetMapZoomState || !setMapZoomState) return

			const EASING_FACTOR = 0.05 // Move 5% of distance each frame (slower = smaller value)
			const THRESHOLD = 0.001 // Stop when delta is very small

			const animationFrame = requestAnimationFrame(() => {
				const currentZoom = viewState.zoom
				const currentLat = viewState.latitude
				const currentLon = viewState.longitude

				const targetZoom = targetMapZoomState.zoom
				const targetLat = targetMapZoomState.latitude
				const targetLon = targetMapZoomState.longitude

				// Calculate deltas
				const deltaZoom = targetZoom - currentZoom
				const deltaLat = targetLat - currentLat
				const deltaLon = targetLon - currentLon

				// Check if we're close enough to stop
				if (Math.abs(deltaZoom) < THRESHOLD && Math.abs(deltaLat) < THRESHOLD && Math.abs(deltaLon) < THRESHOLD) {
					// Snap to final position
					setMapZoomState({
						zoom: targetZoom,
						latitude: targetLat,
						longitude: targetLon,
					})
					return
				}

				// Move a fraction of the distance
				setMapZoomState({
					zoom: currentZoom + deltaZoom * EASING_FACTOR,
					latitude: currentLat + deltaLat * EASING_FACTOR,
					longitude: currentLon + deltaLon * EASING_FACTOR,
				})
			})

			return () => cancelAnimationFrame(animationFrame)
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [viewState])

		const loadedFrames = externalLoadedFrames ?? localLoadedFrames
		const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

		// Initialize hurricane icons on component mount
		useEffect(() => {
			initializeHurricaneIcons().catch((error) => {
				console.error('Failed to initialize hurricane icons:', error)
			})
		}, [])

		// Detect dark mode from DOM class
		useEffect(() => {
			const checkDarkMode = () => {
				const isDark = document.documentElement.classList.contains('dark')
				setIsDarkMode(isDark)
			}

			checkDarkMode()

			// Watch for theme changes
			const observer = new MutationObserver(checkDarkMode)
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

			return () => observer.disconnect()
		}, [])

		// Theme-aware colors (RGBA format)
		const isDark = isDarkMode
		// Memoize colors to prevent dependency changes on every render
		const { oceanColor, worldColor, statesColor, borderColor, countyBorderColor, gridlineColor } = useMemo(() => {
			// Ocean: blue1 (#8aadcf) light / blue2 (#233544) dark
			const oceanColor = isDark ? [35, 53, 68, 255] : [138, 173, 207, 255]
			// World: grey2 (#d8d8d8) light / grey16 (#484848) dark
			const worldColor = isDark ? [72, 72, 72, 255] : [216, 216, 216, 255]
			// US States: white (#ffffff) light / grey13 (#5f5f5f) dark
			const statesColor = isDark ? [95, 95, 95, 255] : [255, 255, 255, 255]
			// State Borders: grey18 (#232323) light / grey15 (#505050) dark - darker
			const borderColor = isDark ? [80, 80, 80, 255] : [35, 35, 35, 255]
			// County Borders: grey14 (#6b6b6b) light / grey12 (#7a7a7a) dark - lighter than state borders
			const countyBorderColor = isDark ? [122, 122, 122, 255] : [107, 107, 107, 255]
			// Grid lines: more visible grey with higher opacity
			const gridlineColor = isDark ? [120, 120, 120, 180] : [180, 180, 180, 180]
			return { oceanColor, worldColor, statesColor, borderColor, countyBorderColor, gridlineColor }
		}, [isDark])

		// Load frames
		useEffect(() => {
			const loadFrames = async () => {
				setIsLoading(true)
				const validFrames: MapFrame[] = []

				try {
					for (const frame of frames) {
						// Validate frame structure
						if (frame && frame.id && frame.data) {
							validFrames.push(frame)
						}
					}

					setLoadedFrames(validFrames)
				} catch (error) {
					// Silently catch frame loading errors
				} finally {
					setIsLoading(false)
				}
			}

			loadFrames()
		}, [frames, setLoadedFrames])

		// Extract alert color map from current frame
		// This creates a lightweight map of county ID -> alert color
		// without duplicating the geometry data
		const currentFrameAlertMap = useMemo(() => {
			if (loadedFrames.length === 0) return {}

			const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
			const frame = loadedFrames[activeFrame]

			if (!frame || !frame.data) return {}

			// If frame.data is a FeatureCollection, extract alert info from features
			if ('features' in frame.data && Array.isArray(frame.data.features)) {
				const alertMap: Record<string, any> = {}

				frame.data.features.forEach((feature: any) => {
					const countyId = feature.properties?.id

					if (countyId && feature.properties?.alertColor) {
						alertMap[countyId] = {
							color: feature.properties.alertColor,
							hasAlert: feature.properties.hasAlert,
							alerts: feature.properties.alerts,
						}
					}
				})

				return alertMap
			}

			return {}
		}, [loadedFrames, currentFrame])

		// Extract coastal alert map from current frame
		const currentFrameCoastalAlertMap = useMemo(() => {
			if (loadedFrames.length === 0) return {}

			const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
			const frame = loadedFrames[activeFrame]

			if (frame && frame.coastalData && frame.coastalData.features) {
				const alertMap: Record<string, any> = {}
				frame.coastalData.features.forEach((feature: any) => {
					const regionId = feature.properties?.id || feature.properties?.ID
					if (regionId && feature.properties?.alertColor) {
						alertMap[regionId] = {
							color: feature.properties.alertColor,
							hasAlert: feature.properties.hasAlert,
							alerts: feature.properties.alerts,
						}
					}
				})
				return alertMap
			}

			return {}
		}, [loadedFrames, currentFrame])

		// Use multi-alert animation hook for counties with 2+ alerts
		const { animatedColors } = useMultiAlertAnimation(currentFrameAlertMap, true)

		// Create layers with base map and current frame data
		const layers = useMemo(() => {
			// Helper function to check if a layer should be visible
			const shouldShowLayer = (layerId: string): boolean => {
				// Use initialized layer visibility (with defaults applied)
				return initializedLayerVisibility[layerId] ?? true
			}

			const baseLayers: any[] = [
				// Ocean background layer
				createOceanLayer({ oceanColor }),

				// World layer - faded background for all countries
				...createWorldLayer({
					visible: shouldShowLayer('world-layer'),
					worldColor,
				}),

				// States layers - fills and borders
				...createStatesLayers({
					showFill: shouldShowLayer('states-fill-layer'),
					showBorders: shouldShowLayer('states-layer'),
					statesColor,
					borderColor,
				}),

				// Great Lakes layer
				...createLakesLayer({
					visible: shouldShowLayer('lakes-layer'),
					oceanColor,
				}),

				// Lat/Long grid layer
				...createLatLongGridLayer({
					visible: shouldShowLayer('latlong-grid'),
					gridlineColor,
				}),

				// CWA Zones layer - always visible, highlights selected WFO in detail view
				...createCwaZonesLayer({
					showFill: shouldShowLayer('cwa-zones-fill-layer'),
					showBorders: shouldShowLayer('cwa-zones-inactive-layer'),
					hoveredCwaId,
					selectedWFOId,
				}),

				// Fire Zones layer
				...createFireZonesLayer({
					showFill: shouldShowLayer('fire-zones-fill-layer'),
					showBorders: shouldShowLayer('fire-zones-inactive-layer'),
				}),

				// Forecast Zones layer
				...createForecastZonesLayer({
					showFill: shouldShowLayer('forecast-zones-fill-layer'),
					showBorders: shouldShowLayer('forecast-zones-inactive-layer'),
				}),

				// Counties layer - only render when zoomed in for performance (unless in detail view)
				// If selectedWFOId is provided, always show counties in that WFO region regardless of zoom
				...(selectedWFOId || viewState.zoom > 4.5
					? createCountiesLayer({
							data:
								loadedFrames.length > 0
									? loadedFrames[
											currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
										]?.data
									: null,
							showInactiveBorders: shouldShowLayer('counties-inactive-layer'),
							showAlertData: shouldShowLayer('county-data-regions-layer'),
							countyBorderColor,
							hoveredCountyId,
							alertMap: currentFrameAlertMap,
							animatedColors,
							filterCountyFn: selectedWFOId
								? (countyId: string) => {
										// Find the CWA ID for this WFO
										const cwaFeature = cwaZonesData?.features?.find(
											(f: any) => f.properties?.FULLSTAID === selectedWFOId || f.properties?.WFO === selectedWFOId,
										)
										const cwaId = cwaFeature?.properties?.CWA
										if (!cwaId) return false
										// Check if this county belongs to the selected CWA
										return countyToCwaMap.get(countyId) === cwaId
									}
								: undefined,
						})
					: []),

				// Coastal regions layer
				...createCoastalRegionsLayer({
					data:
						loadedFrames.length > 0
							? loadedFrames[currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame]
									?.coastalData
							: null,
					showInactiveBorders: shouldShowLayer('coastal-regions-inactive-layer'),
					showAlertData: shouldShowLayer('coastal-data-regions-layer'),
					oceanColor,
					alertMap: currentFrameCoastalAlertMap,
				}),
			]

			// Add overlays and tropical storms from current frame if available
			if (loadedFrames.length > 0) {
				const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
				const frame = loadedFrames[activeFrame]

				// Add frame data as GeoJSON layer if present
				// This renders features from tropical products data (forecast track, cone, warnings, etc.)
				if (frame && frame.data && shouldShowLayer('frame-data-layer')) {
					// Render all frame data features including warning/watch shapes
					if (frame.data.features && frame.data.features.length > 0) {
						baseLayers.push(
							new GeoJsonLayer({
								id: 'frame-data-layer',
								data: frame.data as any,
								stroked: true,
								filled: true,
								lineWidthMinPixels: 1,
								lineWidthMaxPixels: 3,
								getLineColor: (d: any) => {
									// Color based on feature type
									const type = d.properties?.type
									if (type === 'HWA') return [255, 0, 0, 255] // Red for Hurricane Warning
									if (type === 'TWA') return [255, 165, 0, 255] // Orange for Tropical Storm Warning
									if (type === 'HWR') return [255, 0, 0, 255] // Red for Hurricane Watch
									if (type === 'TWR') return [255, 165, 0, 255] // Orange for Tropical Storm Watch
									if (type === 'Forecast Track') return [100, 100, 100, 255] // Gray
									if (type === 'Best Track') return [150, 150, 150, 255] // Light gray
									return [100, 100, 100, 255] // Default gray
								},
								getFillColor: (d: any) => {
									// Fill color based on feature type
									const type = d.properties?.type
									if (type === 'HWA') return [255, 0, 0, 50] // Red with 20% opacity
									if (type === 'TWA') return [255, 165, 0, 45] // Orange with 18% opacity
									if (type === 'HWR') return [255, 0, 0, 0] // Transparent fill for watch
									if (type === 'TWR') return [255, 165, 0, 0] // Transparent fill for watch
									if (type === 'Cone of Uncertainty') return [100, 150, 255, 50] // Cone - Light blue 20% opacity
									return [100, 100, 100, 0] // Default transparent
								},
								opacity: 0,
								pickable: false,
								updateTriggers: {
									getLineColor: [frame.data],
									getFillColor: [frame.data],
								},
							}),
						)
					}

					// Phase 2: Add region alert layer for affected countries/regions
					// Only render regions that are actually affected (performance optimized)
					if (shouldShowLayer('region-alerts-layer')) {
						try {
							// Extract warning polygons from frame data
							const warningPolygons: Array<{ polygon: any; type: 'HWA' | 'TWA' | 'HWR' | 'TWR' }> = []

							if (frame.data.features) {
								for (const feature of frame.data.features) {
									const type = feature.properties?.type
									if (type === 'HWA' || type === 'TWA' || type === 'HWR' || type === 'TWR') {
										if (feature.geometry?.type === 'Polygon' || feature.geometry?.type === 'MultiPolygon') {
											warningPolygons.push({ polygon: feature, type })
										}
									}
								}
							}

							// Detect affected regions
							if (warningPolygons.length > 0) {
								const affectedRegionMap = detectAllAffectedRegions(warningPolygons, countriesData as any)

								if (affectedRegionMap.size > 0) {
									// Create GeoJSON with only affected regions
									const affectedRegionsGeoJSON = createAffectedRegionsGeoJSON(affectedRegionMap, countriesData as any)

									// Add region alert layer
									baseLayers.push(
										new GeoJsonLayer({
											id: 'region-alerts-layer',
											data: affectedRegionsGeoJSON as any,
											stroked: true,
											filled: true,
											lineWidthMinPixels: 1,
											lineWidthMaxPixels: 2,
											getLineColor: (d: any) => {
												const warningType = d.properties?.warningType
												return getWarningColor(warningType).outline
											},
											getFillColor: (d: any) => {
												const warningType = d.properties?.warningType
												return getWarningColor(warningType).fill
											},
											opacity: 1,
											pickable: false,
											updateTriggers: {
												getLineColor: [frame.data],
												getFillColor: [frame.data],
											},
										}),
									)
								}
							}
						} catch (error) {
							// Silently catch errors in region detection
						}
					}
				}

				// Add overlays if present
				if (frame && frame.overlays) {
					frame.overlays.forEach((overlay) => {
						baseLayers.push(
							new GeoJsonLayer({
								id: `overlay-${overlay.id}`,
								data: overlay.data as any,
								stroked: true,
								filled: true,
								getLineColor: [0, 0, 255, 255],
								getFillColor: [0, 0, 255, 128],
								opacity: 0, //overlay.opacity ?? _baseOpacity,
							}),
						)
					})
				}

				// Extract and render forecast points from frame data (Phase 1 improvement)
				if (frame && frame.data && frame.data.features && shouldShowLayer('forecast-points-layer')) {
					try {
						// Find forecast points in the frame data
						// Forecast points have datetime and maxwind properties
						const forecastPointsFeatures = frame.data.features.filter(
							(f: any) => f.geometry?.type === 'Point' && (f.properties?.datetime || f.properties?.maxwind !== undefined),
						)

						if (forecastPointsFeatures.length > 0) {
							// Create a GeoJSON with only forecast points
							const forecastPointsGeoJSON = {
								type: 'FeatureCollection' as const,
								features: forecastPointsFeatures,
							}

							// Add forecast points layer with enhanced styling
							baseLayers.push(
								new GeoJsonLayer({
									id: 'forecast-points-layer',
									data: forecastPointsGeoJSON as any,
									pickable: true,
									pointRadiusMinPixels: 5,
									pointRadiusMaxPixels: 16,
									getPointRadius: (f: any) => {
										const maxwind = f.properties?.maxwind || 0
										// Scale from 6.4 to 16 pixels based on wind speed (20% smaller)
										return 6.4 + (maxwind / 150) * 9.6
									},
									getFillColor: (f: any) => {
										const ss = f.properties?.ss || 0
										// Use category colors
										const colors: Record<number, [number, number, number, number]> = {
											0: [255, 255, 0, 255], // Yellow - TS
											1: [255, 200, 0, 255], // Orange - Cat 1
											2: [255, 100, 0, 255], // Dark Orange - Cat 2
											3: [255, 0, 0, 255], // Red - Cat 3
											4: [200, 0, 0, 255], // Dark Red - Cat 4
											5: [150, 0, 0, 255], // Very Dark Red - Cat 5
										}
										return colors[ss] || [100, 100, 100, 255]
									},
									getLineColor: [255, 255, 255, 255],
									getLineWidth: 1.5,
									lineWidthMinPixels: 1,
									lineWidthMaxPixels: 2,
									updateTriggers: {
										getPointRadius: [frame.data],
										getFillColor: [frame.data],
									},
								}),
							)
						}
					} catch (error) {
						// Silently catch forecast points layer errors
					}
				}

				// Add cone of uncertainty layer if present
				if (frame && frame.data && frame.data.features && shouldShowLayer('cone-layer')) {
					try {
						// Find cone features (Polygon type with cone properties)
						const coneFeatures = frame.data.features.filter((f: any) => f.geometry?.type === 'Polygon' && f.properties?.type === 'cone')

						if (coneFeatures.length > 0) {
							const coneGeoJSON = {
								type: 'FeatureCollection' as const,
								features: coneFeatures,
							}

							baseLayers.push(
								new GeoJsonLayer({
									id: 'cone-layer',
									data: coneGeoJSON as any,
									stroked: true,
									filled: true,
									lineWidthMinPixels: 1,
									lineWidthMaxPixels: 2,
									getFillColor: [100, 150, 255, 50], // Light blue with transparency
									getLineColor: [100, 150, 255, 200],
									opacity: 1,
									pickable: false,
									updateTriggers: {
										getFillColor: [frame.data],
									},
								}),
							)
						}
					} catch (error) {
						// Silently catch cone layer errors
					}
				}

				// Add forecast track layer if present
				if (frame && frame.data && frame.data.features && shouldShowLayer('forecast-track-layer')) {
					try {
						// Find forecast track features (LineString type)
						const forecastTrackFeatures = frame.data.features.filter(
							(f: any) => f.geometry?.type === 'LineString' && f.properties?.type === 'forecast_track',
						)

						if (forecastTrackFeatures.length > 0) {
							const forecastTrackGeoJSON = {
								type: 'FeatureCollection' as const,
								features: forecastTrackFeatures,
							}

							baseLayers.push(
								new GeoJsonLayer({
									id: 'forecast-track-layer',
									data: forecastTrackGeoJSON as any,
									stroked: true,
									filled: false,
									lineWidthMinPixels: 2,
									lineWidthMaxPixels: 4,
									getLineColor: [0, 200, 255, 255], // Cyan for forecast
									opacity: 1,
									pickable: false,
									updateTriggers: {
										getLineColor: [frame.data],
									},
								}),
							)
						}
					} catch (error) {
						// Silently catch forecast track layer errors
					}
				}

				// Add best track (historical path) layer if present
				if (frame && frame.data && frame.data.features && shouldShowLayer('best-track-layer')) {
					try {
						// Find best track features (LineString type with best_track property)
						const bestTrackFeatures = frame.data.features.filter(
							(f: any) => f.geometry?.type === 'LineString' && f.properties?.type === 'best_track',
						)

						if (bestTrackFeatures.length > 0) {
							const bestTrackGeoJSON = {
								type: 'FeatureCollection' as const,
								features: bestTrackFeatures,
							}

							baseLayers.push(
								new GeoJsonLayer({
									id: 'best-track-layer',
									data: bestTrackGeoJSON as any,
									stroked: true,
									filled: false,
									lineWidthMinPixels: 2,
									lineWidthMaxPixels: 4,
									getLineColor: [200, 100, 100, 255], // Red-brown for historical
									opacity: 1,
									pickable: false,
									updateTriggers: {
										getLineColor: [frame.data],
									},
								}),
							)
						}
					} catch (error) {
						// Silently catch best track layer errors
					}
				}

				// Add tropical storms from frame if present
				if (frame && frame.tropicalStorms && frame.tropicalStorms.length > 0) {
					// Add storm track layer (historical paths)
					const trackLayer = createStormTrackLayer(frame.tropicalStorms, loadedFrames)
					baseLayers.push(trackLayer)

					// Add hurricane layer (icons)
					const iconCanvas = getHurricaneIconCanvasSync()
					if (iconCanvas) {
						const hurricaneLayer = createHurricaneLayer(frame.tropicalStorms, iconCanvas)
						baseLayers.push(hurricaneLayer)
					}
				}

				if (onFrameChange) {
					onFrameChange(activeFrame)
				}
			}

			return baseLayers
		}, [
			loadedFrames,
			currentFrame,
			onFrameChange,
			oceanColor,
			worldColor,
			statesColor,
			borderColor,
			countyBorderColor,
			gridlineColor,
			currentFrameAlertMap,
			currentFrameCoastalAlertMap,
			hoveredCountyId,
			hoveredCwaId,
			animatedColors,
			initializedLayerVisibility,
			viewState.zoom,
			selectedWFOId,
			countyToCwaMap,
			cwaZonesData?.features,
		])

		const handleViewStateChange = (viewState: any) => {
			// Call the callback to sync to global state
			// This updates the mapZoomState in the Animator context
			if (_onViewStateChange) {
				_onViewStateChange(viewState.viewState)
			}
		}

		/**
		 * Update tooltip content for a hovered region (county, coastal, or CWA)
		 * Extracts region name and alerts from the current frame
		 */
		const updateTooltipForRegion = useCallback(
			(regionInfo: { id: string; type: 'county' | 'coastal' | 'cwa'; wfoId?: string } | null) => {
				if (!regionInfo || loadedFrames.length === 0) {
					setTooltipVisible(false)
					return
				}

				// Don't show tooltip for CWA zones (we'll handle that separately later)
				if (regionInfo.type === 'cwa') {
					setTooltipVisible(false)
					return
				}

				const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
				const frame = loadedFrames[activeFrame]

				if (!frame) {
					setTooltipVisible(false)
					return
				}

				let feature: any = null

				// Find feature in appropriate data source
				if (regionInfo.type === 'coastal' && frame.coastalData && 'features' in frame.coastalData) {
					feature = (frame.coastalData as any).features.find((f: any) => {
						const fId = f.properties?.id || f.properties?.ID
						return fId === regionInfo.id
					})
				} else if (regionInfo.type === 'county' && frame.data && 'features' in frame.data) {
					feature = (frame.data as any).features.find((f: any) => {
						const fId = f.properties?.id || f.properties?.ID
						return fId === regionInfo.id
					})
				}

				if (!feature) {
					setTooltipVisible(false)
					return
				}

				// Extract region name
				let title = 'Unknown'
				if (regionInfo.type === 'coastal') {
					// For coastal regions, use NAME or ID
					title = feature.properties?.NAME || feature.properties?.name || regionInfo.id
				} else {
					// For counties, use COUNTYNAME and STATE
					const countyName = feature.properties?.COUNTYNAME || feature.properties?.NAME || 'Unknown'
					const state = feature.properties?.STATE || ''
					title = state ? `${countyName} county, ${state}` : countyName
				}

				// Extract alerts
				const alerts = feature.properties?.alerts || []
				const formattedAlerts = alerts.map((alert: any) => {
					// Convert color from HazardData format to RGBA array
					let color: [number, number, number, number] = [128, 128, 128, 255]
					let name = 'Unknown'

					if (alert.color) {
						if (typeof alert.color === 'string') {
							// If it's already a hex string or CSS color
							color = alert.color
						} else if (alert.color.rgb) {
							// Parse RGB string like "255,0,0"
							const [r, g, b] = alert.color.rgb.split(',').map(Number)
							color = [r, g, b, 255]
						} else if (Array.isArray(alert.color)) {
							// Already an array
							color = alert.color
						}
						// Use hazardType and hazardLevel as the name if available
						name = alert.hazardType || alert.locationName || 'Unknown'
					} else if (alert.event) {
						// For historical alerts without color field, get complete hazard info from event
						const hazardInfo = getHazardInfoFromEvent(alert.event)
						color = hazardInfo.rgba
						// Format name as "Type Level" (e.g., "Winter Advisory")
						name = `${hazardInfo.typeName} ${hazardInfo.levelName}`
					}

					return {
						color,
						name,
						event: alert.event || 'Alert',
					}
				})

				setTooltipTitle(title)
				setTooltipAlerts(formattedAlerts)
				setTooltipVisible(formattedAlerts.length > 0)
			},
			[loadedFrames, currentFrame, setTooltipTitle, setTooltipAlerts, setTooltipVisible],
		)

		/**
		 * Update CWA tooltip content for a hovered CWA region
		 * Aggregates all alerts in the region and shows summary by alert type
		 *
		 * Uses the pre-computed countyToCwaMap for fast lookups (no point-in-polygon on hover)
		 *
		 * Note: If the hovered WFO is the selected one (in detail view), don't show the tooltip
		 * to allow county tooltips to show instead
		 */
		const updateCwaTooltip = useCallback(
			(cwaId: string, wfoId: string, mouseX: number, mouseY: number) => {
				if (!cwaZonesData || !cwaZonesData.features) {
					setCwaTooltipVisible(false)
					return
				}

				// Don't show CWA tooltip if this is the selected WFO (in detail view)
				// This allows county tooltips to show instead
				if (selectedWFOId && wfoId === selectedWFOId) {
					setCwaTooltipVisible(false)
					return
				}

				// Find the CWA feature
				const cwaFeature = cwaZonesData.features.find((f: any) => f.properties?.CWA === cwaId)
				if (!cwaFeature) {
					setCwaTooltipVisible(false)
					return
				}

				// Get CWA name from properties
				const cwaName = cwaFeature.properties?.NAME || cwaFeature.properties?.name || cwaId

				// Aggregate alerts from all counties in this CWA region
				const alertCounts: Record<string, { count: number; color: [number, number, number, number] }> = {}

				// Get the current frame to access the full feature collection
				const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
				const frame = loadedFrames[activeFrame]

				if (frame && frame.data && 'features' in frame.data && Array.isArray(frame.data.features)) {
					// Iterate through all county features in the frame
					frame.data.features.forEach((feature: any) => {
						const countyId = feature.properties?.id

						// Use the pre-computed map to check if this county belongs to the CWA
						// This is O(1) lookup instead of expensive point-in-polygon check
						if (countyToCwaMap.get(countyId) === cwaId) {
							// This county is inside the CWA zone, count its alerts
							const alerts = feature.properties?.alerts
							if (alerts && Array.isArray(alerts) && alerts.length > 0) {
								// Iterate through all alerts for this county
								alerts.forEach((alert: any) => {
									const event = alert.event || alert.name || 'Unknown Alert'
									const color = alert.color || feature.properties?.alertColor || [200, 200, 200, 255]

									if (!alertCounts[event]) {
										alertCounts[event] = {
											count: 0,
											color: color,
										}
									}
									alertCounts[event].count++
								})
							}
						}
					})
				}

				// Convert to array format for tooltip
				const alertSummary = Object.entries(alertCounts).map(([event, data]) => ({
					event,
					count: data.count,
					color: data.color,
				}))

				// Sort by count descending
				alertSummary.sort((a, b) => b.count - a.count)

				const tooltipInfo: CwaTooltipInfo = {
					cwaId,
					wfoId,
					name: cwaName,
					alertSummary,
					x: mouseX,
					y: mouseY,
				}

				setCwaTooltipInfo(tooltipInfo)
				setCwaTooltipVisible(true)
			},
			[cwaZonesData, currentFrame, loadedFrames, countyToCwaMap, setCwaTooltipInfo, setCwaTooltipVisible, selectedWFOId],
		)

		/**
		 * Handle mouse move to detect which region (county or coastal) is being hovered
		 * Converts screen coordinates to lat/long using DeckGL's unproject and uses point-in-polygon detection
		 * Throttled using requestAnimationFrame for better performance
		 */
		const mouseMoveThrottleRef = useRef<number | null>(null)
		const lastMouseEventRef = useRef<{ x: number; y: number } | null>(null)

		const processMouseMove = useCallback(
			(x: number, y: number) => {
				if (!containerRef.current || !deckGLRef.current) return

				// Get the container's bounding rect
				const rect = containerRef.current.getBoundingClientRect()

				// Get current frame's coastal data
				const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
				const coastalData = loadedFrames[activeFrame]?.coastalData

				try {
					// Use DeckGL's unproject to accurately convert screen coordinates to lat/long
					const deck = deckGLRef.current
					if (deck && deck.deck && deck.deck.getViewports) {
						const viewports = deck.deck.getViewports()
						if (viewports && viewports.length > 0) {
							const viewport = viewports[0]
							// unproject converts [x, y] screen coordinates to [lon, lat, z]
							const [lon, lat] = viewport.unproject([x, y])

							// Find which region (county, coastal, or CWA) this point is in
							// Pass selectedWFOId to skip the selected WFO zone in detail view
							const regionInfo = findRegionAtPoint(lat, lon, coastalData, cwaZonesData, selectedWFOId)

							// Handle CWA hover separately from county/coastal hover
							if (regionInfo?.type === 'cwa') {
								setHoveredCwaId(regionInfo.id)
								setHoveredCwaWfoId(regionInfo.wfoId || null)
								setHoveredCountyId(null)
								setTooltipVisible(false)
								// Update CWA tooltip with mouse position
								if (containerRef.current) {
									const rect = containerRef.current.getBoundingClientRect()
									updateCwaTooltip(regionInfo.id, regionInfo.wfoId || '', x + rect.left, y + rect.top)
								}
							} else {
								setHoveredCwaId(null)
								setHoveredCwaWfoId(null)
								setCwaTooltipVisible(false)
								setHoveredCountyId(regionInfo?.id || null)
								updateTooltipForRegion(regionInfo)
							}
							return
						}
					}
				} catch (error) {
					// Fallback if unproject fails
					console.debug('DeckGL unproject failed, using fallback', error)
				}

				// Fallback: use approximate conversion if DeckGL unproject is not available
				const metersPerPixel = (40075000 * Math.cos((viewState.latitude * Math.PI) / 180)) / (256 * Math.pow(2, viewState.zoom))
				const pixelsPerDegree = 111320 / metersPerPixel

				const centerLon = viewState.longitude
				const centerLat = viewState.latitude

				const offsetLon = (x / rect.width - 0.5) * (rect.width / pixelsPerDegree)
				const offsetLat = (y / rect.height - 0.5) * (rect.height / pixelsPerDegree) * -1

				const hoverLon = centerLon + offsetLon
				const hoverLat = centerLat + offsetLat

				// Pass selectedWFOId to skip the selected WFO zone in detail view
				const regionInfo = findRegionAtPoint(hoverLat, hoverLon, coastalData, cwaZonesData, selectedWFOId)

				// Handle CWA hover separately from county/coastal hover
				if (regionInfo?.type === 'cwa') {
					setHoveredCwaId(regionInfo.id)
					setHoveredCwaWfoId(regionInfo.wfoId || null)
					setHoveredCountyId(null)
					setTooltipVisible(false)
					// Update CWA tooltip with mouse position (fallback path)
					if (containerRef.current) {
						const rect = containerRef.current.getBoundingClientRect()
						updateCwaTooltip(regionInfo.id, regionInfo.wfoId || '', x + rect.left, y + rect.top)
					}
				} else {
					setHoveredCwaId(null)
					setHoveredCwaWfoId(null)
					setCwaTooltipVisible(false)
					setHoveredCountyId(regionInfo?.id || null)
					updateTooltipForRegion(regionInfo)
				}
			},
			[
				currentFrame,
				loadedFrames,
				cwaZonesData,
				viewState,
				updateTooltipForRegion,
				updateCwaTooltip,
				setHoveredCwaId,
				setHoveredCwaWfoId,
				setHoveredCountyId,
				setTooltipVisible,
				setCwaTooltipVisible,
				selectedWFOId,
			],
		)

		const handleMouseMove = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!containerRef.current) return

				const rect = containerRef.current.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top

				// Store the latest mouse position
				lastMouseEventRef.current = { x, y }

				// Throttle using requestAnimationFrame - only process one event per frame
				if (mouseMoveThrottleRef.current === null) {
					mouseMoveThrottleRef.current = requestAnimationFrame(() => {
						mouseMoveThrottleRef.current = null
						if (lastMouseEventRef.current) {
							processMouseMove(lastMouseEventRef.current.x, lastMouseEventRef.current.y)
						}
					})
				}
			},
			[processMouseMove],
		)

		const handleMouseLeave = () => {
			setHoveredCountyId(null)
			setHoveredCwaId(null)
			setHoveredCwaWfoId(null)
			setTooltipVisible(false)
			setCwaTooltipVisible(false)
		}

		const handleDeckGLClick = (info: any) => {
			// Check if a storm icon was clicked
			if (info && info.object && info.object.id && onStormClick) {
				onStormClick(info.object.id)
				return
			}

			// Check if a CWA zone was clicked
			// Use the same lat/long detection as hover
			if (onCwaClick && info && info.coordinate) {
				const [lon, lat] = info.coordinate
				const regionInfo = findRegionAtPoint(lat, lon, undefined, cwaZonesData)

				if (regionInfo?.type === 'cwa' && regionInfo.wfoId) {
					// Call the callback
					onCwaClick(regionInfo.id, regionInfo.wfoId)

					// Calculate zoom view state to focus on this CWA zone
					if (containerRef.current && _onViewStateChange) {
						const rect = containerRef.current.getBoundingClientRect()
						const newViewState = zoomToCwaZone(cwaZonesData as any, regionInfo.id, rect.width, rect.height, 0.15)

						if (newViewState) {
							// Update the view state to zoom to the CWA region
							_onViewStateChange(newViewState)
						}
					}
				}
			}
		}

		const handleDeckGLHover = (info: any) => {
			// Check if hovering over a storm icon
			if (info && info.object && info.object.id) {
				setStormHoverInfo({
					stormId: info.object.id,
					name: info.object.name,
					classification: info.object.classification,
					category: info.object.category,
					intensity: info.object.intensity,
					pressure: info.object.pressure,
					movementDir: info.object.movementDir,
					movementSpeed: info.object.movementSpeed,
					lastUpdate: info.object.lastUpdate,
					x: info.x,
					y: info.y,
				})
				setShowTooltip(true)
				setIsHoveringStorm(true)
			} else {
				setShowTooltip(false)
				setIsHoveringStorm(false)
			}
		}

		// Attach both the forwarded ref and the local containerRef
		useEffect(() => {
			if (typeof ref === 'function') {
				ref(containerRef.current)
			} else if (ref) {
				ref.current = containerRef.current
			}
		}, [ref])

		return (
			<div
				ref={containerRef}
				className={styles.animatorMapMachine}
				style={{
					zIndex,
					cursor: isHoveringStorm ? 'pointer' : 'grab',
					...containerStyle,
				}}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				{isLoading && <LoadingPanel size={0.35} hideText />}
				<DeckGL
					ref={deckGLRef}
					viewState={{
						...viewState,
						//transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
						//transitionDuration: 'auto',
					}}
					controller={{
						scrollZoom: {
							smooth: true,
						},
						// Keyboard controls
						keyboard: true,
					}}
					layers={layers}
					onViewStateChange={handleViewStateChange}
					onClick={handleDeckGLClick}
					onHover={handleDeckGLHover}
				/>
				<StormTooltip info={stormHoverInfo} visible={showTooltip} containerRef={containerRef} />
				<CwaTooltip info={cwaTooltipInfo} visible={cwaTooltipVisible} containerRef={containerRef} />
				<MapAlertTooltip visible={tooltipVisible} title={tooltipTitle} alerts={tooltipAlerts} />
			</div>
		)
	},
)

AnimatorMapMachine.displayName = 'AnimatorMapMachine'
