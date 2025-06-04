'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { getRapMesoData } from '@/util/dataCalls/analysis/query-rap-mesoanalysis'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './RAPMesoAnimator.module.scss'

interface RAPMesoAnimatorProps {
	productInfo: ProductInfoProps
}

const RAPMesoAnimator: React.FC<RAPMesoAnimatorProps> = ({ productInfo }) => {
	const { rapmesoProductId: productId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const [ratio, setRatio] = useState(1)
	const [RAPMesoData, setRAPMesoData] = useState([])
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()

	useEffect(() => {
		async function getData() {
			const data = await getRapMesoData(productId)
			setRatio(data.imageInfo.width / data.imageInfo.height)
			setRAPMesoData(data.frames)
		}
		getData()
	}, [productId])

	return (
		<>
			<div className={styles.RAPMesoAnimatorContainer}>
				<div className={styles.RAPMesoAnimator}>
					<Animator
						frames={RAPMesoData}
						startFrame={RAPMesoData.length - 1}
						ratio={ratio}
						initialZoomState={analysisZoomState}
						setZoomState={setAnalysisZoomState}
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
			<MobileIconNav topRight />
		</>
	)
}

export default RAPMesoAnimator
