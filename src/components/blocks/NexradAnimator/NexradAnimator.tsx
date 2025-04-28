'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCalls/nexrad/query-nexrad'
import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import NexradAnimatorSettings from '../_animatorSettingPanels/NexradAnimatorSettings/NexradAnimatorSettings'
import ProductInfo, { ProductInfoProps } from '../ProductInfo/ProductInfo'
import styles from './NexradAnimator.module.scss'

interface NexradAnimatorProps {
	productInfo: ProductInfoProps
}

const NexradAnimator: React.FC<NexradAnimatorProps> = ({ productInfo }) => {
	const { nexradProductId: productId, nexradSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const [wrapperRef, { width: width, height: height }] = useDimensions(1)
	const [nexradData, setNexradData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getNexradData(siteId, productId, nexradNumberOfFrames)
			setNexradData(data)
		}
		getData()
	}, [siteId, productId, nexradNumberOfFrames])

	return (
		<div className={styles.nexradAnimatorContainer}>
			<div className={styles.nexradAnimator} ref={wrapperRef}>
				<div className={styles.animatorWrapper} style={{ width: width > height ? height : width, height: width > height ? height : width }}>
					<Animator
						frames={nexradData}
						interval={nexradFrameRate}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<NexradAnimatorSettings />
							</AnimatorSettings>
						}
					/>
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

export default NexradAnimator
