'use client'

import useDimensions from '@/hooks/useDimensions'
import { useCallback, useEffect, useRef } from 'react'
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
 * - View state management
 *
 * Similar to AnimatorImageSizer but for map data
 */
const DEBUG_INTERACTIONS = true

// Zoom step sizes - adjust these to control zoom speed
const ZOOM_STEP_BUTTON = 0.5 // Step size for zoom in/out buttons (smaller = slower)
const ZOOM_STEP_SCROLL = 0.2 // Step size for mouse wheel scroll (smaller = slower)

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

	// MOUSE INTERACTIONS: DeckGL handles these internally
	// We only sync to global state for tracking
	const handleViewStateChange = useCallback(
		(newViewState: MapViewState) => {
			logInteraction(
				`🖱️ Mouse interaction - zoom: ${newViewState.zoom.toFixed(2)} lat: ${newViewState.latitude.toFixed(2)} lon: ${newViewState.longitude.toFixed(2)}`,
			)
			// Sync to global state for tracking/persistence
			setMapZoomState({
				zoom: newViewState.zoom,
				longitude: newViewState.longitude,
				latitude: newViewState.latitude,
			})
		},
		[setMapZoomState, logInteraction],
	)

	// BUTTON INTERACTIONS: Directly update global state
	// Handle zoom in
	const handleZoomIn = useCallback(() => {
		logInteraction('🔘 Button click - Zoom In')
		const newZoom = Math.min(mapZoomState.zoom + ZOOM_STEP_BUTTON, 20)
		setMapZoomState({
			zoom: newZoom,
			longitude: mapZoomState.longitude,
			latitude: mapZoomState.latitude,
		})
	}, [mapZoomState, setMapZoomState, logInteraction])

	// Handle zoom out
	const handleZoomOut = useCallback(() => {
		logInteraction('🔘 Button click - Zoom Out')
		const newZoom = Math.max(mapZoomState.zoom - ZOOM_STEP_BUTTON, 2)
		setMapZoomState({
			zoom: newZoom,
			longitude: mapZoomState.longitude,
			latitude: mapZoomState.latitude,
		})
	}, [mapZoomState, setMapZoomState, logInteraction])

	// Handle reset view
	const handleResetView = useCallback(() => {
		logInteraction('🔘 Button click - Reset View')
		setMapZoomState({
			longitude: -95,
			latitude: 37,
			zoom: 3,
		})
	}, [setMapZoomState, logInteraction])

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
