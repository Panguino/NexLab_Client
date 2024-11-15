'use client'
import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { useEffect, useRef, useState } from 'react'
import styles from './Animator.module.scss'

interface IAnimator {
	frames: string[]
	hideControls?: boolean
	autoPlay?: boolean
	interval?: number // Time between frames in milliseconds
}

export const Animator = ({ frames, interval = 0.5, hideControls = false, autoPlay = false }: IAnimator) => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [loadedFrames, setLoadedFrames] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const intervalRef = useRef<number | null>(null)

	useEffect(() => {
		const loadImages = async () => {
			const validFrames = []
			for (const frame of frames) {
				const cachedImage = localStorage.getItem(frame)
				if (cachedImage) {
					const img = new Image()
					img.src = cachedImage
					validFrames.push(img)
				} else {
					try {
						await new Promise<void>((resolve, reject) => {
							const img = new Image()
							img.src = frame
							img.onload = () => {
								validFrames.push(img)
								localStorage.setItem(frame, img.src)
								resolve()
							}
							img.onerror = () => reject()
						})
					} catch {
						console.warn(`Failed to load image: ${frame}`)
					}
				}
			}
			setLoadedFrames(validFrames)
			setIsLoading(false)
		}

		loadImages()
		return
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

	useEffect(() => {
		if (loadedFrames.length > 0 && autoPlay) {
			setIsPlaying(true)
		}
	}, [autoPlay, loadedFrames])

	return (
		<div className={styles.animator}>
			<div className={styles.imageContainer}>
				{isLoading ? (
					<LoadingPanel size={0.35} hideText />
				) : (
					loadedFrames.length > 0 &&
					loadedFrames.map((frame, index) => <img key={index} src={frame.src} style={{ opacity: index === currentFrame ? 1 : 0 }} />)
				)}
			</div>
			{!hideControls && (
				<div>
					<button onClick={play}>Play</button>
					<button onClick={pause}>Pause</button>
					<input type="range" min="0" max={loadedFrames.length - 1} value={currentFrame} onChange={(e) => seek(Number(e.target.value))} />
				</div>
			)}
		</div>
	)
}
