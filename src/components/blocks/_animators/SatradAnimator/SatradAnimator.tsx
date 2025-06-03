'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { getSatradData } from '@/util/dataCalls/satrad/query-satrad'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SatradAnimatorSettings from '../../_animatorSettingPanels/SatradAnimatorSettings/SatradAnimatorSettings'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import styles from './SatradAnimator.module.scss'

interface SatradAnimatorProps {
	productInfo: ProductInfoProps
}

const SatradAnimator: React.FC<SatradAnimatorProps> = ({ productInfo }) => {
	const { satradProductId: productId, satradRegionId: regionId, satradSectorId: sectorId } = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const satradNumberOfFrames = useRootStore.use.satradNumberOfFrames()
	const satradFrameRate = useRootStore.use.satradFrameRate()
	const satradFrameStep = useRootStore.use.satradFrameStep()
	const [ratio, setRatio] = useState(1)
	const [satradData, setSatradData] = useState([])
	const [satradOverlays, setSatradOverlays] = useState<{ static: object; dynamic: object }>({ static: {}, dynamic: {} })

	const satradZoomState = useRootStore.use.satradZoomState()
	const setSatradZoomState = useRootStore.use.setSatradZoomState()

	useEffect(() => {
		async function getData() {
			const regionIdStr = Array.isArray(regionId) ? regionId[0] : regionId
			const scaleId = regionIdStr.split('-')[0] // regionId is a combo of scale and "map region", query only requires scale
			const data = await getSatradData(scaleId, sectorId, productId, satradNumberOfFrames, satradFrameStep)
			setRatio(data.imageInfo.width / data.imageInfo.height)
			setSatradData(data.frames)
			setSatradOverlays(data.overlays)
		}
		getData()
	}, [sectorId, productId, regionId, satradNumberOfFrames, satradFrameStep])

	return (
		<>
			<div className={styles.satradAnimatorContainer}>
				<div className={styles.satradAnimator}>
					<Animator
						frames={satradData}
						startFrame={satradData.length - 1}
						ratio={ratio}
						interval={1000 / satradFrameRate}
						overlays={satradOverlays}
						initialZoomState={satradZoomState}
						setZoomState={setSatradZoomState}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<SatradAnimatorSettings />
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
			<MobileIconNav topRight />
		</>
	)
}

export default SatradAnimator
