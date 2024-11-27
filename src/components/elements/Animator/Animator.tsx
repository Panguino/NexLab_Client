'use client'
import { faSearchMinus, faSearchPlus, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import styles from './Animator.module.scss'
import { AnimatorImageMachine } from './AnimatorImageMachine/AnimatorImageMachine'

interface IAnimator {
	frames: string[]
	hideControls?: boolean
	hideZoomControls?: boolean
	autoPlay?: boolean
	interval?: number
}

export const Animator = ({ frames, interval = 0.5, hideControls = false, autoPlay = false, hideZoomControls = false }: IAnimator) => {
	const [loadedFrames, setLoadedFrames] = useState([])
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const intervalRef = useRef<number | null>(null)

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

	return (
		<div className={styles.animator}>
			<TransformWrapper disablePadding doubleClick={{ disabled: true }} panning={{ velocityDisabled: true }}>
				{({ zoomIn, zoomOut, resetTransform }) => (
					<>
						<TransformComponent>
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
