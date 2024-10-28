'use client'
import { useEffect, useRef, useState } from 'react'

interface IAnimator {
	frames: string[]
	interval?: number // Time between frames in milliseconds
}

export const Animator = ({ frames, interval = 0.5 }: IAnimator) => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [loadedFrames, setLoadedFrames] = useState<string[]>([])
	const intervalRef = useRef<number | null>(null)

	useEffect(() => {
		// Preload images and filter out those that fail to load
		const loadImages = async () => {
			const validFrames: string[] = []
			for (const frame of frames) {
				try {
					await new Promise<void>((resolve, reject) => {
						const img = new Image()
						img.src = frame
						img.onload = () => resolve()
						img.onerror = () => reject()
					})
					validFrames.push(frame)
				} catch {
					console.warn(`Failed to load image: ${frame}`)
				}
			}
			setLoadedFrames(validFrames)
		}

		loadImages()
	}, [frames])

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

	return (
		<div>
			{loadedFrames.length > 0 && <img width="300px" height="300px" src={loadedFrames[currentFrame]} alt={`Frame ${currentFrame}`} />}
			<div>
				<button onClick={play}>Play</button>
				<button onClick={pause}>Pause</button>
				<input type="range" min="0" max={loadedFrames.length - 1} value={currentFrame} onChange={(e) => seek(Number(e.target.value))} />
			</div>
		</div>
	)
}
