'use client'

import useDimensions from '@/hooks/useDimensions'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimator } from '../Animator'
import { AnimatorMapMachine } from '../AnimatorMapMachine/AnimatorMapMachine'
import { MapViewState } from '../AnimatorMapMachine/types'
import ViewControls from '../ViewControls/ViewControls'
import styles from './AnimatorMapSizer.module.scss'

/**
 * AnimatorMapSizer Component
 *
 * Wrapper component for AnimatorMapMachine that handles:
 * - Sizing and responsive layout
 * - Zoom and pan controls
 * - View state management with smooth easing
 *
 * Similar to AnimatorImageSizer but for map data
 */
const DEBUG_INTERACTIONS = true

// Zoom step sizes - adjust these to control zoom speed
const ZOOM_STEP_BUTTON = 0.3 // Step size for zoom in/out buttons (smaller = slower)
const ZOOM_STEP_SCROLL = 0.001 // Step size for mouse wheel scroll (smaller = slower)

// Easing configuration - adjust these to control animation smoothness
const EASING_FACTOR = 0.2 // How much of the distance to cover per frame (0.8 = slower, 0.95 = faster)
const ANIMATION_THRESHOLD = 0.005 // Stop animating when distance is smaller than this
const ANIMATION_FRAME_RATE = 16 // ms between animation updates (~60fps)

const AnimatorMapSizer = () => {
	const {
		frames,
		currentFrame,
		loadedFrames,
		setLoadedFrames,
		zoomFill,
		fullScreen,
		disableZoom,
		hideZoomControls,
		mapRegion,
		mapZoomState,
		setMapZoomState,
	} = useAnimator()

	// Debug logging - only for mouse/click interactions
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const logInteraction = useCallback((message: string, data?: any) => {
		if (DEBUG_INTERACTIONS) {
			console.log(`[AnimatorMapSizer] ${message}`, data || '')
		}
	}, [])

	const mapMachineRef = useRef<HTMLDivElement>(null)

	// Animation state for smooth easing
	const [targetViewState, setTargetViewState] = useState<MapViewState | null>(null)
	const animationFrameRef = useRef<NodeJS.Timeout | null>(null)
	const currentViewStateRef = useRef<MapViewState>(mapZoomState)

	// Keep ref in sync with current state
	useEffect(() => {
		currentViewStateRef.current = mapZoomState
	}, [mapZoomState])

	// For maps, we don't use aspect ratio constraints like images
	// Maps should fill the container naturally
	// contain=true when zoomFill=false (constrain to container)
	// contain=false when zoomFill=true (allow to fill/bleed)
	const [mapRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(
		undefined, // No aspect ratio constraint for maps
		!zoomFill, // contain: true when zoomFill=false, false when zoomFill=true
	)

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			updateDimensions()
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [updateDimensions])

	// Update dimensions when loaded frames change
	useEffect(() => {
		updateDimensions()
	}, [updateDimensions, loadedFrames])

	// Animation loop for smooth easing
	// When targetViewState is set, smoothly interpolate from current to target
	useEffect(() => {
		if (!targetViewState) {
			// No animation in progress
			if (animationFrameRef.current) {
				clearInterval(animationFrameRef.current)
				animationFrameRef.current = null
			}
			return undefined
		}

		// Start animation loop
		animationFrameRef.current = setInterval(() => {
			// Get current state from ref (avoids dependency issues)
			const current = currentViewStateRef.current

			// Calculate distance to target for each dimension
			const zoomDistance = Math.abs(targetViewState.zoom - current.zoom)
			const latDistance = Math.abs(targetViewState.latitude - current.latitude)
			const lonDistance = Math.abs(targetViewState.longitude - current.longitude)

			// Check if we're close enough to stop animating
			if (zoomDistance < ANIMATION_THRESHOLD && latDistance < ANIMATION_THRESHOLD && lonDistance < ANIMATION_THRESHOLD) {
				// Snap to target and stop animation
				setMapZoomState(targetViewState)
				setTargetViewState(null)
				return
			}

			// Interpolate: move 90% of the remaining distance
			const newZoom = current.zoom + (targetViewState.zoom - current.zoom) * EASING_FACTOR
			const newLat = current.latitude + (targetViewState.latitude - current.latitude) * EASING_FACTOR
			const newLon = current.longitude + (targetViewState.longitude - current.longitude) * EASING_FACTOR

			setMapZoomState({
				zoom: newZoom,
				latitude: newLat,
				longitude: newLon,
			})
		}, ANIMATION_FRAME_RATE)

		return () => {
			if (animationFrameRef.current) {
				clearInterval(animationFrameRef.current)
				animationFrameRef.current = null
			}
		}
	}, [targetViewState, setMapZoomState])

	// MOUSE INTERACTIONS: DeckGL handles these internally
	// Direct updates - no easing for mouse/touch events
	const handleViewStateChange = useCallback(
		(newViewState: MapViewState) => {
			logInteraction(
				`🖱️ Mouse interaction - zoom: ${newViewState.zoom.toFixed(2)} lat: ${newViewState.latitude.toFixed(2)} lon: ${newViewState.longitude.toFixed(2)}`,
			)

			// Update directly (no animation) for all mouse/touch interactions
			setMapZoomState({
				zoom: newViewState.zoom,
				longitude: newViewState.longitude,
				latitude: newViewState.latitude,
			})
		},
		[setMapZoomState, logInteraction],
	)

	// BUTTON INTERACTIONS: Animate to target state
	// Handle zoom in
	const handleZoomIn = useCallback(() => {
		logInteraction('🔘 Button click - Zoom In')
		const newZoom = Math.min(mapZoomState.zoom + ZOOM_STEP_BUTTON, 20)
		setTargetViewState({
			zoom: newZoom,
			longitude: mapZoomState.longitude,
			latitude: mapZoomState.latitude,
		})
	}, [mapZoomState, logInteraction])

	// Handle zoom out
	const handleZoomOut = useCallback(() => {
		logInteraction('🔘 Button click - Zoom Out')
		const newZoom = Math.max(mapZoomState.zoom - ZOOM_STEP_BUTTON, 2)
		setTargetViewState({
			zoom: newZoom,
			longitude: mapZoomState.longitude,
			latitude: mapZoomState.latitude,
		})
	}, [mapZoomState, logInteraction])

	// Handle reset view
	const handleResetView = useCallback(() => {
		logInteraction('🔘 Button click - Reset View')
		setTargetViewState({
			longitude: -95,
			latitude: 37,
			zoom: 3,
		})
	}, [logInteraction])

	return (
		<div className={`${styles.animatorMapSizer} ${fullScreen ? styles.fullScreen : ''}`} ref={mapRef}>
			<div className={styles.mapContainer} style={{ width: _width, height: _height }}>
				<AnimatorMapMachine
					ref={mapMachineRef}
					frames={frames || []}
					currentFrame={currentFrame}
					loadedFrames={loadedFrames}
					setLoadedFrames={setLoadedFrames}
					region={mapRegion}
					mapProvider="deckgl"
					onViewStateChange={handleViewStateChange}
					containerStyle={{
						width: adjustedWidth,
						height: adjustedHeight,
					}}
					_onViewStateChange={handleViewStateChange}
					viewState={mapZoomState}
					zoomStepScroll={ZOOM_STEP_SCROLL}
				/>
			</div>

			{!hideZoomControls && !disableZoom && (
				<ViewControls mode="map" zoomIn={handleZoomIn} zoomOut={handleZoomOut} resetTransform={handleResetView} mapZoom={mapZoomState.zoom} />
			)}
		</div>
	)
}

export default AnimatorMapSizer
