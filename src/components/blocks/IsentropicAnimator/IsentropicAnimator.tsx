'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { getIsentropicData } from '@/util/dataCalls/analysis/query-isentropic'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../ProductInfo/ProductInfo'
import styles from './IsentropicAnimator.module.scss'

interface IsentropicAnimatorProps {
	productInfo: ProductInfoProps
}

const IsentropicAnimator: React.FC<IsentropicAnimatorProps> = ({ productInfo }) => {
	const { isentropicProductId: productId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const [wrapperRef, { width: width, height: height }] = useDimensions(8 / 6)
	const [IsentropicData, setIsentropicData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getIsentropicData(productId)
			setIsentropicData(data)
		}
		getData()
	}, [productId])

	return (
		<div className={styles.IsentropicAnimatorContainer}>
			<div className={styles.IsentropicAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: width > height ? height : width, height: width > height ? height : width }}>
					<Animator frames={IsentropicData} />
				</div>
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
