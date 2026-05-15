'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
		lastFrameDwell,
		playbackFps,
		setPlaybackFps,
		playbackFpsMin,
		playbackFpsMax,
		edgeDwellSeconds,
		setEdgeDwellSeconds,
		edgeDwellSecondsMin,
		edgeDwellSecondsMax,
		loadedFrames,
		autoPlay,
		hideControls,
		overlays,
		activeOverlays,
		setActiveOverlays,
		showFrames,
		setShowFrames,
		runs,
		runsPerRow,
		activeRun,
		setActiveRun,
		settingsComponent,
		hotkeyFeedback,
		setHotkeyFeedback,
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
	const feedbackTimeoutRef = useRef<number | null>(null)
	const pressedKeysRef = useRef<Set<string>>(new Set())
	const hiddenOverlayKeysRef = useRef<string[]>([])

	const showFeedback = useCallback(
		(message: string) => {
			setHotkeyFeedback(message)
		},
		[setHotkeyFeedback],
	)

	useEffect(() => {
		if (!hotkeyFeedback) {
			return undefined
		}

		if (feedbackTimeoutRef.current) {
			window.clearTimeout(feedbackTimeoutRef.current)
		}

		feedbackTimeoutRef.current = window.setTimeout(() => {
			setHotkeyFeedback(null)
		}, 1400)

		return () => {
			if (feedbackTimeoutRef.current) {
				window.clearTimeout(feedbackTimeoutRef.current)
				feedbackTimeoutRef.current = null
			}
		}
	}, [hotkeyFeedback, setHotkeyFeedback])

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
					return edgeDwellSeconds * 1000
				}
				return interval || 1000 / Math.max(playbackFps, 1)
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
	}, [isPlaying, playDirection, playbackFps, edgeDwellSeconds, interval, lastFrameDwell, currentFrame, setCurrentFrame, loadedFrames.length])

	const playPause = useCallback(() => {
		setIsPlaying((prev) => !prev)
	}, [setIsPlaying])

	const seek = useCallback(
		(frameIndex: number) => {
			setCurrentFrame(frameIndex)
			setIsPlaying(false)
		},
		[setCurrentFrame, setIsPlaying],
	)

	const stepForward = useCallback(() => {
		if (loadedFrames.length === 0) return
		seek((currentFrame + 1) % loadedFrames.length)
	}, [currentFrame, loadedFrames.length, seek])

	const stepBackward = useCallback(() => {
		if (loadedFrames.length === 0) return
		seek((currentFrame - 1 + loadedFrames.length) % loadedFrames.length)
	}, [currentFrame, loadedFrames.length, seek])

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

	useEffect(() => {
		if (hideControls) {
			return undefined
		}

		const hasOverlayControlsEnabled = Boolean(overlays)
		const overlayKeys = hasOverlayControlsEnabled ? [...Object.keys(overlays.static || {}), ...Object.keys(overlays.dynamic || {})] : []

		const handleAllOverlaysToggle = () => {
			if (!hasOverlayControlsEnabled || overlayKeys.length === 0) {
				return null
			}

			const safeActiveOverlays = Array.isArray(activeOverlays) ? activeOverlays : []
			const visibleOverlayKeys = safeActiveOverlays.filter((overlayKey) => overlayKeys.includes(overlayKey))
			const hasVisibleOverlays = visibleOverlayKeys.length > 0
			const persistentLayers = safeActiveOverlays.filter((overlayKey) => !overlayKeys.includes(overlayKey))
			if (hasVisibleOverlays) {
				hiddenOverlayKeysRef.current = visibleOverlayKeys
				setActiveOverlays(persistentLayers)
				return false
			}

			if (hiddenOverlayKeysRef.current.length === 0) {
				return null
			}

			const nextOverlays = [...persistentLayers, ...hiddenOverlayKeysRef.current]
			setActiveOverlays(nextOverlays)
			return true
		}

		const setDirectionFromKeys = () => {
			const keys = pressedKeysRef.current
			if (keys.has('Comma') && keys.has('Period')) {
				setLoopMethod(LoopMethod.Bounce)
				showFeedback('Direction: Bounce')
				return true
			}
			return false
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.repeat) {
				return
			}

			pressedKeysRef.current.add(event.code)
			if (setDirectionFromKeys()) {
				event.preventDefault()
				return
			}

			switch (event.code) {
				case 'Space':
					playPause()
					showFeedback(isPlaying ? 'Playback: Paused' : 'Playback: Playing')
					event.preventDefault()
					break
				case 'ArrowLeft':
					stepBackward()
					event.preventDefault()
					break
				case 'ArrowRight':
					stepForward()
					event.preventDefault()
					break
				case 'ArrowUp':
					setEdgeDwellSeconds(Math.min(edgeDwellSecondsMax, edgeDwellSeconds + 0.1))
					showFeedback(`Dwell: ${Math.min(edgeDwellSecondsMax, Math.round((edgeDwellSeconds + 0.1) * 10) / 10).toFixed(1)}s`)
					event.preventDefault()
					break
				case 'ArrowDown':
					setEdgeDwellSeconds(Math.max(edgeDwellSecondsMin, edgeDwellSeconds - 0.1))
					showFeedback(`Dwell: ${Math.max(edgeDwellSecondsMin, Math.round((edgeDwellSeconds - 0.1) * 10) / 10).toFixed(1)}s`)
					event.preventDefault()
					break
				case 'Comma':
					setLoopMethod(LoopMethod.RightToLeft)
					showFeedback('Direction: Right to Left')
					event.preventDefault()
					break
				case 'Period':
					setLoopMethod(LoopMethod.LeftToRight)
					showFeedback('Direction: Left to Right')
					event.preventDefault()
					break
				default:
					break
			}

			if (event.key === '+') {
				const nextPlaybackFps = Math.min(playbackFpsMax, playbackFps + 1)
				setPlaybackFps(nextPlaybackFps)
				showFeedback(`Speed: ${nextPlaybackFps} fps`)
				event.preventDefault()
				return
			}

			if (event.code === 'NumpadAdd') {
				const nextPlaybackFps = Math.min(playbackFpsMax, playbackFps + 1)
				setPlaybackFps(nextPlaybackFps)
				showFeedback(`Speed: ${nextPlaybackFps} fps`)
				event.preventDefault()
				return
			}

			if (event.key === '-' || event.key === '_') {
				const nextPlaybackFps = Math.max(playbackFpsMin, playbackFps - 1)
				setPlaybackFps(nextPlaybackFps)
				showFeedback(`Speed: ${nextPlaybackFps} fps`)
				event.preventDefault()
				return
			}

			if (event.code === 'NumpadSubtract') {
				const nextPlaybackFps = Math.max(playbackFpsMin, playbackFps - 1)
				setPlaybackFps(nextPlaybackFps)
				showFeedback(`Speed: ${nextPlaybackFps} fps`)
				event.preventDefault()
				return
			}

			if (event.key.toLowerCase() === 'h') {
				const overlaysVisible = handleAllOverlaysToggle()
				if (overlaysVisible !== null) {
					showFeedback(overlaysVisible ? 'Overlays: Shown' : 'Overlays: Hidden')
				}
				event.preventDefault()
				return
			}

			if (event.key.toLowerCase() === 'd') {
				if (hasOverlayControlsEnabled) {
					const nextShowFrames = !showFrames
					setShowFrames(nextShowFrames)
					showFeedback(nextShowFrames ? 'Data: Shown' : 'Data: Hidden')
				}
				event.preventDefault()
			}
		}

		const handleKeyUp = (event: KeyboardEvent) => {
			pressedKeysRef.current.delete(event.code)
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [
		hideControls,
		overlays,
		activeOverlays,
		setActiveOverlays,
		playPause,
		stepBackward,
		stepForward,
		isPlaying,
		setEdgeDwellSeconds,
		edgeDwellSeconds,
		edgeDwellSecondsMin,
		edgeDwellSecondsMax,
		setPlaybackFps,
		playbackFps,
		playbackFpsMin,
		playbackFpsMax,
		showFrames,
		setShowFrames,
		showFeedback,
	])

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
