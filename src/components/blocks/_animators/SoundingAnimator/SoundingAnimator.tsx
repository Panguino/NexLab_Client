'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsUserIdle } from '@/hooks/useIsUserIdle'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getSoundingData } from '@/util/dataCalls/analysis/query-soundings'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AnalysisAnimatorSettings from '../../_animatorSettingPanels/AnalysisAnimatorSettings/AnalysisAnimatorSettings'
import styles from './SoundingAnimator.module.scss'

const SoundingAnimator: React.FC = () => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const analysisRefreshInterval = useRootStore.use.analysisDataRefreshInterval()
	const userIdle = useIsUserIdle((analysisRefreshInterval / 2) * 60 * 1000) // user is idle after half the refresh interval
	const userIdleRef = useRef(false)
	const { soundingProductId: productId, soundingSiteId: siteId } = useParams()
	const [soundingData, setSoundingData] = useState([])
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()
	const soundingNumberOfFrames = useRootStore.use.soundingNumberOfFrames()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()
	const soundingFrameValidTime = useRootStore.use.soundingFrameValidTime()
	const setSoundingFrameValidTime = useRootStore.use.setSoundingFrameValidTime()
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const [frameTextFiles, setFrameTextFiles] = useState<string[]>([])
	const setSoundingTextURL = useRootStore.use.setSoundingTextURL()
	const closeSlideoutPanel = useRootStore.use.closeSlideoutPanel()

	// Keep userIdleRef in sync with userIdle state
	useEffect(() => {
		userIdleRef.current = userIdle
	}, [userIdle])

	const getData = useCallback(async () => {
		const data = await getSoundingData(siteId, productId, soundingNumberOfFrames)

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
		setSoundingData(data.frames)
		setFrameValidTimes(data.validtimes)

		// Store textfiles if available for sounding text functionality
		if (data.textfiles) {
			setFrameTextFiles(data.textfiles)
		}
	}, [siteId, productId, soundingNumberOfFrames, setSoundingData, setStartFrame, setFrameValidTimes])

	useEffect(() => {
		getData()
	}, [siteId, productId, soundingNumberOfFrames, getData])

	useEffect(() => {
		frameValidTimeRef.current = soundingFrameValidTime
	}, [soundingFrameValidTime])


	// Handle frame changes for sounding text
	const handleFrameTextChange = (frameIndex) => {
		if (frameTextFiles.length > 0) {
			const soundingTextURL = frameTextFiles[frameIndex]
			setSoundingTextURL(soundingTextURL)
			if (!soundingTextURL) {
				closeSlideoutPanel()
			}
		}
	}

	return (
		<>
			<div className={styles.soundingAnimatorContainer}>
				<div className={styles.soundingAnimator}>
					<Animator
						frames={soundingData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setSoundingFrameValidTime}
						startFrame={startFrame}
						onFrameUpdate={handleFrameTextChange}
						imageInfo={imageInfo}
						initialZoomState={analysisZoomState}
						setZoomState={setAnalysisZoomState}
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={analysisMapFullScreen}
						setFullScreen={setAnalysisMapFullScreen}
						interval={1000 / analysisFrameRate}
						lastFrameDwell={analysisLastFrameDwell}
						lastFrameDwellTime={analysisLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<AnalysisAnimatorSettings refreshData={getData} />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default SoundingAnimator
