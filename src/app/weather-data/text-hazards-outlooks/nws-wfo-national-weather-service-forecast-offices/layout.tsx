'use client'

import { WFOAnimator } from '@/components/elements/WFOAnimator/WFOAnimator'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './layout.module.scss'

export default function WFOLayout({ children }: { children: React.ReactNode }) {
	const params = useParams()
	const [selectedWFOId, setSelectedWFOId] = useState<string | null>(null)

	// Determine view mode based on params
	const isDetailView = params.WFOofficeId !== undefined
	const view = isDetailView ? 'detail' : 'overview'

	// Update selected WFO when route changes
	useEffect(() => {
		if (params.WFOofficeId) {
			setSelectedWFOId(params.WFOofficeId as string)
		} else {
			setSelectedWFOId(null)
		}
	}, [params.WFOofficeId])

	return (
		<div className={styles.wfoLayout}>
			<WFOAnimator selectedWFOId={selectedWFOId} view={view} onWFOSelect={setSelectedWFOId} />
			{/* Children can be used for overlays, sidebars, etc. */}
			{children}
		</div>
	)
}
