'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import statesData from '@/data/d3Map/states.json'
import worldData from '@/data/d3Map/world.json'
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
		const [isDarkMode, setIsDarkMode] = useState(false)

		const loadedFrames = externalLoadedFrames ?? localLoadedFrames
		const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

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
		// Ocean: blue1 (#8aadcf) light / blue2 (#233544) dark
		const oceanColor = isDark ? [35, 53, 68, 255] : [138, 173, 207, 255]
		// World: grey2 (#d8d8d8) light / grey16 (#484848) dark
		const worldColor = isDark ? [72, 72, 72, 255] : [216, 216, 216, 255]
		// US States: white (#ffffff) light / grey13 (#5f5f5f) dark
		const statesColor = isDark ? [95, 95, 95, 255] : [255, 255, 255, 255]
		// Borders: grey18 (#232323) light / grey15 (#505050) dark
		const borderColor = isDark ? [80, 80, 80, 255] : [35, 35, 35, 255]

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
				// US States borders layer - separate layer for strokes
				// Using theme color grey18-grey15
				new GeoJsonLayer({
					id: 'states-borders-layer',
					data: statesData as any,
					filled: false,
					stroked: true,
					lineWidthMinPixels: 1,
					lineWidthMaxPixels: 3,
					getLineColor: () => borderColor as any,
					getLineWidth: () => 1,
					opacity: 1,
					pickable: false,
					updateTriggers: {
						getLineColor: [borderColor],
					},
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
							opacity: 0, // Hide frame data layer for now
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
								opacity: 0, //overlay.opacity ?? _baseOpacity,
							}),
						)
					})
				}

				if (onFrameChange) {
					onFrameChange(activeFrame)
				}
			}

			return baseLayers
		}, [loadedFrames, currentFrame, _baseOpacity, onFrameChange, isDarkMode, oceanColor, worldColor, statesColor, borderColor])

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
