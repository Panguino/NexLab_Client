'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { useIsUserIdle } from '@/hooks/useIsUserIdle'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getIsentropicData } from '@/util/dataCalls/analysis/query-isentropic'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AnalysisAnimatorSettings from '../../_animatorSettingPanels/AnalysisAnimatorSettings/AnalysisAnimatorSettings'
import styles from './IsentropicAnimator.module.scss'

const IsentropicAnimator: React.FC = () => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const analysisRefreshInterval = useRootStore.use.analysisDataRefreshInterval()
	const userIdle = useIsUserIdle((analysisRefreshInterval / 2) * 60 * 1000) // user is idle after half the refresh interval
	const userIdleRef = useRef(false)
	const { isentropicProductId: productId } = useParams()
	const [isentropicData, setIsentropicData] = useState([])
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const setAnalysisFrameRate = useRootStore.use.setAnalysisFrameRate()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()
	const setAnalysisLastFrameDwellTime = useRootStore.use.setAnalysisLastFrameDwellTime()
	const isentropicFrameValidTime = useRootStore.use.isentropicFrameValidTime()
	const setIsentropicFrameValidTime = useRootStore.use.setIsentropicFrameValidTime()
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	// Keep userIdleRef in sync with userIdle state
	useEffect(() => {
		userIdleRef.current = userIdle
	}, [userIdle])

	const getData = useCallback(async () => {
		const data = await getIsentropicData(productId)

		// Determine current frame based on user idle state
		let currentFrameValidTime
		if (userIdleRef.current) {
			// If user is idle, always use the latest frame
			currentFrameValidTime = data.validtimes[data.validtimes.length - 1]
		} else {
			// If user is active, use their current frame if available, otherwise use latest
			currentFrameValidTime = frameValidTimeRef.current || data.validtimes[data.validtimes.length - 1]
		}

		const closestValidTimeIndex = findClosestValidTimeIndex(data.validtimes, currentFrameValidTime)
		setStartFrame(closestValidTimeIndex)
		setImageInfo(data.imageInfo)
		setIsentropicData(data.frames)
		setFrameValidTimes(data.validtimes)
	}, [productId, setIsentropicData, setStartFrame, setFrameValidTimes])

	useEffect(() => {
		getData()
	}, [productId, getData])

	useEffect(() => {
		frameValidTimeRef.current = isentropicFrameValidTime
	}, [isentropicFrameValidTime])

	return (
		<>
			<div className={styles.IsentropicAnimatorContainer}>
				<div className={styles.IsentropicAnimator}>
					<Animator
						frames={isentropicData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setIsentropicFrameValidTime}
						startFrame={startFrame}
						imageInfo={imageInfo}
						initialZoomState={analysisZoomState}
						setZoomState={setAnalysisZoomState}
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={analysisMapFullScreen}
						setFullScreen={setAnalysisMapFullScreen}
						playbackFps={analysisFrameRate}
						setPlaybackFps={setAnalysisFrameRate}
						interval={1000 / analysisFrameRate}
						lastFrameDwell={analysisLastFrameDwell}
						edgeDwellSeconds={analysisLastFrameDwellTime}
						setEdgeDwellSeconds={setAnalysisLastFrameDwellTime}
						lastFrameDwellTime={analysisLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<AnalysisAnimatorSettings refreshData={getData} />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
		</>
	)
}

export default IsentropicAnimator
