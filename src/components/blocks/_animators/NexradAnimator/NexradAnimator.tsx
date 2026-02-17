'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { useIsUserIdle } from '@/hooks/useIsUserIdle'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCalls/nexrad/query-nexrad'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import NexradAnimatorSettings from '../../_animatorSettingPanels/NexradAnimatorSettings/NexradAnimatorSettings'
import styles from './NexradAnimator.module.scss'

const NexradAnimator: React.FC = () => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const nexradRefreshInterval = useRootStore.use.nexradDataRefreshInterval()
	const userIdle = useIsUserIdle((nexradRefreshInterval / 2) * 60 * 1000) // user is idle after half the refresh interval
	const userIdleRef = useRef(false)
	const { nexradProductId: productId, nexradSiteId: siteId } = useParams()
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const nexradZoomState = useRootStore.use.nexradZoomState()
	const setNexradZoomState = useRootStore.use.setNexradZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const nexradMapFullScreen = useRootStore.use.nexradMapFullScreen()
	const setNexradMapFullScreen = useRootStore.use.setNexradMapFullScreen()
	const nexradLastFrameDwell = useRootStore.use.nexradLastFrameDwell()
	const nexradLastFrameDwellTime = useRootStore.use.nexradLastFrameDwellTime()
	const nexradFrameValidTime = useRootStore.use.nexradFrameValidTime()
	const setNexradFrameValidTime = useRootStore.use.setNexradFrameValidTime()
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const [nexradData, setNexradData] = useState([])
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	// Keep userIdleRef in sync with userIdle state
	useEffect(() => {
		userIdleRef.current = userIdle
	}, [userIdle])

	const getData = useCallback(async () => {
		const data = await getNexradData(siteId, productId, nexradNumberOfFrames)

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
		setNexradData(data.frames)
		setFrameValidTimes(data.validtimes)
	}, [siteId, productId, nexradNumberOfFrames, setNexradData])

	useEffect(() => {
		getData()
	}, [siteId, productId, nexradNumberOfFrames, getData])

	useEffect(() => {
		frameValidTimeRef.current = nexradFrameValidTime
	}, [nexradFrameValidTime])

	return (
		<>
			<div className={styles.nexradAnimatorContainer}>
				<div className={styles.nexradAnimator}>
					<Animator
						frames={nexradData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setNexradFrameValidTime}
						startFrame={startFrame}
						imageInfo={imageInfo}
						initialZoomState={nexradZoomState}
						setZoomState={setNexradZoomState}
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={nexradMapFullScreen}
						setFullScreen={setNexradMapFullScreen}
						interval={1000 / nexradFrameRate}
						lastFrameDwell={nexradLastFrameDwell}
						lastFrameDwellTime={nexradLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<NexradAnimatorSettings refreshData={getData} />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
		</>
	)
}

export default NexradAnimator
