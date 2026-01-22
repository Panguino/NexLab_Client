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

	useEffect(() => {
		if (!transformRef.current) return

		// Calculate manual center position
		const manualCenterY = Math.ceil((_height - adjustedHeight) / 2)
		const manualCenterX = Math.ceil((_width - adjustedWidth) / 2)

		// Check if the zoom state is at default (matches manual center position)
		// Use a small tolerance to account for rounding differences
		const tolerance = 2
		const isAtDefault =
			initialZoomState.scale === 1 &&
			Math.abs(initialZoomState.positionX - manualCenterX) <= tolerance &&
			Math.abs(initialZoomState.positionY - manualCenterY) <= tolerance

		console.log('🔍 AnimatorImageSizer - Setting transform:', {
			isAtDefault,
			initialZoomState,
			manualCenter: { x: manualCenterX, y: manualCenterY },
			diff: {
				x: Math.abs(initialZoomState.positionX - manualCenterX),
				y: Math.abs(initialZoomState.positionY - manualCenterY),
			},
			willUse: isAtDefault ? 'MANUAL CENTER' : 'STORED STATE',
		})

		if (isAtDefault) {
			// Use manual centering for fresh/default state
			transformRef.current.setTransform(manualCenterX, manualCenterY, initialZoomState.scale, 0)
		} else {
			// Use stored position for panned/zoomed state
			transformRef.current.setTransform(initialZoomState.positionX, initialZoomState.positionY, initialZoomState.scale, 0)
		}
	}, [_width, _height, adjustedHeight, adjustedWidth, initialZoomState, fullScreen])

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
				ref={transformRef}
				disablePadding
				initialScale={initialZoomState.scale}
				initialPositionX={initialZoomState.positionX}
				initialPositionY={initialZoomState.positionY}
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
