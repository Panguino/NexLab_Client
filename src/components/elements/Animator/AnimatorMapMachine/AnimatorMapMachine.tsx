'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import statesData from '@/data/d3Map/states.json'
import { GeoJsonLayer } from '@deck.gl/layers'
import DeckGL from '@deck.gl/react'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import styles from './AnimatorMapMachine.module.scss'
import { IAnimatorMapMachineProps, MapFrame, MapViewState } from './types'

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
			_baseOpacity = 1,
			zIndex = 30,
			region = 'conus',
			onFrameChange,
			_onViewStateChange,
			containerStyle,
		},
		ref,
	) => {
		const [isLoading, setIsLoading] = useState(true)
		const [localLoadedFrames, setLocalLoadedFrames] = useState<MapFrame[]>([])
		const [viewState, setViewState] = useState<MapViewState>({
			longitude: -95,
			latitude: 37,
			zoom: 3,
		})

		const loadedFrames = externalLoadedFrames ?? localLoadedFrames
		const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

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

		// Create layers with base map and current frame data
		const layers = useMemo(() => {
			const baseLayers: any[] = [
				// Ocean background layer
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
					getFillColor: [30, 144, 255, 255], // Dodger blue for ocean
					opacity: 1,
				}),
				// Land layer with states
				new GeoJsonLayer({
					id: 'land-layer',
					data: statesData as any,
					filled: true,
					stroked: true,
					lineWidthMinPixels: 1,
					lineWidthMaxPixels: 2,
					getFillColor: [34, 139, 34, 255], // Forest green for land
					getLineColor: [0, 100, 0, 255], // Dark green for borders
					opacity: _baseOpacity,
				}),
			]

			// Add current frame data if available
			if (loadedFrames.length > 0) {
				const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame
				const frame = loadedFrames[activeFrame]

				if (frame && frame.data) {
					baseLayers.push(
						new GeoJsonLayer({
							id: 'main-layer',
							data: frame.data as any,
							stroked: true,
							filled: true,
							lineWidthMinPixels: 1,
							lineWidthMaxPixels: 10,
							getLineColor: [255, 0, 0, 255],
							getFillColor: [255, 0, 0, 128],
							opacity: _baseOpacity,
						}),
					)
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
								opacity: overlay.opacity ?? _baseOpacity,
							}),
						)
					})
				}

				if (onFrameChange) {
					onFrameChange(activeFrame)
				}
			}

			return baseLayers
		}, [loadedFrames, currentFrame, _baseOpacity, onFrameChange])

		const handleViewStateChange = (viewState: any) => {
			setViewState(viewState.viewState)
		}

		return (
			<div
				ref={ref}
				className={styles.animatorMapMachine}
				style={{
					zIndex,
					...containerStyle,
				}}
			>
				{isLoading && <LoadingPanel size={0.35} hideText />}
				<DeckGL initialViewState={viewState} controller={true} layers={layers} onViewStateChange={handleViewStateChange} />
			</div>
		)
	},
)

AnimatorMapMachine.displayName = 'AnimatorMapMachine'
