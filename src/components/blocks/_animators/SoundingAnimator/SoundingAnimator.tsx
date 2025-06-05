'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { getSoundingData } from '@/util/dataCalls/analysis/query-soundings'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './SoundingAnimator.module.scss'

interface SoundingAnimatorProps {
	productInfo: ProductInfoProps
}

const SoundingAnimator: React.FC<SoundingAnimatorProps> = ({ productInfo }) => {
	const { soundingProductId: productId, soundingSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const soundingNumberOfFrames = useRootStore.use.soundingNumberOfFrames()
	const [ratio, setRatio] = useState(1)
	const [soundingData, setSoundingData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getSoundingData(siteId, productId, soundingNumberOfFrames)
			setRatio(data.imageInfo.width / data.imageInfo.height)
			setSoundingData(data.frames)
		}
		getData()
	}, [siteId, productId, soundingNumberOfFrames])

	return (
		<>
			<div className={styles.soundingAnimatorContainer}>
				<div className={styles.soundingAnimator}>
					<Animator frames={soundingData} startFrame={soundingData.length - 1} ratio={ratio} disableZoom />
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

export default SoundingAnimator
