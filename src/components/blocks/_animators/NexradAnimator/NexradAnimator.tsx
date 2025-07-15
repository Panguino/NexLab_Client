'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCalls/nexrad/query-nexrad'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import NexradAnimatorSettings from '../../_animatorSettingPanels/NexradAnimatorSettings/NexradAnimatorSettings'
import styles from './NexradAnimator.module.scss'

interface NexradAnimatorProps {
	productInfo: ProductInfoProps
}

const NexradAnimator: React.FC<NexradAnimatorProps> = ({ productInfo }) => {
	const { isMobile } = useIsMobile()
	const { nexradProductId: productId, nexradSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const nexradZoomState = useRootStore.use.nexradZoomState()
	const setNexradZoomState = useRootStore.use.setNexradZoomState()
	const nexradZoomFill = useRootStore.use.nexradZoomFill()
	const setNexradZoomFill = useRootStore.use.setNexradZoomFill()
	const nexradMapFullScreen = useRootStore.use.nexradMapFullScreen()
	const setNexradMapFullScreen = useRootStore.use.setNexradMapFullScreen()
	const nexradLastFrameDwell = useRootStore.use.nexradLastFrameDwell()
	const nexradLastFrameDwellTime = useRootStore.use.nexradLastFrameDwellTime()
	const frameValidTime = useRootStore.use.frameValidTime()
	const setFrameValidTime = useRootStore.use.setFrameValidTime()
	const [ratio, setRatio] = useState(1)
	const [nexradData, setNexradData] = useState([])
	const [startFrame, setStartFrame] = useState(0)
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	const getData = useCallback(async () => {
		console.log('NexradAnimator: Fetching data')
		const data = await getNexradData(siteId, productId, nexradNumberOfFrames)
		const currentFrameValidTime = frameValidTimeRef.current || data.validtimes[data.validtimes.length - 1]
		const closestValidTimeIndex = findClosestValidTimeIndex(data.validtimes, currentFrameValidTime)
		setStartFrame(closestValidTimeIndex)
		setRatio(data.imageInfo.width / data.imageInfo.height)
		setNexradData(data.frames)
		setFrameValidTimes(data.validtimes)
		console.log('NexradAnimator: data fetched')
	}, [siteId, productId, nexradNumberOfFrames, setRatio, setNexradData])

	useEffect(() => {
		getData()
	}, [siteId, productId, nexradNumberOfFrames, getData])

	useEffect(() => {
		frameValidTimeRef.current = frameValidTime
	}, [frameValidTime])

	useEffect(() => {
		setNexradZoomFill(isMobile)
	}, [isMobile, setNexradZoomFill])

	return (
		<>
			<div className={styles.nexradAnimatorContainer}>
				<div className={styles.nexradAnimator}>
					<Animator
						frames={nexradData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setFrameValidTime}
						startFrame={startFrame}
						ratio={ratio}
						initialZoomState={nexradZoomState}
						setZoomState={setNexradZoomState}
						zoomFill={nexradZoomFill}
						setZoomFill={setNexradZoomFill}
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

export default NexradAnimator
