'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import countiesData from '@/data/d3Map/counties.json'
import countriesData from '@/data/d3Map/countries.json'
import lakesData from '@/data/d3Map/lakes.json'
import statesData from '@/data/d3Map/states.json'
import worldData from '@/data/d3Map/world.json'
import { getHazardInfoFromEvent } from '@/util/dataCalls/alerts/parseCountyAlerts'
import { GeoJsonLayer } from '@deck.gl/layers'
import DeckGL from 'deck.gl'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import styles from './AnimatorMapMachine.module.scss'
import MapAlertTooltip from './components/MapAlertTooltip'
import { StormTooltip } from './components/StormTooltip'
import { getDefaultLayerVisibility } from './config/mapLayers'
import { useMultiAlertAnimation } from './hooks/useMultiAlertAnimation'
import { createHurricaneLayer } from './layers/HurricaneLayer'
import { createStormTrackLayer } from './layers/StormTrackLayer'
import { IAnimatorMapMachineProps, MapFrame } from './types'
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
 * Find which county or coastal region a given lat/long point is in
 * Uses point-in-polygon detection with Turf.js
 * Returns object with id and type ('county' or 'coastal')
 */
function findRegionAtPoint(latitude: number, longitude: number, coastalData?: any): { id: string; type: 'county' | 'coastal' } | null {
	if (!booleanPointInPolygon) return null

	const point = [longitude, latitude]

	// First search through coastal data if available
	if (coastalData && coastalData.features) {
		const coastalFeatures = coastalData.features || []
		for (const feature of coastalFeatures) {
			try {
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

	// Then search through counties data
	const features = (countiesData as any).features || []
	for (const feature of features) {
		try {
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
 * Generate dashed lat-long grid lines
 * Creates a grid of latitude and longitude lines at regular intervals
 * Uses short line segments to simulate dashes
 */
function generateGridLines(spacing: number = 0.5, dashLength: number = 0.25, gapLength: number = 0.25): any {
	const features: any[] = []

	// Latitude lines (horizontal)
	for (let lat = -90; lat <= 90; lat += spacing) {
		// Create dashed line by generating segments
		for (let lon = -180; lon < 180; lon += dashLength + gapLength) {
			features.push({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[lon, lat],
						[Math.min(lon + dashLength, 180), lat],
					],
				},
				properties: { type: 'latitude', value: lat },
			})
		}
	}

	// Longitude lines (vertical)
	for (let lon = -180; lon <= 180; lon += spacing) {
		// Create dashed line by generating segments
		for (let lat = -90; lat < 90; lat += dashLength + gapLength) {
			features.push({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[lon, lat],
						[lon, Math.min(lat + dashLength, 90)],
					],
				},
				properties: { type: 'longitude', value: lon },
			})
		}
	}

	return {
		type: 'FeatureCollection',
		features,
	}
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
		},
		ref,
	) => {
		const [isLoading, setIsLoading] = useState(true)
		const [localLoadedFrames, setLocalLoadedFrames] = useState<MapFrame[]>([])
		const [isDarkMode, setIsDarkMode] = useState(false)
		const [stormHoverInfo, setStormHoverInfo] = useState<any>(null)
		const [showTooltip, setShowTooltip] = useState(false)
		const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null)
		const [tooltipVisible, setTooltipVisible] = useState(false)
		const [tooltipTitle, setTooltipTitle] = useState('')
		const [tooltipAlerts, setTooltipAlerts] = useState<any[]>([])
		const [isHoveringStorm, setIsHoveringStorm] = useState(false)
		const deckGLRef = useRef<any>(null)
		const containerRef = useRef<HTMLDivElement>(null)

		// Initialize layer visibility with defaults if not provided
		const initializedLayerVisibility = useMemo(() => {
			const hasValues = Object.keys(layerVisibility).length > 0
			return hasValues ? layerVisibility : getDefaultLayerVisibility()
		}, [layerVisibility])

		// CONTROLLED COMPONENT: Use the global mapZoomState from parent
		// All state changes (buttons, mouse interactions) update the global state
		// DeckGL always receives the current viewState from the global state
		const viewState = externalViewState ?? {
			longitude: -95,
			latitude: 37,
			zoom: 3,
		}

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
				// Ocean background layer - using theme color blue1-blue2
				// Light mode: #8aadcf (138, 173, 207), Dark mode: #233544 (35, 53, 68)
				new GeoJsonLayer({
					id: 'ocean-background',
					data: {
						type: 'FeatureCollection' as const,
						features: [
							{
								type: 'Feature' as const,
								geometry: {
									type: 'Polygon' as const,
									coordinates: [
										[
											[-180, -90],
											[180, -90],
											[180, 90],
											[-180, 90],
											[-180, -90],
										],
									],
								},
								properties: {},
							},
						],
					} as any,
					filled: true,
					stroked: false,
					getFillColor: () => oceanColor as any,
					opacity: 1,
					updateTriggers: {
						getFillColor: [oceanColor],
					},
				}),
				// World layer - faded background for all countries
				// Using theme color grey2-grey16: Light mode: #d8d8d8 (216, 216, 216), Dark mode: #484848 (72, 72, 72)
				...(shouldShowLayer('world-layer')
					? [
							new GeoJsonLayer({
								id: 'world-layer',
								data: worldData as any,
								filled: true,
								stroked: true,
								lineWidthMinPixels: 0.5,
								lineWidthMaxPixels: 1,
								getLineColor: () => [0, 0, 0, 255], // Black borders
								getLineWidth: () => 0.5, // 50% size
								getFillColor: () => worldColor as any,
								opacity: 0.3, // Faded/subtle - reduced to prevent covering states
								pickable: false,
								updateTriggers: {
									getFillColor: [worldColor],
								},
							}),
						]
					: []),
				// Lat-long grid lines with dashed appearance
				// More visible for geographic reference
				...(shouldShowLayer('latlon-grid-layer')
					? [
							new GeoJsonLayer({
								id: 'latlon-grid-layer',
								data: generateGridLines(10) as any,
								filled: false,
								stroked: true,
								lineWidthMinPixels: 1,
								lineWidthMaxPixels: 2,
								getLineColor: () => gridlineColor as any,
								getLineWidth: () => 1.5,
								opacity: 0.2,
								pickable: false,
								updateTriggers: {
									getLineColor: [gridlineColor],
								},
							}),
						]
					: []),
				// State fills layer - fills only
				// Light mode: white (#ffffff), Dark mode: grey13 (#5f5f5f)
				...(shouldShowLayer('states-fill-layer')
					? [
							new GeoJsonLayer({
								id: 'states-fill-layer',
								data: statesData as any,
								filled: true,
								stroked: false,
								getFillColor: () => statesColor as any,
								opacity: 1,
								pickable: false,
								updateTriggers: {
									getFillColor: [statesColor],
								},
							}),
						]
					: []),
				// Great Lakes layer - using ocean color to match water
				// Light mode: #8aadcf (138, 173, 207), Dark mode: #233544 (35, 53, 68)
				...(shouldShowLayer('lakes-layer')
					? [
							new GeoJsonLayer({
								id: 'lakes-layer',
								data: lakesData as any,
								filled: true,
								stroked: false,
								getFillColor: () => oceanColor as any,
								opacity: 1,
								pickable: false,
								updateTriggers: {
									getFillColor: [oceanColor],
								},
							}),
						]
					: []),

				// Counties layer - single layer with conditional styling
				// Toggles:
				// - 'counties-inactive-layer': Controls border opacity for counties without alerts (0 opacity when off, except for hovered)
				// - 'county-data-regions-layer': Controls whether to show alert colors and hover interactivity (when off, all fills use default color)
				...(loadedFrames.length > 0 &&
				loadedFrames[currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame]?.data
					? [
							new GeoJsonLayer({
								id: 'counties-layer',
								data: loadedFrames[
									currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
								]?.data as any,
								filled: true,
								stroked: true,
								lineWidthMinPixels: 0.5,
								lineWidthMaxPixels: 1,
								getLineColor: (d: any) => {
									const regionId = d.properties?.id || d.properties?.ID
									const showCountyData = shouldShowLayer('county-data-regions-layer')
									const showInactiveCounties = shouldShowLayer('counties-inactive-layer')
									const alertInfo = currentFrameAlertMap && regionId && currentFrameAlertMap[regionId]
									const hasAlert = alertInfo?.hasAlert

									// For counties without alerts, respect the inactive toggle
									if (!showInactiveCounties) {
										if (hasAlert && showCountyData) {
											return countyBorderColor as any
										}
										return [0, 0, 0, 0]
									}

									// Always show white outline for hovered region
									if (showCountyData && hoveredCountyId && regionId === hoveredCountyId) {
										return [255, 255, 255, 255]
									}

									// If county has alert, always show border
									if (hasAlert) {
										return countyBorderColor as any
									}

									// Show border for inactive counties when toggle is on
									return countyBorderColor as any
								},
								getFillColor: (d: any) => {
									const regionId = d.properties?.id || d.properties?.ID
									const showCountyData = shouldShowLayer('county-data-regions-layer')
									const alertInfo = currentFrameAlertMap && regionId && currentFrameAlertMap[regionId]
									const hasAlert = alertInfo?.hasAlert

									// If county data is disabled, use default color for all counties
									if (!showCountyData) {
										return [200, 200, 200, 0]
									}

									// If county has alert and county data is enabled, show alert color
									if (animatedColors && regionId && animatedColors[regionId]) {
										return animatedColors[regionId]
									}
									if (hasAlert && alertInfo) {
										return alertInfo.color
									}

									// No alert - show default fill
									return [200, 200, 200, 0]
								},
								opacity: 1,
								pickable: false,
								updateTriggers: {
									getLineColor: [
										countyBorderColor,
										hoveredCountyId,
										layerVisibility['counties-inactive-layer'],
										layerVisibility['county-data-regions-layer'],
										currentFrameAlertMap,
									],
									getFillColor: [layerVisibility['county-data-regions-layer'], currentFrameAlertMap, animatedColors],
								},
							}),
						]
					: []),
				// Coastal regions layer - single layer with conditional styling
				// Toggles:
				// - 'coastal-regions-inactive-layer': Controls border opacity for regions without alerts (0 opacity when off, except for hovered)
				// - 'coastal-data-regions-layer': Controls whether to show alert colors and hover interactivity (when off, all fills are ocean color)
				...(loadedFrames.length > 0 &&
				loadedFrames[currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame]?.coastalData
					? [
							new GeoJsonLayer({
								id: 'coastal-regions-layer',
								data: loadedFrames[
									currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
								]?.coastalData as any,
								filled: true,
								stroked: true,
								lineWidthMinPixels: 0.5,
								lineWidthMaxPixels: 1,
								getLineColor: (d: any) => {
									const regionId = d.properties?.id || d.properties?.ID
									const showCoastalData = shouldShowLayer('coastal-data-regions-layer')
									const showInactiveRegions = shouldShowLayer('coastal-regions-inactive-layer')
									const alertInfo = currentFrameCoastalAlertMap && regionId && currentFrameCoastalAlertMap[regionId]
									const hasAlert = alertInfo?.hasAlert

									// Always show white outline for hovered region
									if (showCoastalData && hoveredCountyId && regionId === hoveredCountyId) {
										return [255, 255, 255, 255]
									}

									// For regions without alerts, respect the inactive toggle
									if (!showInactiveRegions) {
										if (hasAlert && showCoastalData) {
											return countyBorderColor as any
										}
										return [0, 0, 0, 0]
									}

									// If region has alert, always show border
									if (hasAlert) {
										return countyBorderColor as any
									}

									// Show border for inactive regions when toggle is on
									return countyBorderColor as any
								},
								getFillColor: (d: any) => {
									const regionId = d.properties?.id || d.properties?.ID
									const showCoastalData = shouldShowLayer('coastal-data-regions-layer')
									const alertInfo = currentFrameCoastalAlertMap && regionId && currentFrameCoastalAlertMap[regionId]
									const hasAlert = alertInfo?.hasAlert

									// If coastal data is disabled, use ocean color for all regions
									if (!showCoastalData) {
										return oceanColor as any
									}

									// If region has alert and coastal data is enabled, show alert color
									if (hasAlert && alertInfo) {
										return alertInfo.color
									}

									// No alert - show light fill
									return oceanColor as any
								},
								opacity: 1,
								pickable: false,
								updateTriggers: {
									getLineColor: [
										countyBorderColor,
										hoveredCountyId,
										layerVisibility['coastal-regions-inactive-layer'],
										layerVisibility['coastal-data-regions-layer'],
										currentFrameCoastalAlertMap,
									],
									getFillColor: [oceanColor, layerVisibility['coastal-data-regions-layer'], currentFrameCoastalAlertMap],
								},
							}),
						]
					: []),
				// US States borders layer - strokes only
				// Light mode: grey18 (#232323), Dark mode: grey15 (#505050)
				...(shouldShowLayer('states-layer')
					? [
							new GeoJsonLayer({
								id: 'states-layer',
								data: statesData as any,
								filled: false,
								stroked: true,
								lineWidthMinPixels: 0.5,
								lineWidthMaxPixels: 1,
								getLineColor: () => borderColor as any,
								opacity: 1,
								pickable: false,
								updateTriggers: {
									getLineColor: [borderColor],
								},
							}),
						]
					: []),
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
			animatedColors,
			initializedLayerVisibility,
		])

		// Map bounds constraints (CONUS - Continental US)
		// Allows panning but prevents zooming out past these bounds
		const mapBounds = {
			minZoom: 2, // Minimum zoom level
			maxZoom: 20, // Maximum zoom level
			// Bounds: [minLon, minLat, maxLon, maxLat]
			// Extended slightly beyond CONUS to allow panning
			minLongitude: -130,
			maxLongitude: -65,
			minLatitude: 24,
			maxLatitude: 50,
		}

		const constrainViewState = (vs: any) => {
			// Constrain zoom level
			const constrainedZoom = Math.max(mapBounds.minZoom, Math.min(mapBounds.maxZoom, vs.zoom))

			// Constrain pan (longitude and latitude)
			const constrainedLongitude = Math.max(mapBounds.minLongitude, Math.min(mapBounds.maxLongitude, vs.longitude))
			const constrainedLatitude = Math.max(mapBounds.minLatitude, Math.min(mapBounds.maxLatitude, vs.latitude))

			return {
				...vs,
				zoom: constrainedZoom,
				longitude: constrainedLongitude,
				latitude: constrainedLatitude,
			}
		}

		const handleViewStateChange = (viewState: any) => {
			const constrainedViewState = constrainViewState(viewState.viewState)

			// Call the callback to sync to global state
			// This updates the mapZoomState in the Animator context
			if (_onViewStateChange) {
				_onViewStateChange(constrainedViewState)
			}
		}

		/**
		 * Update tooltip content for a hovered region (county or coastal)
		 * Extracts region name and alerts from the current frame
		 */
		const updateTooltipForRegion = (regionInfo: { id: string; type: 'county' | 'coastal' } | null) => {
			if (!regionInfo || loadedFrames.length === 0) {
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
		}

		/**
		 * Handle mouse move to detect which region (county or coastal) is being hovered
		 * Converts screen coordinates to lat/long using DeckGL's unproject and uses point-in-polygon detection
		 */
		const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!containerRef.current || !deckGLRef.current) return

			// Get the container's bounding rect
			const rect = containerRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

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

						// Find which region (county or coastal) this point is in
						const regionInfo = findRegionAtPoint(lat, lon, coastalData)
						setHoveredCountyId(regionInfo?.id || null)
						updateTooltipForRegion(regionInfo)
						return
					}
				}
			} catch (error) {
				// Fallback if unproject fails
				console.debug('DeckGL unproject failed, using fallback', error)
			}

			// Fallback: use approximate conversion if DeckGL unproject is not available
			const vs = constrainViewState(viewState)
			const metersPerPixel = (40075000 * Math.cos((vs.latitude * Math.PI) / 180)) / (256 * Math.pow(2, vs.zoom))
			const pixelsPerDegree = 111320 / metersPerPixel

			const centerLon = vs.longitude
			const centerLat = vs.latitude

			const offsetLon = (x / rect.width - 0.5) * (rect.width / pixelsPerDegree)
			const offsetLat = (y / rect.height - 0.5) * (rect.height / pixelsPerDegree) * -1

			const hoverLon = centerLon + offsetLon
			const hoverLat = centerLat + offsetLat

			const regionInfo = findRegionAtPoint(hoverLat, hoverLon, coastalData)
			setHoveredCountyId(regionInfo?.id || null)
			updateTooltipForRegion(regionInfo)
		}

		const handleMouseLeave = () => {
			setHoveredCountyId(null)
			setTooltipVisible(false)
		}

		const handleDeckGLClick = (info: any) => {
			// Check if a storm icon was clicked
			if (info && info.object && info.object.id && onStormClick) {
				onStormClick(info.object.id)
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
						...constrainViewState(viewState),
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
				<StormTooltip info={stormHoverInfo} visible={showTooltip} />
				<MapAlertTooltip visible={tooltipVisible} title={tooltipTitle} alerts={tooltipAlerts} />
			</div>
		)
	},
)

AnimatorMapMachine.displayName = 'AnimatorMapMachine'
