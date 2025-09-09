'use client'

import { useEffect, useRef, useState } from 'react'
import BasicPlaybackControls, { LoopMethod } from '../../BasicPlaybackControls/BasicPlaybackControls'
import Scrubber from '../../Scrubber/Scrubber'
import { useAnimator } from '../Animator'
import { RunSelector } from '../RunSelector/RunSelector'
import styles from './AnimatorControls.module.scss'

type direction = 1 | -1

const AnimatorControls = () => {
	const {
		frameValidTimes,
		setFrameValidTime,
		startFrame,
		interval,
		lastFrameDwellTime,
		lastFrameDwell,
		loadedFrames,
		autoPlay,
		runs,
		runsPerRow,
		activeRun,
		setActiveRun,
		settingsComponent,
		currentFrame,
		isPlaying,
		setIsPlaying,
		setCurrentFrame,
		frames,
		scrubberPlaceholderImageUrl,
		scrubberFrameLoadStates,
		frameLabels,
		displayAllLabels,
		onFrameUpdate,
	} = useAnimator()

	const [loopMethod, setLoopMethod] = useState(LoopMethod.LeftToRight)
	const [playDirection, setPlayDirection] = useState<direction>(1)
	const intervalRef = useRef<number | null>(null)

	useEffect(() => {
		// update valid time when current frame changes
		if (frameValidTimes && frameValidTimes.length > 0 && frameValidTimes[currentFrame] !== undefined) {
			setFrameValidTime(frameValidTimes[currentFrame])
		}
	}, [currentFrame, frameValidTimes, setFrameValidTime])

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
	}, [isPlaying, playDirection, interval, lastFrameDwellTime, lastFrameDwell, currentFrame, setCurrentFrame, loadedFrames.length])

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
	}, [autoPlay, loadedFrames, setIsPlaying])

	useEffect(() => {
		if (startFrame === undefined && loadedFrames.length > 0) {
			setCurrentFrame(loadedFrames.length - 1)
		} else if (loadedFrames.length > 0) {
			setCurrentFrame(startFrame > loadedFrames.length - 1 ? loadedFrames.length - 1 : startFrame)
		}
	}, [loadedFrames, startFrame, setCurrentFrame])

	useEffect(() => {
		if (onFrameUpdate) {
			onFrameUpdate(currentFrame)
		}
	}, [currentFrame, onFrameUpdate])

	return (
		<div className={styles.controlsContainer}>
			<div className={styles.controls}>
				{runs && <RunSelector run={activeRun} runs={runs} runsPerRow={runsPerRow} onSelect={setActiveRun} />}
				<Scrubber
					minValue={0}
					maxValue={loadedFrames.length - 1}
					value={currentFrame}
					onChange={seek}
					frames={frames}
					placeholderImageUrl={scrubberPlaceholderImageUrl}
					frameLoadStates={scrubberFrameLoadStates}
					frameLabels={frameLabels}
					displayAllLabels={displayAllLabels}
				/>
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
	)
}

export default AnimatorControls
