'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import { useRootStore } from '@/store/useRootStore'
import { getIsentropicData } from '@/util/dataCalls/analysis/query-isentropic'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './IsentropicAnimator.module.scss'

interface IsentropicAnimatorProps {
	productInfo: ProductInfoProps
}

const IsentropicAnimator: React.FC<IsentropicAnimatorProps> = ({ productInfo }) => {
	const { isentropicProductId: productId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const [ratio, setRatio] = useState(1)
	const [IsentropicData, setIsentropicData] = useState([])
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()

	useEffect(() => {
		async function getData() {
			const data = await getIsentropicData(productId)
			setRatio(data.imageInfo.width / data.imageInfo.height)
			setIsentropicData(data.frames)
		}
		getData()
	}, [productId])

	return (
		<div className={styles.IsentropicAnimatorContainer}>
			<div className={styles.IsentropicAnimator}>
				<Animator
					frames={IsentropicData}
					startFrame={IsentropicData.length - 1}
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
				<Tab label="Overlays" icon={<FontAwesomeIcon icon={faLayerGroup} />}>
					Overlays TODO
				</Tab>
				<Tab label="Download" icon={<FontAwesomeIcon icon={faDownload} />}>
					Download / Save Gif TODO
				</Tab>
			</Tabs>
		</div>
	)
}

export default IsentropicAnimator
