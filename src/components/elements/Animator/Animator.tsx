'use client'
import { SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { zoomState } from '@/types/general'
import {
	faCompress,
	faDownLeftAndUpRightToCenter,
	faExpand,
	faLayerGroup,
	faSearchMinus,
	faSearchPlus,
	faUndo,
	faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import BasicPlaybackControls, { LoopMethod } from '../BasicPlaybackControls/BasicPlaybackControls'
import Scrubber from '../Scrubber/Scrubber'
import styles from './Animator.module.scss'
import { AnimatorImageMachine } from './AnimatorImageMachine/AnimatorImageMachine'
import { OverlayPanel } from './OverlayPanel/OverylayPanel'
import { RunSelector } from './RunSelector/RunSelector'

type direction = 1 | -1

interface IAnimatorProps {
	frames: string[]
	frameValidTimes?: number[]
	setFrameValidTime?: (validtime: number) => void
	startFrame?: number
	runs?: { value: string; label: string }[] | null
	activeRun?: string
	runsPerRow?: number
	overlays?: { static: object; dynamic: object }
	enableReadouts?: boolean
	frameReadoutData?: any
	isLoadingReadoutData?: boolean
	requestReadoutData?: (frameIndex: number) => void
	ratio?: number
	height?: number
	width?: number
	hideControls?: boolean
	hideZoomControls?: boolean
	autoPlay?: boolean
	disableZoom?: boolean
	interval?: number
	lastFrameDwell?: boolean
	lastFrameDwellTime?: number
	settingsComponent?: React.ReactNode | null
	initialZoomState?: zoomState
	setZoomState?: (zoomState: zoomState) => void
	activeOverlays?: string[]
	setActiveOverlays?: (overlays: string[]) => void
	setZoomFill?: (zoomFill: boolean) => void
	zoomFill?: boolean
	fullScreen?: boolean
	setFullScreen?: (fullScreen: boolean) => void
}

export const Animator = ({
	frames,
	frameValidTimes,
	startFrame,
	runs,
	activeRun,
	runsPerRow = 4,
	overlays,
	enableReadouts = true,
	frameReadoutData,
	isLoadingReadoutData,
	requestReadoutData,
	ratio = 1,
	interval = 200,
	lastFrameDwell = true,
	lastFrameDwellTime = 1000,
	hideControls = false,
	autoPlay = false,
	disableZoom = false,
	hideZoomControls = false,
	zoomFill = true,
	settingsComponent = null,
	initialZoomState = { scale: 1, positionX: 0, positionY: 0, previousScale: 1 },
	activeOverlays = ['data', 'map'],
	fullScreen = false,
	setFrameValidTime = (validtime: number) => {
		console.warn('setFrameValidTime function not provided, frame valid time will not be updated.', validtime)
	},
	setActiveOverlays = (overlays: string[]) => {
		console.warn('setActiveOverlays function not provided, active overlays will not be updated.', overlays)
	},
	setZoomState = (zoomState: zoomState) => {
		console.warn('setZoomState function not provided, zoom state will not be updated.', zoomState)
	},
	setZoomFill = (zoomFill: boolean) => {
		console.warn('setZoomFill function not provided, zoom fill will not be updated.', zoomFill)
	},
	setFullScreen = (fullScreen: boolean) => {
		console.warn('setFullScreen function not provided, full screen state will not be updated.', fullScreen)
	},
}: IAnimatorProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const closeMobileSidebarMenu = useRootStore.use.closeMobileSidebarMenu()
	const [loadedFrames, setLoadedFrames] = useState([])
	const [overlayPanelOpen, setOverlayPanelOpen] = useState(false)
	const [currentFrame, setCurrentFrame] = useState(startFrame !== undefined ? startFrame : frames.length - 1)
	const [loopMethod, setLoopMethod] = useState(LoopMethod.LeftToRight)
	const [playDirection, setPlayDirection] = useState<direction>(1)
	const [isPlaying, setIsPlaying] = useState(false)
	const intervalRef = useRef<number | null>(null)
	const transformRef = useRef(null)
	const ImageMachineRef = useRef(null)
	const [animatorRef, { width: _width, height: _height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(ratio, !zoomFill)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, position: 'bottom-right' })
	const [tooltipContent, setTooltipContent] = useState({})

	useLayoutEffect(() => {
		updateDimensions()
	}, [updateDimensions, loadedFrames])

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
			const calculateInterval = () => {
				if (lastFrameDwell && currentFrame === loadedFrames.length - 1) {
					return lastFrameDwellTime
				}
				return interval
			}

			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}

			intervalRef.current = window.setInterval(() => {
				setCurrentFrame((prevFrame) => {
					const nextFrame = (prevFrame + 1 * playDirection) % loadedFrames.length
					if (nextFrame < 0) {
						return loadedFrames.length - 1
					}
					return nextFrame
				})

				clearInterval(intervalRef.current)
				intervalRef.current = window.setInterval(() => {
					setCurrentFrame((prevFrame) => {
						const nextFrame = (prevFrame + 1 * playDirection) % loadedFrames.length
						if (nextFrame < 0) {
							return loadedFrames.length - 1
						}
						return nextFrame
					})
				}, calculateInterval())
			}, calculateInterval())
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [isPlaying, playDirection, interval, lastFrameDwellTime, lastFrameDwell, currentFrame, loadedFrames.length])

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
		if (startFrame === undefined && loadedFrames.length > 0) {
			setCurrentFrame(loadedFrames.length - 1)
		} else if (loadedFrames.length > 0) {
			setCurrentFrame(startFrame > loadedFrames.length - 1 ? loadedFrames.length - 1 : startFrame)
		}
	}, [loadedFrames, startFrame])

	useEffect(() => {
		// update valid time when current frame changes
		if (frameValidTimes && frameValidTimes.length > 0 && frameValidTimes[currentFrame] !== undefined) {
			setFrameValidTime(frameValidTimes[currentFrame])
		}
	}, [currentFrame, frameValidTimes, setFrameValidTime])

	useEffect(() => {
		const handleResize = () => {
			updateDimensions()
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [updateDimensions])

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
		setZoomFill(!zoomFill)
	}

	const fullScreenToggle = () => {
		setFullScreen(!fullScreen)
	}

	const handleZoomChange = (e: any) => {
		setZoomState(e?.state)
	}
	const handlePanningChange = (e: any) => {
		setZoomState(e?.state)
	}

	useEffect(() => {
		// Check conditions for requesting data
		if (enableReadouts && !isPlaying && requestReadoutData && currentFrame >= 0) {
			// Request readout data for the current frame
			requestReadoutData(currentFrame)
		}
	}, [currentFrame, enableReadouts, isPlaying, requestReadoutData])

	const calculateTooltipPosition = useCallback(() => {
		if (!animatorRef.current || !tooltipRef.current) return

		const containerRect = animatorRef.current.getBoundingClientRect()
		const tooltipRect = tooltipRef.current.getBoundingClientRect()
		const tooltipWidth = tooltipRect.width
		const tooltipHeight = tooltipRect.height

		// Calculate available space
		const spaceRight = containerRect.width - mousePosition.x
		const spaceBottom = containerRect.height - mousePosition.y

		// Determine position based on available space
		let position = 'bottom-right' // default

		if (spaceRight < tooltipWidth + 20) {
			position = spaceBottom < tooltipHeight + 20 ? 'top-left' : 'bottom-left'
		} else if (spaceBottom < tooltipHeight + 20) {
			position = 'top-right'
		}

		setTooltipPosition({
			x: mousePosition.x,
			y: mousePosition.y,
			position,
		})
	}, [mousePosition.x, mousePosition.y, animatorRef, tooltipRef])

	useEffect(() => {
		console.log('useEffect for updating tooltip content triggered')
		if (!animatorRef.current || !isHovering || isPlaying || !frameReadoutData?.dataTypes?.length) return

		const containerRect = animatorRef.current.getBoundingClientRect()
		const percentageX = mousePosition.x / containerRect.width
		const percentageY = mousePosition.y / containerRect.height

		try {
			console.log('frameReadoutData structure check:', {
				hasDataTypes: Boolean(frameReadoutData?.dataTypes),
				firstDataType: frameReadoutData?.dataTypes?.[0],
				sampleArrayCheck: Array.isArray(frameReadoutData?.[frameReadoutData?.dataTypes?.[0]]),
				sampleArrayLength: frameReadoutData?.[frameReadoutData?.dataTypes?.[0]]?.length,
			})
			const dataAtMousePosition = frameReadoutData.dataTypes.reduce((acc, dataType) => {
				const type2DArray = frameReadoutData[dataType]

				if (Array.isArray(type2DArray) && type2DArray.length > 0) {
					const typeYIndex = Math.min(Math.floor(percentageY * type2DArray.length), type2DArray.length - 1)

					if (Array.isArray(type2DArray[typeYIndex]) && type2DArray[typeYIndex].length > 0) {
						const typeXIndex = Math.min(Math.floor(percentageX * type2DArray[typeYIndex].length), type2DArray[typeYIndex].length - 1)
						acc[dataType] = type2DArray[typeYIndex][typeXIndex]
					}
				}

				return acc
			}, {})

			setTooltipContent(dataAtMousePosition)
			console.log('Tooltip content updated:', dataAtMousePosition, 'Has entries:', Object.keys(dataAtMousePosition).length > 0)
		} catch (error) {
			console.error('Error processing readout data:', error)
		}
	}, [frameReadoutData, mousePosition.x, mousePosition.y, isHovering, isPlaying, animatorRef])

	// Add mouse event handlers
	const handleMouseMove = (e) => {
		const rect = animatorRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		setMousePosition({ x, y })
		calculateTooltipPosition()
	}

	const handleMouseEnter = () => {
		setIsHovering(true)
	}

	const handleMouseLeave = () => {
		setIsHovering(false)
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

	//console.log('activeOverlays', activeOverlays)

	const handleRunChange = (newRun) => {
		const currentURL = pathname.split('/')
		currentURL[3] = newRun
		router.push(currentURL.join('/'))
	}

	return (
		<div
			className={styles.animator}
			onClick={() => {
				closeMobileSidebarMenu()
			}}
		>
			<div className={styles.animatorOuterImageContainer}>
				<div
					className={styles.animatorInnerImageContainer}
					ref={animatorRef}
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
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
								{/* Data Readout Tooltip */}
								{enableReadouts && isHovering && !isPlaying && (
									<div
										ref={tooltipRef}
										className={`${styles.dataTooltip} ${styles[tooltipPosition.position]}`}
										style={{
											left: `${tooltipPosition.x}px`,
											top: `${tooltipPosition.y}px`,
										}}
									>
										<div className={styles.tooltipContent}>
											<p>
												Frame: {currentFrame + 1}/{loadedFrames.length}
											</p>
											<p>
												Position: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
											</p>

											{/* Show loading indicator */}
											{isLoadingReadoutData && <p className={styles.loadingIndicator}>Loading data...</p>}

											{/* Show readout data if available */}
											{frameReadoutData && Object.keys(tooltipContent).length > 0 ? (
												<div className={styles.readoutData}>
													{Object.entries(tooltipContent).map(([key, value]) => (
														<p key={key}>
															<strong>{key}:</strong> {String(value)}
														</p>
													))}
												</div>
											) : (
												frameReadoutData && <p>No data available at this position</p>
											)}
										</div>
									</div>
								)}

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
											<FontAwesomeIcon icon={zoomFill ? faCompress : faExpand} />
										</button>
										<button onClick={() => fullScreenToggle()}>
											<FontAwesomeIcon icon={fullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
										</button>
									</div>
								)}
							</>
						)}
					</TransformWrapper>
				</div>
			</div>
			{!hideControls && (
				<div className={styles.controlsContainer}>
					<div className={styles.controls}>
						{runs && <RunSelector run={activeRun} runs={runs} runsPerRow={runsPerRow} onSelect={handleRunChange} />}
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
