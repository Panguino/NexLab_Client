'use client'
import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { forwardRef, useEffect, useState } from 'react'
import styles from './AnimatorImageMachine.module.scss'

interface IAnimatorImageMachineProps {
	frames: string[]
	currentFrame: number
	loadedFrames?: any[]
	setLoadedFrames?: (frames: any[]) => void
	baseOpacity?: number
	zIndex?: number
}

export const AnimatorImageMachine = forwardRef<HTMLDivElement, IAnimatorImageMachineProps>(
	({ frames, currentFrame, loadedFrames: externalLoadedFrames, setLoadedFrames: externalSetLoadedFrames, baseOpacity = 1, zIndex = 30 }, ref) => {
		const [isLoading, setIsLoading] = useState(true)
		const [localLoadedFrames, setLocalLoadedFrames] = useState<number[]>([])

		const loadedFrames = externalLoadedFrames ?? localLoadedFrames
		const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

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

		// Helper function to calculate opacity
		const calculateOpacity = (index: number, currentFrame: number, loadedFrames: any[], baseOpacity: number): number => {
			// If the current frame is out of bounds, use the first frame (index 0)
			const activeFrame = currentFrame >= loadedFrames.length ? 0 : currentFrame

			// Return the base opacity if the index matches the active frame, otherwise 0
			return index === activeFrame ? baseOpacity : 0
		}

		return (
			<div ref={ref} className={styles.animatorImageMachine} style={{ zIndex: zIndex }}>
				{isLoading ? (
					<LoadingPanel size={0.35} hideText />
				) : (
					loadedFrames.length > 0 &&
					loadedFrames.map((frame, index) => (
						<img
							key={index}
							src={frame.src}
							style={{
								opacity: calculateOpacity(index, currentFrame, loadedFrames, baseOpacity),
							}}
						/>
					))
				)}
			</div>
		)
	},
)
