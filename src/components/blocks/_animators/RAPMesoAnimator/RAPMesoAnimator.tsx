'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { getRapMesoData } from '@/util/dataCalls/analysis/query-rap-mesoanalysis'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
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
	const [wrapperRef, { adjustedHeight, adjustedWidth }] = useDimensions(ratio, true)
	const [RAPMesoData, setRAPMesoData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getRapMesoData(productId)
			setRatio(data.imageInfo.width / data.imageInfo.height)
			setRAPMesoData(data.frames)
		}
		getData()
	}, [productId])

	return (
		<div className={styles.RAPMesoAnimatorContainer}>
			<div className={styles.RAPMesoAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: adjustedWidth, height: adjustedHeight }}>
					<Animator frames={RAPMesoData} ratio={ratio} />
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

export default RAPMesoAnimator
