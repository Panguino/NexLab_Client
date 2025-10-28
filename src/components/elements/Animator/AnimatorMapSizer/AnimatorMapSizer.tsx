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
const EASING_DURATION = 500 // Duration of easing animation in milliseconds
const ANIMATION_THRESHOLD = 0.005 // Stop animating when distance is smaller than this

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
		mapLayerVisibility,
		setMapLayerVisibility,
		mapDataType,
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
	const animationFrameRef = useRef<number | null>(null)
	const currentViewStateRef = useRef<MapViewState>(mapZoomState)
	const animationStartTimeRef = useRef<number | null>(null)
	const animationStartStateRef = useRef<MapViewState | null>(null)

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

	// Animation loop for smooth easing using requestAnimationFrame
	// When targetViewState is set, smoothly interpolate from current to target
	// Uses delta-based timing for performance-independent animation
	useEffect(() => {
		if (!targetViewState) {
			// No animation in progress
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
				animationFrameRef.current = null
			}
			animationStartTimeRef.current = null
			animationStartStateRef.current = null
			return undefined
		}

		// Initialize animation state on first frame
		if (!animationStartTimeRef.current) {
			animationStartTimeRef.current = performance.now()
			animationStartStateRef.current = { ...currentViewStateRef.current }
		}

		// Animation frame callback using delta-based timing
		const animate = (currentTime: number) => {
			const startTime = animationStartTimeRef.current!
			const startState = animationStartStateRef.current!
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / EASING_DURATION, 1)

			// Easing function: ease-out cubic for smooth deceleration
			const easeProgress = 1 - Math.pow(1 - progress, 3)

			// Calculate distance to target for each dimension
			const zoomDistance = Math.abs(targetViewState.zoom - startState.zoom)
			const latDistance = Math.abs(targetViewState.latitude - startState.latitude)
			const lonDistance = Math.abs(targetViewState.longitude - startState.longitude)

			// Check if we're close enough to stop animating
			if (zoomDistance < ANIMATION_THRESHOLD && latDistance < ANIMATION_THRESHOLD && lonDistance < ANIMATION_THRESHOLD) {
				// Snap to target and stop animation
				setMapZoomState(targetViewState)
				setTargetViewState(null)
				animationStartTimeRef.current = null
				animationStartStateRef.current = null
				return
			}

			// Interpolate using eased progress
			const newZoom = startState.zoom + (targetViewState.zoom - startState.zoom) * easeProgress
			const newLat = startState.latitude + (targetViewState.latitude - startState.latitude) * easeProgress
			const newLon = startState.longitude + (targetViewState.longitude - startState.longitude) * easeProgress

			setMapZoomState({
				zoom: newZoom,
				latitude: newLat,
				longitude: newLon,
			})

			// If animation is complete, stop
			if (progress < 1) {
				animationFrameRef.current = requestAnimationFrame(animate)
			} else {
				// Final snap to target
				setMapZoomState(targetViewState)
				setTargetViewState(null)
				animationStartTimeRef.current = null
				animationStartStateRef.current = null
			}
		}

		// Start the animation
		animationFrameRef.current = requestAnimationFrame(animate)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
				animationFrameRef.current = null
			}
		}
	}, [targetViewState, setMapZoomState])

	// MOUSE INTERACTIONS: DeckGL handles these internally
	// Direct updates - no easing for mouse/touch events
	const handleViewStateChange = useCallback(
		(newViewState: MapViewState) => {
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
					layerVisibility={mapLayerVisibility}
					mapDataType={mapDataType}
				/>
			</div>

			{!hideZoomControls && !disableZoom && (
				<ViewControls
					mode="map"
					zoomIn={handleZoomIn}
					zoomOut={handleZoomOut}
					resetTransform={handleResetView}
					mapZoom={mapZoomState.zoom}
					mapLayerVisibility={mapLayerVisibility}
					setMapLayerVisibility={setMapLayerVisibility}
					mapDataType={mapDataType}
				/>
			)}
		</div>
	)
}

export default AnimatorMapSizer
