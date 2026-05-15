'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getFireAnalysisGraphics } from '@/util/dataCalls/text/query-fire'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FireDroughtAnimatorSettings from '../../_animatorSettingPanels/FireDroughtAnimatorSettings/FireDroughtAnimatorSettings'
import styles from './FireDroughtAnimator.module.scss'

interface FireDroughtAnimatorProps {
	productId: string
}

const FireDroughtAnimator: React.FC<FireDroughtAnimatorProps> = ({ productId }) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const fireAnalysisNumberOfFrames = useRootStore.use.fireAnalysisNumberOfFrames()
	const fireAnalysisFrameRate = useRootStore.use.fireAnalysisFrameRate()
	const setFireAnalysisFrameRate = useRootStore.use.setFireAnalysisFrameRate()
	const fireAnalysisZoomState = useRootStore.use.fireAnalysisZoomState()
	const setFireAnalysisZoomState = useRootStore.use.setFireAnalysisZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const fireAnalysisMapFullScreen = useRootStore.use.fireAnalysisMapFullScreen()
	const setFireAnalysisMapFullScreen = useRootStore.use.setFireAnalysisMapFullScreen()
	const fireAnalysisLastFrameDwell = useRootStore.use.fireAnalysisLastFrameDwell()
	const fireAnalysisLastFrameDwellTime = useRootStore.use.fireAnalysisLastFrameDwellTime()
	const setFireAnalysisLastFrameDwellTime = useRootStore.use.setFireAnalysisLastFrameDwellTime()
	const fireAnalysisFrameValidTime = useRootStore.use.fireAnalysisFrameValidTime()
	const setFireAnalysisFrameValidTime = useRootStore.use.setFireAnalysisFrameValidTime()

	const [imageInfo, setImageInfo] = useState({ width: 800, height: 500 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	const getData = useCallback(async () => {
		const data = await getFireAnalysisGraphics(productId, fireAnalysisNumberOfFrames)

		if (data && !data.err) {
			// Use current frame if available, otherwise use latest
			const currentFrameValidTime = frameValidTimeRef.current || data.validtimes[data.validtimes.length - 1]
			const closestValidTimeIndex = findClosestValidTimeIndex(data.validtimes, currentFrameValidTime)

			setStartFrame(closestValidTimeIndex)
			setImageInfo(data.img)
			setFrames(data.frames)
			setFrameValidTimes(data.validtimes)
		}
	}, [productId, fireAnalysisNumberOfFrames])

	useEffect(() => {
		getData()
	}, [productId, fireAnalysisNumberOfFrames, getData])

	useEffect(() => {
		frameValidTimeRef.current = fireAnalysisFrameValidTime
	}, [fireAnalysisFrameValidTime])

	return (
		<>
			<div className={styles.fireAnimatorContainer}>
				<div className={styles.fireAnimator}>
					<Animator
						frames={frames}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setFireAnalysisFrameValidTime}
						startFrame={startFrame}
						imageInfo={imageInfo}
						initialZoomState={fireAnalysisZoomState}
						setZoomState={setFireAnalysisZoomState}
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={fireAnalysisMapFullScreen}
						setFullScreen={setFireAnalysisMapFullScreen}
						playbackFps={fireAnalysisFrameRate}
						setPlaybackFps={setFireAnalysisFrameRate}
						interval={1000 / fireAnalysisFrameRate}
						lastFrameDwell={fireAnalysisLastFrameDwell}
						edgeDwellSeconds={fireAnalysisLastFrameDwellTime}
						setEdgeDwellSeconds={setFireAnalysisLastFrameDwellTime}
						lastFrameDwellTime={fireAnalysisLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<FireDroughtAnimatorSettings />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default FireDroughtAnimator
