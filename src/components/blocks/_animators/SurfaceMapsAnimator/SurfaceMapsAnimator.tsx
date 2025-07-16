'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsUserIdle } from '@/hooks/useIsUserIdle'
import { useRootStore } from '@/store/useRootStore'
import { getSurfaceData } from '@/util/dataCalls/analysis/query-surface'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AnalysisAnimatorSettings from '../../_animatorSettingPanels/AnalysisAnimatorSettings/AnalysisAnimatorSettings'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './SurfaceMapsAnimator.module.scss'

interface SurfaceMapsAnimatorProps {
	productInfo: ProductInfoProps
}

const SurfaceMapsAnimator: React.FC<SurfaceMapsAnimatorProps> = ({ productInfo }) => {
	const { isMobile } = useIsMobile()
	const analysisRefreshInterval = useRootStore.use.analysisDataRefreshInterval()
	const userIdle = useIsUserIdle((analysisRefreshInterval / 2) * 60 * 1000) // user is idle after half the refresh interval
	const userIdleRef = useRef(false)
	const { surfaceProductId: productId, surfaceRegionId: regionId, surfaceSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const surfaceMapsNumberOfFrames = useRootStore.use.surfaceMapsNumberOfFrames()
	const [ratio, setRatio] = useState(1)
	const [surfaceMapsData, setSurfaceMapsData] = useState([])
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const analysisZoomFill = useRootStore.use.analysisZoomFill()
	const setAnalysisZoomFill = useRootStore.use.setAnalysisZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()
	const surfaceFrameValidTime = useRootStore.use.surfaceFrameValidTime()
	const setSurfaceFrameValidTime = useRootStore.use.setSurfaceFrameValidTime()
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	// Keep userIdleRef in sync with userIdle state
	useEffect(() => {
		userIdleRef.current = userIdle
	}, [userIdle])

	const getData = useCallback(async () => {
		const data = await getSurfaceData(regionId, siteId, productId, surfaceMapsNumberOfFrames)

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
		setRatio(data.imageInfo.width / data.imageInfo.height)
		setSurfaceMapsData(data.frames)
		setFrameValidTimes(data.validtimes)
	}, [productId, regionId, siteId, surfaceMapsNumberOfFrames, setRatio, setSurfaceMapsData, setStartFrame, setFrameValidTimes])

	useEffect(() => {
		getData()
	}, [productId, regionId, siteId, surfaceMapsNumberOfFrames, getData])

	useEffect(() => {
		frameValidTimeRef.current = surfaceFrameValidTime
	}, [surfaceFrameValidTime])

	useEffect(() => {
		setAnalysisZoomFill(isMobile)
	}, [isMobile, setAnalysisZoomFill])

	return (
		<>
			<div className={styles.surfaceMapsAnimatorContainer}>
				<div className={styles.surfaceMapsAnimator}>
					<Animator
						frames={surfaceMapsData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setSurfaceFrameValidTime}
						startFrame={startFrame}
						ratio={ratio}
						initialZoomState={analysisZoomState}
						setZoomState={setAnalysisZoomState}
						zoomFill={analysisZoomFill}
						setZoomFill={setAnalysisZoomFill}
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
				<Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
					<Tab label="Product Info" icon={<FontAwesomeIcon icon={faInfoCircle} />}>
						<ProductInfo {...productInfo} />
					</Tab>
					<Tab label="Alerts" icon={<FontAwesomeIcon icon={faWarning} />}>
						Alerts TODO
					</Tab>
					<Tab label="Download" icon={<FontAwesomeIcon icon={faDownload} />}>
						Download / Save Gif TODO
					</Tab>
				</Tabs>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default SurfaceMapsAnimator
