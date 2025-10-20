'use client'

import { useEffect, useRef, useState } from 'react'
import useDimensions from '@/hooks/useDimensions'
import { useAnimator } from '../Animator'
import { AnimatorMapMachine } from '../AnimatorMapMachine/AnimatorMapMachine'
import MapControls from '../MapControls/MapControls'
import styles from './AnimatorMapSizer.module.scss'
import { MapViewState } from '../AnimatorMapMachine/types'

/**
 * AnimatorMapSizer Component
 *
 * Wrapper component for AnimatorMapMachine that handles:
 * - Sizing and responsive layout
 * - Zoom and pan controls
 * - Region selection
 * - View state management
 *
 * Similar to AnimatorImageSizer but for map data
 */
const AnimatorMapSizer = () => {
	const {
		frames,
		currentFrame,
		loadedFrames,
		setLoadedFrames,
		ratio,
		zoomFill,
		fullScreen,
		disableZoom,
		hideZoomControls,
		activeOverlays,
	} = useAnimator()

	const mapMachineRef = useRef<HTMLDivElement>(null)
	const [mapRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(
		ratio,
		!zoomFill,
	)
	const [viewState, setViewState] = useState<MapViewState>({
		longitude: -95,
		latitude: 37,
		zoom: 3,
	})
	const [selectedRegion, setSelectedRegion] = useState<'conus' | 'alaska' | 'hawaii' | 'namer'>('conus')

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

	// Handle view state changes from map
	const handleViewStateChange = (newViewState: MapViewState) => {
		setViewState(newViewState)
	}

	// Handle region change
	const handleRegionChange = (region: 'conus' | 'alaska' | 'hawaii' | 'namer') => {
		setSelectedRegion(region)
	}

	// Handle zoom in
	const handleZoomIn = () => {
		setViewState((prev) => ({
			...prev,
			zoom: Math.min(prev.zoom + 1, 20),
		}))
	}

	// Handle zoom out
	const handleZoomOut = () => {
		setViewState((prev) => ({
			...prev,
			zoom: Math.max(prev.zoom - 1, 0),
		}))
	}

	// Handle reset view
	const handleResetView = () => {
		setViewState({
			longitude: -95,
			latitude: 37,
			zoom: 3,
		})
	}

	return (
		<div
			className={`${styles.animatorMapSizer} ${fullScreen ? styles.fullScreen : ''}`}
			ref={mapRef}
		>
			<div className={styles.mapContainer} style={{ width: _width, height: _height }}>
				<AnimatorMapMachine
					ref={mapMachineRef}
					frames={frames || []}
					currentFrame={currentFrame}
					loadedFrames={loadedFrames}
					setLoadedFrames={setLoadedFrames}
					region={selectedRegion}
					mapProvider="deckgl"
					onViewStateChange={handleViewStateChange}
					containerStyle={{
						width: adjustedWidth,
						height: adjustedHeight,
					}}
				/>
			</div>

			{!hideZoomControls && !disableZoom && (
				<MapControls
					region={selectedRegion}
					onRegionChange={handleRegionChange}
					onZoomIn={handleZoomIn}
					onZoomOut={handleZoomOut}
					onResetView={handleResetView}
					zoom={viewState.zoom}
				/>
			)}
		</div>
	)
}

export default AnimatorMapSizer

