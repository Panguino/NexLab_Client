import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { calculateAnimatorPosition, getClientCoordinates } from '@/util/animatorPositionCalculator'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { useAnimator } from '../Animator'
import { AnimatorImageMachine } from '../AnimatorImageMachine/AnimatorImageMachine'
import DataTooltip from '../DataTooltip/DataTooltip'
import ImageControls from '../ImageControls/ImageControls'
import styles from './AnimatorImageSizer.module.scss'

const AnimatorImageSizer = () => {
	const {
		setLoadedFrames,
		loadedFrames,
		ratio,
		zoomFill,
		overlays,
		setZoomState,
		initialZoomState,
		fullScreen,
		currentFrame,
		activeOverlays,
		disableZoom,
		frames,
		hideZoomControls,
		soundingsPickerMode,
		setSoundingsPickerMode,
		onSoundingsClickthrough,
		overlayMarkers,
		imageInfo,
		sectorId,
	} = useAnimator()
	const transformRef = useRef(null)
	const ImageMachineRef = useRef(null)
	// retain state for tooltip hover position (not required for click-through)
	const [imagePosition, setImagePosition] = useState({ xPercent: 0, yPercent: 0 })
	const [animatorRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(ratio, !zoomFill)

	// Track panning to suppress click-through during/after pan
	const isPanningRef = useRef(false)
	const panStopTimeRef = useRef(0)

	const allOverlayImages = useMemo(() => {
		if (!overlays) return {}
		return {
			...Object.keys(overlays.static).reduce((acc, key) => {
				acc[key] = [overlays.static[key]]
				return acc
			}, {}),
			...Object.keys(overlays.dynamic).reduce((acc, key) => {
				acc[key] = overlays.dynamic[key]
				return acc
			}, {}),
		}
	}, [overlays])

	useEffect(() => {
		const handleResize = () => {
			updateDimensions()
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [updateDimensions])

	useLayoutEffect(() => {
		updateDimensions()
	}, [updateDimensions, loadedFrames])

	const handleZoomChange = (e: any) => {
		setZoomState(e?.state)
	}
	const handlePanningStart = (e: any) => {
		setZoomState(e?.state)
		isPanningRef.current = true
		panStopTimeRef.current = performance.now()
	}
	const handlePanningStop = (e: any) => {
		setZoomState(e?.state)
		isPanningRef.current = false
	}

	useEffect(() => {
		if (!transformRef.current) return
		// this is the only way to keep the zoom position and level intact when you change expand
		const manualCenterY = Math.ceil((_height - adjustedHeight) / 2)
		const manualCenterX = Math.ceil((_width - adjustedWidth) / 2)
		if (initialZoomState.scale === 1) {
			transformRef.current.setTransform(manualCenterX, manualCenterY, initialZoomState.scale, 0)
		} else {
			transformRef.current.setTransform(initialZoomState.positionX, initialZoomState.positionY, initialZoomState.scale, 0)
		}
		// I know this is stupid, but it works
	}, [_width, _height, adjustedHeight, adjustedWidth, initialZoomState, fullScreen])

	const handleImageClick = (e: React.MouseEvent | React.TouchEvent) => {
		// Suppress click-through during pan or immediately after a pan
		const now = performance.now()
		if (isPanningRef.current || now - panStopTimeRef.current < 120) return
		if (!soundingsPickerMode || !animatorRef.current) return

		if (soundingsPickerMode) {
			console.log('🖱️ [AnimatorImageSizer] handleImageClick triggered')

			// Get current transform state
			const currentTransform = transformRef.current?.instance?.transformState

			// Calculate position directly from the click/tap event to avoid race condition
			const rect = animatorRef.current.getBoundingClientRect()

			// Extract coordinates from event
			const coords = getClientCoordinates(e)
			if (!coords) {
				console.log('  ⚠️  Could not extract coordinates from event')
				return
			}

			console.log('  📍 Click coordinates:', coords)
			console.log('  📦 Container rect:', { left: rect.left, top: rect.top, width: rect.width, height: rect.height })

			// Use the utility function to calculate percentages (handles transforms automatically)
			const { xPercent, yPercent } = calculateAnimatorPosition(coords.clientX, coords.clientY, rect, imageInfo, currentTransform)

			console.log('  ✅ Click percentages:', { xPercent, yPercent })
			console.log('  🎯 Calling onSoundingsClickthrough with:', { xPercent, yPercent })

			onSoundingsClickthrough({ xPercent, yPercent })
			setSoundingsPickerMode?.(false)
		}
	}
	return (
		<div
			className={`${styles.animatorImageSizer} ${soundingsPickerMode ? styles.soundingPickMode : ''}`}
			onClick={handleImageClick}
			ref={animatorRef}
		>
			<TransformWrapper
				ref={transformRef}
				disablePadding
				initialScale={initialZoomState.scale}
				initialPositionX={initialZoomState.positionX}
				initialPositionY={initialZoomState.positionY}
				onZoomStop={handleZoomChange}
				onPanningStart={handlePanningStart}
				onPanningStop={handlePanningStop}
				doubleClick={{ disabled: true }}
				panning={{ velocityDisabled: true }}
			>
				{({ zoomIn, zoomOut, resetTransform }) => (
					<>
						<TransformComponent
							wrapperStyle={{
								width: _width,
								height: _height,
							}}
							contentClass={styles.animatorImagesContainer}
							contentStyle={{ width: adjustedWidth, height: adjustedHeight }}
						>
							<AnimatorImageMachine
								ref={ImageMachineRef}
								frames={frames ? frames : []}
								currentFrame={currentFrame}
								loadedFrames={loadedFrames}
								setLoadedFrames={setLoadedFrames}
								baseOpacity={activeOverlays.includes('data') ? 1 : 0}
							/>
							{activeOverlays.map((overlay, index) => {
								if (overlay === 'data') return null
								return (
									<AnimatorImageMachine
										key={index}
										baseOpacity={SATRAD_OVERLAYS[overlay].opacity} // TODO FIX THIS Satrad shouldn't be hard coded into animator
										zIndex={SATRAD_OVERLAYS[overlay].zIndex}
										frames={allOverlayImages[overlay] || []}
										currentFrame={currentFrame}
									/>
								)
							})}
							{/* Overlay markers */}
							{(Array.isArray(overlayMarkers) ? overlayMarkers : []).map((m, i) => (
								<div
									key={`overlay-marker-${i}`}
									className={styles.overlayMarker}
									style={{ left: `${m.xPercent * 100}%`, top: `${m.yPercent * 100}%` }}
								/>
							))}
						</TransformComponent>
						<DataTooltip hoverRef={ImageMachineRef} frameRef={animatorRef} onUpdatePosition={setImagePosition} sectorId={sectorId} />

						{!hideZoomControls && !disableZoom && <ImageControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />}
					</>
				)}
			</TransformWrapper>
		</div>
	)
}

export default AnimatorImageSizer
