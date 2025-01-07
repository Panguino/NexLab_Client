'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCall'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import styles from './NexradAnimator.module.scss'

interface NexradAnimatorProps {
	// Add any props you need for the component here
	productId: string
	siteId: string
}

const NexradAnimator: React.FC<NexradAnimatorProps> = ({ productId, siteId }) => {
	const [activeTab, setActiveTab] = useState(0)
	const nexradSite = useRootStore.use.nexradSite()
	const setNexradSite = useRootStore.use.setNexradSite()
	const nexradProduct = useRootStore.use.nexradProduct()
	const setNexradProduct = useRootStore.use.setNexradProduct()
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const [wrapperRef, { width: width, height: height }] = useDimensions(1)
	const [nexradData, setNexradData] = useState([])

	useEffect(() => {
		if (siteId && productId) {
			setNexradSite(siteId)
			setNexradProduct(productId)
		}
	}, [productId, siteId, setNexradSite, setNexradProduct])

	useEffect(() => {
		async function getData() {
			const data = await getNexradData(nexradSite, nexradProduct, nexradNumberOfFrames)
			setNexradData(data)
		}
		getData()
	}, [nexradSite, nexradProduct, nexradNumberOfFrames])

	return (
		<div className={styles.nexradAnimatorContainer}>
			<div className={styles.nexradAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: width > height ? height : width, height: width > height ? height : width }}>
					<Animator frames={nexradData} />
				</div>
			</div>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
				<Tab label="Product Info" icon={<FontAwesomeIcon icon={faInfoCircle} />}>
					Info
				</Tab>
				<Tab label="Alerts" icon={<FontAwesomeIcon icon={faWarning} />}>
					Alerts
				</Tab>
				<Tab label="Overlays" icon={<FontAwesomeIcon icon={faLayerGroup} />}>
					Overlays
				</Tab>
				<Tab label="Download" icon={<FontAwesomeIcon icon={faDownload} />}>
					Download
				</Tab>
			</Tabs>
		</div>
	)
}

export default NexradAnimator
