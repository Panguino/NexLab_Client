'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsUserIdle } from '@/hooks/useIsUserIdle'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getUpperAirData } from '@/util/dataCalls/analysis/query-upper-air'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AnalysisAnimatorSettings from '../../_animatorSettingPanels/AnalysisAnimatorSettings/AnalysisAnimatorSettings'
import styles from './UpperAirAnimator.module.scss'

const UpperAirAnimator: React.FC = () => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const analysisRefreshInterval = useRootStore.use.analysisDataRefreshInterval()
	const userIdle = useIsUserIdle((analysisRefreshInterval / 2) * 60 * 1000) // user is idle after half the refresh interval
	const userIdleRef = useRef(false)
	const { upperairLevelId: levelId, upperairProductId: productId, upperairSiteId: siteId } = useParams()
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const [upperAirData, setUpperAirData] = useState([])
	const [pdfs, setPdfs] = useState<string[]>([])

	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()
	const upperAirFrameValidTime = useRootStore.use.upperAirFrameValidTime()
	const setUpperAirFrameValidTime = useRootStore.use.setUpperAirFrameValidTime()
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	// Keep userIdleRef in sync with userIdle state
	useEffect(() => {
		userIdleRef.current = userIdle
	}, [userIdle])

	const getData = useCallback(async () => {
		const data = await getUpperAirData(siteId, levelId, productId)

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
		setUpperAirData(data.frames)
		setFrameValidTimes(data.validtimes)
		setPdfs(data.pdfs)
	}, [siteId, levelId, productId, setUpperAirData, setStartFrame, setFrameValidTimes])

	useEffect(() => {
		getData()
	}, [siteId, levelId, productId, getData])

	useEffect(() => {
		frameValidTimeRef.current = upperAirFrameValidTime
	}, [upperAirFrameValidTime])


	const handlePdfButtonClick = (pdfUrl: string) => {
		console.log('PDF button clicked for URL:', pdfUrl)
		window.open(pdfUrl, '_blank')
	}

	return (
		<>
			<div className={styles.upperAirAnimatorContainer}>
				<div className={styles.upperAirAnimator}>
					<Animator
						frames={upperAirData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setUpperAirFrameValidTime}
						startFrame={startFrame}
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
						pdfs={pdfs}
						pdfButtonClick={handlePdfButtonClick}
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

export default UpperAirAnimator
