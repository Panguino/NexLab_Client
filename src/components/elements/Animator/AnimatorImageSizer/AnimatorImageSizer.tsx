import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { calculateAnimatorPosition, getClientCoordinates } from '@/util/animatorPositionCalculator'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { useAnimator } from '../Animator'
import { AnimatorImageMachine } from '../AnimatorImageMachine/AnimatorImageMachine'
import DataTooltip from '../DataTooltip/DataTooltip'
import ViewControls from '../ViewControls/ViewControls'
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
		onSoundingsClickthrough,
		overlayMarkers,
		imageInfo,
		sectorId,
	} = useAnimator()
	const transformRef = useRef(null)
	const ImageMachineRef = useRef(null)
	// retain state for tooltip hover position (not required for click-through)
	const [, setImagePosition] = useState({ xPercent: 0, yPercent: 0 })
	const [animatorRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(ratio, !zoomFill)

	// Track panning to suppress click-through during/after pan
	const isPanningRef = useRef(false)
	const panStopTimeRef = useRef(0)

	// Track previous zoomFill state to detect mode changes and force remount
	const previousZoomFillRef = useRef(zoomFill)
	const [transformKey, setTransformKey] = useState(0)

	// Track when container dimensions are first measured so we can remount
	// TransformWrapper with correct initial transform (before browser paint)
	const hasDimensionedRef = useRef(false)
	const lastCenteringRatioRef = useRef<number>(0)
	const [dimensionedKey, setDimensionedKey] = useState(0)

	// Track whether the pending dimension change came from a window resize event
	// so we can programmatically re-center after the DOM has been updated
	const isResizeRef = useRef(false)

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
			isResizeRef.current = true
			updateDimensions()
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [updateDimensions])

	// After a window resize updates the container dimensions, re-center the content
	// at the current scale so the position stays sensible in the new container size.
	// This runs synchronously after the DOM has been updated with the new dimensions,
	// ensuring centerView has the correct container bounds to work with.
	useLayoutEffect(() => {
		if (!isResizeRef.current || _width === 0 || _height === 0) return
		isResizeRef.current = false
		const scale = (transformRef.current as any)?.instance?.transformState?.scale ?? 1
		;(transformRef.current as any)?.centerView?.(scale, 0)
	}, [_width, _height])

	useLayoutEffect(() => {
		updateDimensions()
	}, [updateDimensions, loadedFrames])

	// Calculate centered position - used for both initial render and repositioning
	const calculateCenteredPosition = useMemo(() => {
		const manualCenterY = Math.ceil((_height - adjustedHeight) / 2)
		const manualCenterX = Math.ceil((_width - adjustedWidth) / 2)
		return { x: manualCenterX, y: manualCenterY }
	}, [_width, _height, adjustedHeight, adjustedWidth])

	// Calculate initial transform values for first mount
	// Only use saved zoom state if dimensions are valid
	const initialTransform = useMemo(() => {
		const isFirstVisit = initialZoomState === null
		const hasDimensions = _width > 0 && _height > 0

		if (isFirstVisit || !hasDimensions) {
			return {
				scale: 1,
				positionX: calculateCenteredPosition.x,
				positionY: calculateCenteredPosition.y,
			}
		} else {
			return {
				scale: initialZoomState.scale,
				positionX: initialZoomState.positionX,
				positionY: initialZoomState.positionY,
			}
		}
	}, [initialZoomState, calculateCenteredPosition, _width, _height])

	// Remount TransformWrapper when:
	// 1. Container dimensions are first measured (always) - so initial position uses real dimensions
	// 2. The image ratio changes while on a first visit (no saved zoom state) - so centering
	//    stays correct when actual imageInfo differs from the default placeholder imageInfo
	useLayoutEffect(() => {
		if (_width > 0 && _height > 0) {
			const isFirstVisit = initialZoomState === null
			const notYetDimensioned = !hasDimensionedRef.current
			const ratioChangedOnFirstVisit = isFirstVisit && hasDimensionedRef.current && ratio !== lastCenteringRatioRef.current
			if (notYetDimensioned || ratioChangedOnFirstVisit) {
				hasDimensionedRef.current = true
				lastCenteringRatioRef.current = ratio
				setDimensionedKey((prev) => prev + 1)
			}
		}
	}, [_width, _height, ratio, initialZoomState])

	// Force remount of TransformWrapper when zoomFill mode changes
	// This ensures proper repositioning with new dimensions
	useEffect(() => {
		const zoomFillChanged = previousZoomFillRef.current !== zoomFill
		if (zoomFillChanged) {
			previousZoomFillRef.current = zoomFill
			// Clear saved zoom state: the old position was calculated for the previous mode's
			// dimensions and is meaningless in the new mode. Resetting to null makes
			// initialTransform treat this as a first visit and use calculateCenteredPosition
			// for the new mode instead of restoring the stale position.
			setZoomState(null)
			// Increment key to force TransformWrapper remount with new dimensions
			setTransformKey((prev) => prev + 1)
		}
	}, [zoomFill, setZoomState])

	const handleZoomChange = (e: any) => {
		console.log('🔄 handleZoomChange:', e?.state)
		setZoomState(e?.state)
	}
	const handlePanningStart = (e: any) => {
		console.log('🟢 handlePanningStart:', e?.state)
		setZoomState(e?.state)
		isPanningRef.current = true
		panStopTimeRef.current = performance.now()
	}
	const handlePanningStop = (e: any) => {
		console.log('🛑 handlePanningStop:', e?.state)
		setZoomState(e?.state)
		isPanningRef.current = false
	}

	const handleImageClick = (e: React.MouseEvent | React.TouchEvent) => {
		// console.log('🖱️ Click handler called')

		// Suppress click-through during pan or immediately after a pan
		const now = performance.now()
		const timeSincePanStop = now - panStopTimeRef.current

		if (isPanningRef.current) {
			// console.log('⛔ Blocked: panning')
			return
		}
		if (timeSincePanStop > 120) {
			// console.log('⛔ Blocked: too soon after pan', timeSincePanStop)
			return
		}
		if (!soundingsPickerMode) {
			// console.log('⛔ Blocked: not in picker mode')
			return
		}
		if (!ImageMachineRef.current) {
			// console.log('⛔ Blocked: no ref')
			return
		}

		// console.log('✅ Processing click...')

		// Calculate position directly from the click/tap event
		// IMPORTANT: Use ImageMachineRef (same as hover) not animatorRef
		const rect = ImageMachineRef.current.getBoundingClientRect()

		// Extract coordinates from event
		const coords = getClientCoordinates(e)
		if (!coords) {
			// console.log('⛔ No coordinates')
			return
		}

		// Use the utility function to calculate percentages
		// NOTE: Do NOT pass transform state - the click coordinates are already in transformed space
		// This matches how DataTooltip calculates hover positions
		const { xPercent, yPercent } = calculateAnimatorPosition(coords.clientX, coords.clientY, rect, imageInfo)

		// console.log('📍 Calling clickthrough with:', { xPercent, yPercent })
		onSoundingsClickthrough({ xPercent, yPercent })
	}
	return (
		<div
			className={`${styles.animatorImageSizer} ${soundingsPickerMode ? styles.soundingPickMode : ''}`}
			onClick={handleImageClick}
			ref={animatorRef}
		>
			<TransformWrapper
				key={`transform-${zoomFill}-${transformKey}-${dimensionedKey}`}
				ref={transformRef}
				disablePadding
				initialScale={initialTransform.scale}
				initialPositionX={initialTransform.positionX}
				initialPositionY={initialTransform.positionY}
				onZoomStop={handleZoomChange}
				onPanningStart={handlePanningStart}
				onPanningStop={handlePanningStop}
				doubleClick={{ disabled: true }}
				panning={{ disabled: disableZoom, velocityDisabled: true }}
				wheel={{ disabled: disableZoom }}
				pinch={{ disabled: disableZoom }}
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
							wrapperProps={{
								onClick: handleImageClick,
							}}
						>
							<AnimatorImageMachine
								ref={ImageMachineRef}
								frames={frames ? frames : []}
								currentFrame={currentFrame}
								loadedFrames={loadedFrames}
								setLoadedFrames={setLoadedFrames}
								baseOpacity={1}
							/>
							{activeOverlays &&
								Array.isArray(activeOverlays) &&
								activeOverlays.map((overlay, index) => {
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

						{!hideZoomControls && !disableZoom && (
							<ViewControls mode="image" zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
						)}
					</>
				)}
			</TransformWrapper>
		</div>
	)
}

export default AnimatorImageSizer
