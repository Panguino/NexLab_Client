'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { getSoundingData } from '@/util/dataCalls/analysis/query-soundings'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../ProductInfo/ProductInfo'
import styles from './SoundingAnimator.module.scss'

interface SoundingAnimatorProps {
	productInfo: ProductInfoProps
}

const SoundingAnimator: React.FC<SoundingAnimatorProps> = ({ productInfo }) => {
	const { soundingProductId: productId, soundingSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const soundingNumberOfFrames = useRootStore.use.soundingNumberOfFrames()
	const [wrapperRef, { width: width, height: height }] = useDimensions(8 / 6)
	const [soundingData, setSoundingData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getSoundingData(siteId, productId, soundingNumberOfFrames)
			setSoundingData(data)
		}
		getData()
	}, [siteId, productId, soundingNumberOfFrames])

	return (
		<div className={styles.soundingAnimatorContainer}>
			<div className={styles.soundingAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: width > height ? height : width, height: width > height ? height : width }}>
					<Animator frames={soundingData} />
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

export default SoundingAnimator
