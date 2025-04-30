'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { getSurfaceData } from '@/util/dataCalls/analysis/query-surface'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './SurfaceMapsAnimator.module.scss'

interface SurfaceMapsAnimatorProps {
	productInfo: ProductInfoProps
}

const SurfaceMapsAnimator: React.FC<SurfaceMapsAnimatorProps> = ({ productInfo }) => {
	const { surfaceProductId: productId, surfaceRegionId: regionId, surfaceSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const surfaceMapsNumberOfFrames = useRootStore.use.surfaceMapsNumberOfFrames()
	const [wrapperRef, { adjustedWidth, adjustedHeight }] = useDimensions(8 / 6, true)
	const [surfaceMapsData, setSurfaceMapsData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getSurfaceData(regionId, siteId, productId, surfaceMapsNumberOfFrames)
			setSurfaceMapsData(data)
		}
		getData()
	}, [productId, regionId, siteId, surfaceMapsNumberOfFrames])

	return (
		<div className={styles.surfaceMapsAnimatorContainer}>
			<div className={styles.surfaceMapsAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: adjustedWidth, height: adjustedHeight }}>
					<Animator frames={surfaceMapsData} ratio={8 / 6} />
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

export default SurfaceMapsAnimator
