'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { forwardRef, useEffect, useRef, useState } from 'react'
import styles from './AnimatorMapMachine.module.scss'
import { createMapProvider } from './providers/MapProvider'
import { IAnimatorMapMachineProps, IMapProvider, MapFrame, MapViewState } from './types'

/**
 * AnimatorMapMachine Component
 *
 * Core component for rendering map frames with opacity-based transitions.
 * Similar to AnimatorImageMachine but for geographic/map data.
 *
 * Features:
 * - Frame-based animation with opacity transitions
 * - Deck.gl provider for GPU-accelerated rendering
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
			mapProvider = 'deckgl',
			onFrameChange,
			_onViewStateChange,
			containerStyle,
		},
		ref,
	) => {
		const [isLoading, setIsLoading] = useState(true)
		const [localLoadedFrames, setLocalLoadedFrames] = useState<MapFrame[]>([])
		const [mapProviderInstance, setMapProviderInstance] = useState<IMapProvider | null>(null)
		const [viewState, setViewState] = useState<MapViewState>({
			longitude: -95,
			latitude: 37,
			zoom: 3,
		})

		const containerRef = useRef<HTMLDivElement>(null)
		const loadedFrames = externalLoadedFrames ?? localLoadedFrames
		const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

		// Initialize map provider
		useEffect(() => {
			const initializeProvider = async () => {
				try {
					setIsLoading(true)

					// Create provider instance
					const provider = createMapProvider(mapProvider)
					setMapProviderInstance(provider)

					// Initialize provider
					if (containerRef.current) {
						await provider.initialize({
							container: containerRef.current,
							initialViewState: viewState,
							region,
						})

						console.log(`${mapProvider} provider initialized`)
					}
				} catch (error) {
					console.error('Failed to initialize map provider:', error)
				}
			}

			initializeProvider()

			return () => {
				if (mapProviderInstance) {
					mapProviderInstance.destroy()
				}
			}
		}, [mapProvider, region])

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

		// Update map when current frame changes
		useEffect(() => {
			if (!mapProviderInstance || loadedFrames.length === 0) return

			const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame

			const frame = loadedFrames[activeFrame]

			try {
				// Update main layer with current frame data
				mapProviderInstance.updateData('main-layer', frame.data)

				// Update overlays if present
				if (frame.overlays) {
					frame.overlays.forEach((overlay) => {
						const layerId = `overlay-${overlay.id}`
						mapProviderInstance.updateData(layerId, overlay.data)
						if (overlay.opacity !== undefined) {
							mapProviderInstance.setOpacity(layerId, overlay.opacity)
						}
					})
				}

				if (onFrameChange) {
					onFrameChange(activeFrame)
				}
			} catch (error) {
				console.error('Failed to update frame:', error)
			}
		}, [currentFrame, loadedFrames, mapProviderInstance, onFrameChange])

		return (
			<div
				ref={ref}
				className={styles.animatorMapMachine}
				style={{
					zIndex,
					...containerStyle,
				}}
			>
				<div
					ref={containerRef}
					className={styles.mapContainer}
					style={{
						width: '100%',
						height: '100%',
					}}
				>
					{isLoading && <LoadingPanel size={0.35} hideText />}
				</div>
			</div>
		)
	},
)

AnimatorMapMachine.displayName = 'AnimatorMapMachine'
