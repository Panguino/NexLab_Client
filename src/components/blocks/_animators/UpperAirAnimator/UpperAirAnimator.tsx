'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getUpperAirData } from '@/util/dataCalls/analysis/query-upper-air'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './UpperAirAnimator.module.scss'

interface UpperAirAnimatorProps {
	productInfo: ProductInfoProps
}

const UpperAirAnimator: React.FC<UpperAirAnimatorProps> = ({ productInfo }) => {
	const { isMobile } = useIsMobile()
	const { upperairLevelId: levelId, upperairProductId: productId, upperairSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const [upperAirData, setUpperAirData] = useState([])

	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const analysisZoomFill = useRootStore.use.analysisZoomFill()
	const setAnalysisZoomFill = useRootStore.use.setAnalysisZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()

	useEffect(() => {
		async function getData() {
			const data = await getUpperAirData(siteId, levelId, productId)
			setImageInfo(data.imageInfo)
			setUpperAirData(data.frames)
		}
		getData()
	}, [siteId, levelId, productId])

	useEffect(() => {
		setAnalysisZoomFill(isMobile)
	}, [isMobile, setAnalysisZoomFill])

	return (
		<>
			<div className={styles.upperAirAnimatorContainer}>
				<div className={styles.upperAirAnimator}>
					<Animator
						frames={upperAirData}
						startFrame={upperAirData.length - 1}
						imageInfo={imageInfo}
						initialZoomState={analysisZoomState}
						setZoomState={setAnalysisZoomState}
						zoomFill={analysisZoomFill}
						setZoomFill={setAnalysisZoomFill}
						fullScreen={analysisMapFullScreen}
						setFullScreen={setAnalysisMapFullScreen}
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

export default UpperAirAnimator
