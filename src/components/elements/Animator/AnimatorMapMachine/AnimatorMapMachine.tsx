'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import countiesData from '@/data/d3Map/counties.json'
import lakesData from '@/data/d3Map/lakes.json'
import statesData from '@/data/d3Map/states.json'
import worldData from '@/data/d3Map/world.json'
import { GeoJsonLayer } from '@deck.gl/layers'
import DeckGL from 'deck.gl'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import styles from './AnimatorMapMachine.module.scss'
import { StormTooltip } from './components/StormTooltip'
import { createHurricaneLayer } from './layers/HurricaneLayer'
import { createStormTrackLayer } from './layers/StormTrackLayer'
import { IAnimatorMapMachineProps, MapFrame } from './types'

// Import booleanPointInPolygon for point-in-polygon detection
let booleanPointInPolygon: any = null
try {
	const turf = require('@turf/turf')
	booleanPointInPolygon = turf.booleanPointInPolygon
} catch (e) {
	console.warn('Failed to load @turf/turf')
}

/**
 * Find which county a given lat/long point is in
 * Uses point-in-polygon detection with Turf.js
 */
function findCountyAtPoint(latitude: number, longitude: number): string | null {
	if (!booleanPointInPolygon) return null

	const point = [longitude, latitude]

	// Search through counties data
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
				return countyId || null
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
			zoomStepScroll = 0.2,
		},
		ref,
	) => {
		const [isLoading, setIsLoading] = useState(true)
		const [localLoadedFrames, setLocalLoadedFrames] = useState<MapFrame[]>([])
		const [isDarkMode, setIsDarkMode] = useState(false)
		const [stormHoverInfo, setStormHoverInfo] = useState<any>(null)
		const [showTooltip, setShowTooltip] = useState(false)
		const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null)
		const deckGLRef = useRef<any>(null)

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

		// Debug logging - only for interactions
		const DEBUG_INTERACTIONS = true
		const logInteraction = (message: string, data?: any) => {
			if (DEBUG_INTERACTIONS) {
				console.log(`[AnimatorMapMachine] ${message}`, data || '')
			}
		}

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
		const { oceanColor, worldColor, statesColor, borderColor, countyBorderColor } = useMemo(() => {
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
			return { oceanColor, worldColor, statesColor, borderColor, countyBorderColor }
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
					console.log(`Loaded ${validFrames.length} map frames`)
				} catch (error) {
					console.error('Failed to load frames:', error)
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

		// Create layers with base map and current frame data
		const layers = useMemo(() => {
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
				new GeoJsonLayer({
					id: 'world-layer',
					data: worldData as any,
					filled: true,
					stroked: false,
					getFillColor: () => worldColor as any,
					opacity: 0.3, // Faded/subtle - reduced to prevent covering states
					pickable: false,
					updateTriggers: {
						getFillColor: [worldColor],
					},
				}),
				// US States layer - using theme color white-grey13
				// Light mode: #fff (255, 255, 255), Dark mode: #5f5f5f (95, 95, 95)
				new GeoJsonLayer({
					id: 'states-layer',
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
				// Great Lakes layer - using ocean color to match water
				// Light mode: #8aadcf (138, 173, 207), Dark mode: #233544 (35, 53, 68)
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
				// US County layer with alert colors
				// Using countiesData as base, colors are mapped from frame data via county ID
				// Light mode: #6b6b6b (107, 107, 107), Dark mode: #7a7a7a (122, 122, 122)
				new GeoJsonLayer({
					id: 'counties-layer',
					data: countiesData as any,
					filled: true,
					stroked: true,
					lineWidthMinPixels: 0.5,
					lineWidthMaxPixels: 1,
					getLineColor: () => countyBorderColor as any,
					getLineWidth: () => 2,
					getFillColor: (d: any) => {
						// Get county ID from feature properties
						let countyId = d.properties?.id || d.properties?.ID
						if (!countyId && d.properties?.FIPS) {
							const fipsMatch = d.properties.FIPS.match(/(\d{5})/)
							countyId = fipsMatch ? fipsMatch[1] : null
						}

						// Highlight hovered county in white
						if (hoveredCountyId && countyId === hoveredCountyId) {
							return [255, 255, 255, 255] // White for hovered county
						}

						// Look up alert color from frame data
						if (currentFrameAlertMap && countyId && currentFrameAlertMap[countyId]) {
							return currentFrameAlertMap[countyId].color
						}

						// Default grey for counties without alerts
						return [200, 200, 200, 100]
					},
					opacity: 1,
					pickable: false, // Disabled for performance - using manual hover detection
					autoHighlight: false, // Disabled for performance - using manual hover detection
					updateTriggers: {
						getLineColor: [countyBorderColor],
						getFillColor: [currentFrameAlertMap, hoveredCountyId], // Update colors when alert map or hovered county changes
					},
				}),
				// US States borders layer - separate layer for strokes
				// Using theme color grey18-grey15: Light mode: #232323 (35, 35, 35), Dark mode: #505050 (80, 80, 80)
				new GeoJsonLayer({
					id: 'states-borders-layer',
					data: statesData as any,
					filled: false,
					stroked: true,
					lineWidthMinPixels: 2,
					lineWidthMaxPixels: 3,
					getLineColor: () => borderColor as any,
					getLineWidth: () => 2,
					opacity: 1,
					pickable: false,
					updateTriggers: {
						getLineColor: [borderColor],
					},
				}),
			]

			// Add overlays and tropical storms from current frame if available
			if (loadedFrames.length > 0) {
				const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
				const frame = loadedFrames[activeFrame]

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

				// Add tropical storms from frame if present
				if (frame && frame.tropicalStorms && frame.tropicalStorms.length > 0) {
					// Add storm track layer (historical paths)
					const trackLayer = createStormTrackLayer(frame.tropicalStorms, loadedFrames)
					baseLayers.push(trackLayer)

					const handleStormHover = (info: any) => {
						if (info.object) {
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
						} else {
							setShowTooltip(false)
						}
					}
					const hurricaneLayer = createHurricaneLayer(frame.tropicalStorms, handleStormHover)
					baseLayers.push(hurricaneLayer)
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
			currentFrameAlertMap,
			hoveredCountyId,
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

			logInteraction(
				`🖱️ DeckGL event - zoom: ${constrainedViewState.zoom.toFixed(2)} lat: ${constrainedViewState.latitude.toFixed(2)} lon: ${constrainedViewState.longitude.toFixed(2)}`,
			)

			// Call the callback to sync to global state
			// This updates the mapZoomState in the Animator context
			if (_onViewStateChange) {
				_onViewStateChange(constrainedViewState)
			}
		}

		/**
		 * Handle mouse move to detect which county is being hovered
		 * Converts screen coordinates to lat/long using DeckGL's unproject and uses point-in-polygon detection
		 */
		const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!ref.current || !deckGLRef.current) return

			// Get the container's bounding rect
			const rect = ref.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			try {
				// Use DeckGL's unproject to accurately convert screen coordinates to lat/long
				const deck = deckGLRef.current
				if (deck && deck.deck && deck.deck.getViewports) {
					const viewports = deck.deck.getViewports()
					if (viewports && viewports.length > 0) {
						const viewport = viewports[0]
						// unproject converts [x, y] screen coordinates to [lon, lat, z]
						const [lon, lat] = viewport.unproject([x, y])

						// Find which county this point is in
						const countyId = findCountyAtPoint(lat, lon)
						setHoveredCountyId(countyId)
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

			const countyId = findCountyAtPoint(hoverLat, hoverLon)
			setHoveredCountyId(countyId)
		}

		const handleMouseLeave = () => {
			setHoveredCountyId(null)
		}

		return (
			<div
				ref={ref}
				className={styles.animatorMapMachine}
				style={{
					zIndex,
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
				/>
				<StormTooltip info={stormHoverInfo} visible={showTooltip} />
			</div>
		)
	},
)

AnimatorMapMachine.displayName = 'AnimatorMapMachine'
