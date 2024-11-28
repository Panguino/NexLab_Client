'use client'
import useDimensions from '@/hooks/useDimensions'
import { faSearchMinus, faSearchPlus, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import styles from './Animator.module.scss'
import { AnimatorImageMachine } from './AnimatorImageMachine/AnimatorImageMachine'

interface IAnimator {
	frames: string[]
	ratio?: number
	maxHeight?: number
	maxWidth?: number
	hideControls?: boolean
	hideZoomControls?: boolean
	autoPlay?: boolean
	interval?: number
}

export const Animator = ({
	frames,
	ratio = 1,
	maxHeight,
	maxWidth,
	interval = 0.5,
	hideControls = false,
	autoPlay = false,
	hideZoomControls = false,
}: IAnimator) => {
	const [loadedFrames, setLoadedFrames] = useState([])
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const intervalRef = useRef<number | null>(null)
	const transformRef = useRef(null)
	const [animatorRef, { width, height, adjustedHeight, adjustedWidth }] = useDimensions(ratio)

	useEffect(() => {
		if (isPlaying) {
			intervalRef.current = window.setInterval(() => {
				setCurrentFrame((prevFrame) => (prevFrame + 1) % loadedFrames.length)
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
	}, [isPlaying, interval, loadedFrames.length])

	const play = () => setIsPlaying(true)
	const pause = () => setIsPlaying(false)
	const seek = (frameIndex: number) => {
		setCurrentFrame(frameIndex)
		if (isPlaying) {
			pause()
		}
	}

	useEffect(() => {
		if (loadedFrames.length > 0 && autoPlay) {
			setIsPlaying(true)
		}
	}, [autoPlay, loadedFrames])

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

	return (
		<div ref={animatorRef} className={styles.animator} style={{ maxHeight: maxHeight || '100%', maxWidth: maxWidth || '100%' }}>
			<TransformWrapper ref={transformRef} disablePadding centerOnInit doubleClick={{ disabled: true }} panning={{ velocityDisabled: true }}>
				{({ zoomIn, zoomOut, resetTransform }) => (
					<>
						<TransformComponent
							wrapperStyle={{
								width: width,
								height: height,
							}}
							contentStyle={{ width: adjustedWidth, height: adjustedHeight }}
						>
							<AnimatorImageMachine
								frames={frames}
								currentFrame={currentFrame}
								loadedFrames={loadedFrames}
								setLoadedFrames={setLoadedFrames}
							/>
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
							</div>
						)}
					</>
				)}
			</TransformWrapper>
			{!hideControls && (
				<div className={styles.controls}>
					<button onClick={play}>Play</button>
					<button onClick={pause}>Pause</button>
					<input type="range" min="0" max={loadedFrames.length - 1} value={currentFrame} onChange={(e) => seek(Number(e.target.value))} />
				</div>
			)}
		</div>
	)
}
