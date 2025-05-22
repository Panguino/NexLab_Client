'use client'
import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { useEffect, useState } from 'react'
import styles from './AnimatorImageMachine.module.scss'

interface IAnimatorImageMachineProps {
	frames: string[]
	currentFrame: number
	loadedFrames?: any[]
	setLoadedFrames?: (frames: any[]) => void
}

export const AnimatorImageMachine = ({
	frames,
	currentFrame,
	loadedFrames: externalLoadedFrames,
	setLoadedFrames: externalSetLoadedFrames,
}: IAnimatorImageMachineProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [localLoadedFrames, setLocalLoadedFrames] = useState<number[]>([])

	const loadedFrames = externalLoadedFrames ?? localLoadedFrames
	const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

	console.log(frames)

	useEffect(() => {
		if (frames && frames.length === 0) {
			setIsLoading(false)
			return
		}
		const loadImages = async () => {
			setIsLoading(true)
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
	}, [frames, setLoadedFrames])

	return (
		<div className={styles.animatorImageMachine}>
			{isLoading ? (
				<LoadingPanel size={0.35} hideText />
			) : (
				loadedFrames.length > 0 &&
				loadedFrames.map((frame, index) => (
					<img
						key={index}
						src={frame.src}
						style={{
							opacity: index === (currentFrame >= loadedFrames.length ? 0 : currentFrame) ? 1 : 0,
						}}
					/>
				))
			)}
		</div>
	)
}
