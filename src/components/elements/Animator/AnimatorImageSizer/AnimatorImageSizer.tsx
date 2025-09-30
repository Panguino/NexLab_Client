import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { calculateAnimatorPosition, getClientCoordinates } from '@/util/animatorPositionCalculator'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
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
	const [debugInfo, setDebugInfo] = useState<any>(null)

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
		console.log('🖱️ [AnimatorImageSizer] handleImageClick called')
		console.log('  🔍 soundingsPickerMode:', soundingsPickerMode)
		console.log('  🔍 isPanningRef.current:', isPanningRef.current)
		console.log('  🔍 panStopTimeRef.current:', panStopTimeRef.current)

		// Always show a basic debug panel on ANY click to verify handler is working
		const coords = getClientCoordinates(e)
		if (coords && !soundingsPickerMode) {
			setDebugInfo({
				eventType: e.type,
				message: 'Click detected but NOT in picker mode',
				soundingsPickerMode,
				clientX: coords.clientX,
				clientY: coords.clientY,
			})
			setTimeout(() => setDebugInfo(null), 3000) // Auto-close after 3 seconds
		}

		// Suppress click-through during pan or immediately after a pan
		const now = performance.now()
		const timeSincePanStop = now - panStopTimeRef.current
		console.log('  🔍 timeSincePanStop:', timeSincePanStop)

		if (isPanningRef.current) {
			console.log('  ⛔ Blocked: Currently panning')
			return
		}
		if (timeSincePanStop > 210) {
			console.log('  ⛔ Blocked: Too soon after pan stop (', timeSincePanStop, 'ms )')
			return
		}
		if (!soundingsPickerMode) {
			console.log('  ⛔ Blocked: Not in soundings picker mode')
			return
		}
		if (!ImageMachineRef.current) {
			console.log('  ⛔ Blocked: No ImageMachine ref')
			return
		}

		if (soundingsPickerMode) {
			console.log('  ✅ Click allowed - processing...')
			console.log('  📊 Last hover position (imagePosition state):', imagePosition)

			// Calculate position directly from the click/tap event to avoid race condition
			// IMPORTANT: Use ImageMachineRef (same as hover) not animatorRef
			const rect = ImageMachineRef.current.getBoundingClientRect()

			// Extract coordinates from event
			const coords = getClientCoordinates(e)
			if (!coords) {
				console.log('  ⚠️  Could not extract coordinates from event')
				return
			}

			// Mobile debugging: log viewport and scroll info
			console.log('  📱 Mobile Debug Info:')
			console.log('    - Event type:', e.type)
			console.log('    - Is touch event:', 'touches' in e || 'changedTouches' in e)
			console.log('    - Window size:', { width: window.innerWidth, height: window.innerHeight })
			console.log('    - Visual viewport:', {
				width: window.visualViewport?.width,
				height: window.visualViewport?.height,
				offsetLeft: window.visualViewport?.offsetLeft,
				offsetTop: window.visualViewport?.offsetTop,
				scale: window.visualViewport?.scale,
			})
			console.log('    - Scroll position:', { scrollX: window.scrollX, scrollY: window.scrollY })
			console.log('    - Document scroll:', { scrollLeft: document.documentElement.scrollLeft, scrollTop: document.documentElement.scrollTop })

			console.log('  📍 Click coordinates:', coords)
			console.log('  📦 Container rect:', { left: rect.left, top: rect.top, width: rect.width, height: rect.height })

			// Use the utility function to calculate percentages
			// NOTE: Do NOT pass transform state - the click coordinates are already in transformed space
			// This matches how DataTooltip calculates hover positions
			const { xPercent, yPercent } = calculateAnimatorPosition(coords.clientX, coords.clientY, rect, imageInfo)

			console.log('  ✅ Click percentages:', { xPercent, yPercent })
			console.log('  ⚠️  Difference from hover:', {
				xDiff: Math.abs(xPercent - imagePosition.xPercent),
				yDiff: Math.abs(yPercent - imagePosition.yPercent),
			})
			console.log('  🎯 Calling onSoundingsClickthrough with:', { xPercent, yPercent })

			// Calculate lat/lon for debug display
			const latLon = sectorId ? getLatLonFromXYandSector(xPercent, yPercent, sectorId) : null

			// Set debug info for visual display
			setDebugInfo({
				eventType: e.type,
				isTouchEvent: 'touches' in e || 'changedTouches' in e,
				clientX: coords.clientX,
				clientY: coords.clientY,
				rectLeft: rect.left,
				rectTop: rect.top,
				rectWidth: rect.width,
				rectHeight: rect.height,
				xPercent: xPercent.toFixed(4),
				yPercent: yPercent.toFixed(4),
				latLon,
				hoverXPercent: imagePosition.xPercent.toFixed(4),
				hoverYPercent: imagePosition.yPercent.toFixed(4),
				xDiff: Math.abs(xPercent - imagePosition.xPercent).toFixed(4),
				yDiff: Math.abs(yPercent - imagePosition.yPercent).toFixed(4),
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
				visualViewportScale: window.visualViewport?.scale,
				scrollX: window.scrollX,
				scrollY: window.scrollY,
			})

			onSoundingsClickthrough({ xPercent, yPercent })
			// Note: Don't close picker here - let the clickthrough handler decide when to close
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

						{/* Debug panel for mobile testing */}
						{debugInfo && (
							<div
								style={{
									position: 'fixed',
									top: '10px',
									right: '10px',
									backgroundColor: 'rgba(0, 0, 0, 0.9)',
									color: '#0f0',
									padding: '10px',
									borderRadius: '5px',
									fontSize: '11px',
									fontFamily: 'monospace',
									zIndex: 99999,
									maxWidth: '300px',
									maxHeight: '90vh',
									overflow: 'auto',
									border: '2px solid #0f0',
								}}
								onClick={(e) => {
									e.stopPropagation()
									setDebugInfo(null)
								}}
							>
								<div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#ff0' }}>🐛 DEBUG (tap to close)</div>
								{debugInfo.message && <div style={{ color: '#f00', marginBottom: '8px' }}>{debugInfo.message}</div>}
								<div>Event: {debugInfo.eventType}</div>
								{debugInfo.isTouchEvent !== undefined && <div>Touch: {debugInfo.isTouchEvent ? 'YES' : 'NO'}</div>}
								<div style={{ marginTop: '8px', color: '#0ff' }}>Click Coords:</div>
								<div>clientX: {debugInfo.clientX}</div>
								<div>clientY: {debugInfo.clientY}</div>
								{debugInfo.rectLeft !== undefined && (
									<>
										<div style={{ marginTop: '8px', color: '#0ff' }}>Container Rect:</div>
										<div>left: {debugInfo.rectLeft.toFixed(1)}</div>
										<div>top: {debugInfo.rectTop.toFixed(1)}</div>
										<div>width: {debugInfo.rectWidth.toFixed(1)}</div>
										<div>height: {debugInfo.rectHeight.toFixed(1)}</div>
									</>
								)}
								{debugInfo.xPercent !== undefined && (
									<>
										<div style={{ marginTop: '8px', color: '#0ff' }}>Click %:</div>
										<div>x: {debugInfo.xPercent}</div>
										<div>y: {debugInfo.yPercent}</div>
									</>
								)}
								{debugInfo.hoverXPercent !== undefined && (
									<>
										<div style={{ marginTop: '8px', color: '#f0f' }}>Hover %:</div>
										<div>x: {debugInfo.hoverXPercent}</div>
										<div>y: {debugInfo.hoverYPercent}</div>
									</>
								)}
								{debugInfo.xDiff !== undefined && (
									<>
										<div style={{ marginTop: '8px', color: '#f00' }}>Diff:</div>
										<div>Δx: {debugInfo.xDiff}</div>
										<div>Δy: {debugInfo.yDiff}</div>
									</>
								)}
								{debugInfo.latLon !== undefined && (
									<>
										<div style={{ marginTop: '8px', color: '#ff0' }}>Lat/Lon:</div>
										<div>{debugInfo.latLon || 'N/A'}</div>
									</>
								)}
								{debugInfo.windowWidth !== undefined && (
									<>
										<div style={{ marginTop: '8px', color: '#0ff' }}>Window:</div>
										<div>
											{debugInfo.windowWidth} x {debugInfo.windowHeight}
										</div>
										<div>Scale: {debugInfo.visualViewportScale?.toFixed(2) || 'N/A'}</div>
										<div>
											Scroll: {debugInfo.scrollX}, {debugInfo.scrollY}
										</div>
									</>
								)}
							</div>
						)}
					</>
				)}
			</TransformWrapper>
		</div>
	)
}

export default AnimatorImageSizer
