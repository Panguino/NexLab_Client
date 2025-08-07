import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
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
	} = useAnimator()
	const transformRef = useRef(null)
	const ImageMachineRef = useRef(null)
	const [animatorRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(ratio, !zoomFill)

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
	const handlePanningChange = (e: any) => {
		setZoomState(e?.state)
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
	const handleImageClick = (event: React.MouseEvent) => {
		if (soundingsPickerMode) {
			const rect = event.currentTarget.getBoundingClientRect()
			const x = event.clientX - rect.left
			const y = event.clientY - rect.top

			console.log('Sounding location clicked:', { x, y })
			setSoundingsPickerMode(false) // Exit pick mode after selection
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
				onPanningStop={handlePanningChange}
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
						</TransformComponent>
						<DataTooltip hoverRef={ImageMachineRef} frameRef={animatorRef} />

						{!hideZoomControls && !disableZoom && <ImageControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />}
					</>
				)}
			</TransformWrapper>
		</div>
	)
}

export default AnimatorImageSizer
