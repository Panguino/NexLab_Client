'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCalls/nexrad/query-nexrad'
import React, { useEffect, useState } from 'react'
import styles from './NexradAnimator.module.scss'

interface NexradAnimatorProps {
	// Add any props you need for the component here
	productId: string
	siteId: string
}

const NexradAnimator: React.FC<NexradAnimatorProps> = ({ productId, siteId }) => {
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
			console.log(data)
			setNexradData(data)
		}
		getData()
	}, [nexradSite, nexradProduct, nexradNumberOfFrames])

	return (
		<div className={styles.nexradAnimator} ref={wrapperRef}>
			<div className={styles.animatorWrapper} style={{ width: width > height ? height : width, height: width > height ? height : width }}>
				<Animator frames={nexradData} />
			</div>
		</div>
	)
}

export default NexradAnimator
