'use client'
import { forwardRef, useEffect, useRef } from 'react'
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
	({ frames, currentFrame, baseOpacity = 1, zIndex = 30 }, ref) => {
		const renderCountRef = useRef(0)
		renderCountRef.current++

		console.log(`🎬 AnimatorImageMachine render #${renderCountRef.current} - currentFrame: ${currentFrame}, frames.length: ${frames.length}`)

		useEffect(() => {
			console.log(`🔄 AnimatorImageMachine useEffect - currentFrame changed to: ${currentFrame}`)
		}, [currentFrame])

		useEffect(() => {
			console.log(`📋 AnimatorImageMachine useEffect - frames array changed, length: ${frames.length}`)
		}, [frames])

		return (
			<div ref={ref} className={styles.animatorImageMachine} style={{ zIndex: zIndex }}>
				{frames.map((frameUrl, index) => (
					<AnimatorImageMachineImage
						key={`frame-${index}`}
						src={frameUrl}
						index={index}
						isCurrentFrame={index === currentFrame}
						baseOpacity={baseOpacity}
					/>
				))}
			</div>
		)
	},
)
