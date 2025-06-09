'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getSatradData } from '@/util/dataCalls/satrad/query-satrad'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import SatradAnimatorSettings from '../../_animatorSettingPanels/SatradAnimatorSettings/SatradAnimatorSettings'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './SatradAnimator.module.scss'

interface SatradAnimatorProps {
	productInfo: ProductInfoProps
}

const SatradAnimator: React.FC<SatradAnimatorProps> = ({ productInfo }) => {
	const { isMobile } = useIsMobile()
	const { satradProductId: productId, satradRegionId: regionId, satradSectorId: sectorId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const satradNumberOfFrames = useRootStore.use.satradNumberOfFrames()
	const satradFrameRate = useRootStore.use.satradFrameRate()
	const satradFrameStep = useRootStore.use.satradFrameStep()
	const activeOverlays = useRootStore.use.activeOverlays()
	const setActiveOverlays = useRootStore.use.setActiveOverlays()
	const satradZoomState = useRootStore.use.satradZoomState()
	const setSatradZoomState = useRootStore.use.setSatradZoomState()
	const satradZoomFill = useRootStore.use.satradZoomFill()
	const setSatradZoomFill = useRootStore.use.setSatradZoomFill()
	const satradMapFullScreen = useRootStore.use.satradMapFullScreen()
	const setSatradMapFullScreen = useRootStore.use.setSatradMapFullScreen()
	const satradLastFrameDwell = useRootStore.use.satradLastFrameDwell()
	const satradLastFrameDwellTime = useRootStore.use.satradLastFrameDwellTime()
	const [ratio, setRatio] = useState(1)
	const [satradData, setSatradData] = useState([])
	const [satradOverlays, setSatradOverlays] = useState<{ static: object; dynamic: object }>({ static: {}, dynamic: {} })

	const getData = useCallback(async () => {
		console.log('SatradAnimator: Fetching data')
		const regionIdStr = Array.isArray(regionId) ? regionId[0] : regionId
		const scaleId = regionIdStr.split('-')[0] // regionId is a combo of scale and "map region", query only requires scale
		const data = await getSatradData(scaleId, sectorId, productId, satradNumberOfFrames, satradFrameStep)
		setRatio(data.imageInfo.width / data.imageInfo.height)
		setSatradData(data.frames)
		setSatradOverlays(data.overlays)
		console.log('SatradAnimator: data fetched')
	}, [sectorId, productId, regionId, satradNumberOfFrames, satradFrameStep])

	useEffect(() => {
		getData()
	}, [sectorId, productId, regionId, satradNumberOfFrames, satradFrameStep, getData])

	useEffect(() => {
		setSatradZoomFill(isMobile)
	}, [isMobile, setSatradZoomFill])

	return (
		<>
			<div className={styles.satradAnimatorContainer}>
				<div className={styles.satradAnimator}>
					<Animator
						frames={satradData}
						startFrame={satradData.length - 1}
						ratio={ratio}
						interval={1000 / satradFrameRate}
						overlays={satradOverlays}
						initialZoomState={satradZoomState}
						setZoomState={setSatradZoomState}
						activeOverlays={activeOverlays}
						setActiveOverlays={setActiveOverlays}
						lastFrameDwell={satradLastFrameDwell}
						lastFrameDwellTime={satradLastFrameDwellTime * 1000}
						zoomFill={satradZoomFill}
						setZoomFill={setSatradZoomFill}
						fullScreen={satradMapFullScreen}
						setFullScreen={setSatradMapFullScreen}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<SatradAnimatorSettings refreshData={getData} />
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

export default SatradAnimator
