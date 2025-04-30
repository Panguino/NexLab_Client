'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { getUpperAirData } from '@/util/dataCalls/analysis/query-upper-air'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './UpperAirAnimator.module.scss'

interface UpperAirAnimatorProps {
	productInfo: ProductInfoProps
}

const UpperAirAnimator: React.FC<UpperAirAnimatorProps> = ({ productInfo }) => {
	const { upperairLevelId: levelId, upperairProductId: productId, upperairSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const [wrapperRef, { adjustedHeight, adjustedWidth }] = useDimensions(8 / 6, true)
	const [upperAirData, setUpperAirData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getUpperAirData(siteId, levelId, productId)
			setUpperAirData(data)
		}
		getData()
	}, [siteId, levelId, productId])

	return (
		<div className={styles.upperAirAnimatorContainer}>
			<div className={styles.upperAirAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: adjustedWidth, height: adjustedHeight }}>
					<Animator frames={upperAirData} ratio={8 / 6} />
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

export default UpperAirAnimator
