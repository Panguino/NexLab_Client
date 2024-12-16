'use client'

import { useRootStore } from '@/store/useRootStore'
import React from 'react'

interface NexradAnimatorProps {
	// Add any props you need for the component here
}

const NexradAnimator: React.FC<NexradAnimatorProps> = () => {
	const nexradSite = useRootStore.use.nexradSite()
	const nexradRegion = useRootStore.use.nexradRegion()
	const nexradProduct = useRootStore.use.nexradProduct()

	return (
		<div>
			<h2>Nexrad Animator</h2>
			<div>region: {nexradRegion}</div>
			<div>site: {nexradSite}</div>
			<div>product: {nexradProduct}</div>
		</div>
	)
}

export default NexradAnimator
