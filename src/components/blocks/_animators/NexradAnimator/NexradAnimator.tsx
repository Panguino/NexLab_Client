'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCalls/nexrad/query-nexrad'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import NexradAnimatorSettings from '../../_animatorSettingPanels/NexradAnimatorSettings/NexradAnimatorSettings'
import styles from './NexradAnimator.module.scss'

interface NexradAnimatorProps {
	productInfo: ProductInfoProps
}

const NexradAnimator: React.FC<NexradAnimatorProps> = ({ productInfo }) => {
	const { nexradProductId: productId, nexradSiteId: siteId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const [ratio, setRatio] = useState(1)
	const [nexradData, setNexradData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getNexradData(siteId, productId, nexradNumberOfFrames)
			setRatio(data.imageInfo.width / data.imageInfo.height)
			setNexradData(data.frames)
		}
		getData()
	}, [siteId, productId, nexradNumberOfFrames])

	return (
		<div className={styles.nexradAnimatorContainer}>
			<div className={styles.nexradAnimator}>
				<Animator
					frames={nexradData}
					startFrame={nexradData.length - 1}
					ratio={ratio}
					interval={1000 / nexradFrameRate}
					settingsComponent={
						<AnimatorSettings title="Settings">
							<NexradAnimatorSettings />
						</AnimatorSettings>
					}
				/>
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
	)
}

export default NexradAnimator
