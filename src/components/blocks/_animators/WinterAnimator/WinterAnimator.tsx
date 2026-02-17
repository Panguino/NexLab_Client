'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getWinterData } from '@/util/dataCalls/text/query-winter'
import React, { useCallback, useEffect, useState } from 'react'
import WinterAnimatorSettings from '../../_animatorSettingPanels/WinterAnimatorSettings/WinterAnimatorSettings'
import styles from './WinterAnimator.module.scss'

interface WinterAnimatorProps {
	productId: string
}

const WinterAnimator: React.FC<WinterAnimatorProps> = ({ productId }) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const winterFrameRate = useRootStore.use.winterFrameRate()
	const winterZoomState = useRootStore.use.winterZoomState()
	const setWinterZoomState = useRootStore.use.setWinterZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const winterMapFullScreen = useRootStore.use.winterMapFullScreen()
	const setWinterMapFullScreen = useRootStore.use.setWinterMapFullScreen()
	const winterLastFrameDwell = useRootStore.use.winterLastFrameDwell()
	const winterLastFrameDwellTime = useRootStore.use.winterLastFrameDwellTime()

	const [imageInfo, setImageInfo] = useState({ width: 800, height: 500 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	const getData = useCallback(async () => {
		const data = await getWinterData(productId)

		if (data && !data.error && data.files) {
			setFrames(data.files)
			setFrameValidTimes(data.validtimes || [])
			// Start at the last frame (most recent)
			setStartFrame(data.files.length - 1)
			if (data.img) {
				setImageInfo(data.img)
			}
		}
	}, [productId])

	useEffect(() => {
		getData()
	}, [productId, getData])

	return (
		<>
			<div className={styles.winterAnimatorContainer}>
				<div className={styles.winterAnimator}>
					<Animator
						frames={frames}
						frameValidTimes={frameValidTimes}
						startFrame={startFrame}
						imageInfo={imageInfo}
						initialZoomState={winterZoomState}
						setZoomState={setWinterZoomState}
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={winterMapFullScreen}
						setFullScreen={setWinterMapFullScreen}
						interval={1000 / winterFrameRate}
						lastFrameDwell={winterLastFrameDwell}
						lastFrameDwellTime={winterLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<WinterAnimatorSettings />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
		</>
	)
}

export default WinterAnimator
