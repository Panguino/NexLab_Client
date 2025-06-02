'use client'
import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { zoomState } from '@/types/general'
import { faCompress, faExpand, faLayerGroup, faSearchMinus, faSearchPlus, faUndo } from '@fortawesome/free-solid-svg-icons'
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
	startFrame?: number
	overlays?: { static: object; dynamic: object }
	ratio?: number
	height?: number
	width?: number
	hideControls?: boolean
	hideZoomControls?: boolean
	autoPlay?: boolean
	disableZoom?: boolean
	interval?: number
	settingsComponent?: React.ReactNode | null
	initialZoomState?: zoomState
	setZoomState?: (zoomState: zoomState) => void
}

export const Animator = ({
	frames,
	startFrame,
	overlays,
	ratio = 1,
	height,
	width,
	interval = 200,
	hideControls = false,
	autoPlay = false,
	disableZoom = false,
	hideZoomControls = false,
	settingsComponent = null,
	initialZoomState = { scale: 1, positionX: 0, positionY: 0, previousScale: 1 },
	setZoomState = (zoomState: zoomState) => {
		console.warn('setZoomState function not provided, zoom state will not be updated.', zoomState)
	},
}: IAnimatorProps) => {
	const [loadedFrames, setLoadedFrames] = useState([])
	const [activeOverlays, setActiveOverlays] = useState(['data', 'map'])
	const [overlayPanelOpen, setOverlayPanelOpen] = useState(false)
	const [currentFrame, setCurrentFrame] = useState(startFrame || frames.length - 1)
	const [loopMethod, setLoopMethod] = useState(LoopMethod.LeftToRight)
	const [playDirection, setPlayDirection] = useState<direction>(1)
	const [isPlaying, setIsPlaying] = useState(false)
	const [expanded, setExpanded] = useState(true)
	const intervalRef = useRef<number | null>(null)
	const transformRef = useRef(null)
	const [animatorRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }] = useDimensions(ratio, !expanded)

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
			}, interval)
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
		if (!startFrame && loadedFrames.length > 0) {
			// if no startFrame is set, default to the last frame
			setCurrentFrame(loadedFrames.length - 1)
		} else if (loadedFrames.length > 0) {
			// if startFrame is greater than the number of loaded frames, set it to 0
			setCurrentFrame(startFrame > loadedFrames.length - 1 ? loadedFrames.length - 1 : startFrame)
		}
	}, [loadedFrames, startFrame])

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

	const expandToggle = () => {
		setExpanded(!expanded)
	}

	const animatorWidth = useMemo(() => {
		if (width) return width
		if (!expanded && adjustedWidth) return adjustedWidth
		return '100%'
	}, [width, expanded, adjustedWidth])

	const animatorHeight = useMemo(() => {
		if (height) return height
		if (!expanded && adjustedHeight) return adjustedHeight
		return '100%'
	}, [height, expanded, adjustedHeight])

	const handleZoomChange = (e: any) => {
		setZoomState(e?.state)
	}
	const handlePanningChange = (e: any) => {
		setZoomState(e?.state)
	}

	return (
		<div ref={animatorRef} className={styles.animator}>
			<div className={styles.animatorWrapper} style={{ width: animatorWidth, height: animatorHeight }}>
				<TransformWrapper
					ref={transformRef}
					disablePadding
					centerOnInit
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
							{!hideZoomControls && !disableZoom && (
								<div className={styles.zoomControls}>
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
									<button onClick={() => zoomIn()}>
										<FontAwesomeIcon icon={faSearchPlus} />
									</button>
									<button onClick={() => zoomOut()}>
										<FontAwesomeIcon icon={faSearchMinus} />
									</button>
									<button onClick={() => resetTransform()}>
										<FontAwesomeIcon icon={faUndo} />
									</button>
									<button onClick={() => expandToggle()}>
										<FontAwesomeIcon icon={expanded ? faCompress : faExpand} />
									</button>
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
		</div>
	)
}
