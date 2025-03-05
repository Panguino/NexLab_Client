'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { getSoundingData } from '@/util/dataCalls/analysis/query-soundings'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import styles from './SoundingAnimator.module.scss'

interface SoundingAnimatorProps {
	// Add any props you need for the component here
	productId: string
	siteId: string
	// productInfo: ProductInfoProps
}

const SoundingAnimator: React.FC<SoundingAnimatorProps> = ({ productId, siteId }) => {
	// add product info soon
	const [activeTab, setActiveTab] = useState(-1)
	const soundingSite = useRootStore.use.soundingSite()
	const setSoundingSite = useRootStore.use.setSoundingSite()
	const soundingProduct = useRootStore.use.soundingProduct()
	const setSoundingProduct = useRootStore.use.setSoundingProduct()
	const soundingNumberOfFrames = useRootStore.use.soundingNumberOfFrames()
	const [wrapperRef, { width: width, height: height }] = useDimensions(1)
	const [soundingData, setSoundingData] = useState([])

	useEffect(() => {
		if (siteId && productId) {
			setSoundingSite(siteId)
			setSoundingProduct(productId)
		}
	}, [productId, siteId, setSoundingSite, setSoundingProduct])

	useEffect(() => {
		async function getData() {
			const data = await getSoundingData(soundingSite, soundingProduct, soundingNumberOfFrames)
			setSoundingData(data)
		}
		getData()
	}, [soundingSite, soundingProduct, soundingNumberOfFrames])

	return (
		<div className={styles.soundingAnimatorContainer}>
			<div className={styles.soundingAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: width > height ? height : width, height: width > height ? height : width }}>
					<Animator frames={soundingData} />
				</div>
			</div>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
				<Tab label="Product Info" icon={<FontAwesomeIcon icon={faInfoCircle} />}>
					Product Info TODO
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
