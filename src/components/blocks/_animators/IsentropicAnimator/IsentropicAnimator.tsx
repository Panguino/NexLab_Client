'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getIsentropicData } from '@/util/dataCalls/analysis/query-isentropic'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './IsentropicAnimator.module.scss'

interface IsentropicAnimatorProps {
	productInfo: ProductInfoProps
}

const IsentropicAnimator: React.FC<IsentropicAnimatorProps> = ({ productInfo }) => {
	const { isMobile } = useIsMobile()
	const { isentropicProductId: productId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const [IsentropicData, setIsentropicData] = useState([])
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const analysisZoomFill = useRootStore.use.nexradZoomFill()
	const setAnalysisZoomFill = useRootStore.use.setNexradZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()

	useEffect(() => {
		async function getData() {
			const data = await getIsentropicData(productId)
			setImageInfo(data.imageInfo)
			setIsentropicData(data.frames)
		}
		getData()
	}, [productId])

	useEffect(() => {
		setAnalysisZoomFill(isMobile)
	}, [isMobile, setAnalysisZoomFill])

	return (
		<>
			<div className={styles.IsentropicAnimatorContainer}>
				<div className={styles.IsentropicAnimator}>
					<Animator
						frames={IsentropicData}
						startFrame={IsentropicData.length - 1}
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

export default IsentropicAnimator
