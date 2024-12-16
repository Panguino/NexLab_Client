'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { useRootStore } from '@/store/useRootStore'
import { getNexradData } from '@/util/dataCall'
import React, { useEffect, useState } from 'react'
import styles from './NexradAnimator.module.scss'

interface NexradAnimatorProps {
	// Add any props you need for the component here
}

const NexradAnimator: React.FC<NexradAnimatorProps> = () => {
	const nexradSite = useRootStore.use.nexradSite()
	const nexradProduct = useRootStore.use.nexradProduct()
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()

	const [nexradData, setNexradData] = useState([])

	useEffect(() => {
		async function getData() {
			const data = await getNexradData(nexradSite, nexradProduct, nexradNumberOfFrames)
			console.log(data)
			setNexradData(data)
		}
		getData()
	}, [nexradSite, nexradProduct, nexradNumberOfFrames])

	return (
		<div className={styles.nexradAnimator}>
			<Animator frames={nexradData} />
		</div>
	)
}

export default NexradAnimator
