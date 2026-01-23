'use client'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import styles from './AnimatorImageMachine.module.scss'
import { AnimatorImageMachineImage } from './AnimatorImageMachineImage'

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
		const renderCountRef = useRef(0)
		renderCountRef.current++

		const [localLoadedFrames, setLocalLoadedFrames] = useState<any[]>([])
		const loadedFrames = externalLoadedFrames ?? localLoadedFrames
		const setLoadedFrames = externalSetLoadedFrames ?? setLocalLoadedFrames

		console.log(`🎬 AnimatorImageMachine render #${renderCountRef.current} - currentFrame: ${currentFrame}, frames.length: ${frames.length}`)

		// Track which frames have loaded
		const loadedFramesMapRef = useRef<Map<number, { src: string }>>(new Map())

		const handleFrameLoaded = useCallback(
			(index: number, src: string) => {
				loadedFramesMapRef.current.set(index, { src })

				// Build array from map
				const loadedArray: any[] = new Array(frames.length)
				loadedFramesMapRef.current.forEach((frame, idx) => {
					loadedArray[idx] = frame
				})

				console.log(`📊 Frame ${index} loaded, total loaded: ${loadedFramesMapRef.current.size}/${frames.length}`)
				setLoadedFrames(loadedArray)
			},
			[frames.length, setLoadedFrames],
		)

		// Reset loaded frames when frames array changes
		useEffect(() => {
			console.log('📋 AnimatorImageMachine frames changed, resetting loaded frames map')
			loadedFramesMapRef.current.clear()
			setLoadedFrames([]) // Reset parent's loadedFrames
		}, [frames, setLoadedFrames])

		return (
			<div ref={ref} className={styles.animatorImageMachine} style={{ zIndex: zIndex }}>
				{frames.map((frameUrl, index) => (
					<AnimatorImageMachineImage
						key={`frame-${index}`}
						src={frameUrl}
						index={index}
						isCurrentFrame={index === currentFrame}
						baseOpacity={baseOpacity}
						onLoaded={handleFrameLoaded}
					/>
				))}
			</div>
		)
	},
)
