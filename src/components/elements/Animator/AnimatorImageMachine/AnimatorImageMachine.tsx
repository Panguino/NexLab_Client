'use client'
import { forwardRef } from 'react'
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
