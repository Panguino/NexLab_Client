'use client'
import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { faLayerGroup, faSearchMinus, faSearchPlus, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import BasicPlaybackControls, { LoopMethod } from '../BasicPlaybackControls/BasicPlaybackControls'
import Scrubber from '../Scrubber/Scrubber'
import styles from './Animator.module.scss'
import { AnimatorImageMachine } from './AnimatorImageMachine/AnimatorImageMachine'
import { OverlayPanel } from './OverlayPanel/OverylayPanel'

type direction = 1 | -1

interface IAnimatorProps {
	frames: string[]
	overlays?: { static: object; dynamic: object }
	ratio?: number
	height?: number
	width?: number
	hideControls?: boolean
	hideZoomControls?: boolean
	autoPlay?: boolean
	interval?: number
	settingsComponent?: React.ReactNode | null
}

export const Animator = ({
	frames,
	overlays,
	ratio = 1,
	height,
	width,
	interval = 0.1,
	hideControls = false,
	autoPlay = false,
	hideZoomControls = false,
	settingsComponent = null,
}: IAnimatorProps) => {
	const [loadedFrames, setLoadedFrames] = useState([])
	const [activeOverlays, setActiveOverlays] = useState(['data', 'map'])
	const [overlayPanelOpen, setOverlayPanelOpen] = useState(false)
	const [currentFrame, setCurrentFrame] = useState(0)
	const [loopMethod, setLoopMethod] = useState(LoopMethod.LeftToRight)
	const [playDirection, setPlayDirection] = useState<direction>(1)
	const [isPlaying, setIsPlaying] = useState(false)
	const intervalRef = useRef<number | null>(null)
	const transformRef = useRef(null)
	const [animatorRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }] = useDimensions(ratio)

	useEffect(() => {
		if (loopMethod === LoopMethod.LeftToRight) {
			setPlayDirection(1)
		} else if (loopMethod === LoopMethod.RightToLeft) {
			setPlayDirection(-1)
		} else if (loopMethod === LoopMethod.Bounce) {
			if (currentFrame === 0) {
				setPlayDirection(1)
			} else if (currentFrame === loadedFrames.length - 1) {
				setPlayDirection(-1)
			}
		}
	}, [playDirection, loopMethod, currentFrame, loadedFrames.length])

	useEffect(() => {
		if (isPlaying) {
			intervalRef.current = window.setInterval(() => {
				setCurrentFrame((prevFrame) => {
					const nextFrame = (prevFrame + 1 * playDirection) % loadedFrames.length
					if (nextFrame < 0) {
						return loadedFrames.length - 1
					}
					return nextFrame
				})
			}, interval * 1000)
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isPlaying, interval, loadedFrames.length, playDirection])

	const playPause = () => {
		if (isPlaying) {
			setIsPlaying(false)
		} else {
			setIsPlaying(true)
		}
	}
	const seek = (frameIndex: number) => {
		setCurrentFrame(frameIndex)
		if (isPlaying) {
			setIsPlaying(false)
		}
	}
	const stepForward = () => {
		setIsPlaying(false)
		seek((currentFrame + 1) % loadedFrames.length)
	}
	const stepBackward = () => {
		setIsPlaying(false)
		seek((currentFrame - 1 + loadedFrames.length) % loadedFrames.length)
	}

	useEffect(() => {
		if (loadedFrames.length > 0 && autoPlay) {
			setIsPlaying(true)
		}
	}, [autoPlay, loadedFrames])

	useEffect(() => {
		if (loadedFrames.length > 0) {
			// make it so animation initialize on last frame
			setCurrentFrame(loadedFrames.length - 1)
		}
	}, [loadedFrames])

	useEffect(() => {
		const handleResize = () => {
			if (transformRef.current) {
				transformRef.current.resetTransform()
			}
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

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

	return (
		<div ref={animatorRef} className={styles.animator} style={{ height: height || '100%', width: width || '100%' }}>
			<TransformWrapper ref={transformRef} disablePadding centerOnInit doubleClick={{ disabled: true }} panning={{ velocityDisabled: true }}>
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
								frames={frames || []}
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
										baseOpacity={SATRAD_OVERLAYS[overlay].opacity}
										zIndex={SATRAD_OVERLAYS[overlay].zIndex}
										frames={allOverlayImages[overlay] || []}
										currentFrame={currentFrame}
									/>
								)
							})}
						</TransformComponent>
						{!hideZoomControls && (
							<div className={styles.zoomControls}>
								<button onClick={() => zoomIn()}>
									<FontAwesomeIcon icon={faSearchPlus} />
								</button>
								<button onClick={() => zoomOut()}>
									<FontAwesomeIcon icon={faSearchMinus} />
								</button>
								<button
									onClick={() => {
										resetTransform()
									}}
								>
									<FontAwesomeIcon icon={faUndo} />
								</button>
								{overlays && (
									<button onClick={() => setOverlayPanelOpen(true)}>
										<FontAwesomeIcon icon={faLayerGroup} />
										<OverlayPanel
											activeOverlays={activeOverlays}
											setActiveOverlays={setActiveOverlays}
											overlays={overlays}
											onClose={() => setOverlayPanelOpen(false)}
											open={overlayPanelOpen}
										/>
									</button>
								)}
							</div>
						)}
					</>
				)}
			</TransformWrapper>
			{!hideControls && (
				<div className={styles.controlsContainer}>
					<div className={styles.controls}>
						<Scrubber minValue={0} maxValue={loadedFrames.length - 1} value={currentFrame} onChange={seek} />
						<BasicPlaybackControls
							isPlaying={isPlaying}
							loopMethod={loopMethod}
							onLoopMethodToggle={setLoopMethod}
							onStepBackwardClick={stepBackward}
							onStepForwardClick={stepForward}
							onPlayPauseClick={playPause}
						/>
						{settingsComponent}
					</div>
				</div>
			)}
		</div>
	)
}
