'use client'

import { WFOAnimator } from '@/components/elements/WFOAnimator/WFOAnimator'
import { useParams } from 'next/navigation'
import styles from './layout.module.scss'

export default function WFOLayout({ children }: { children: React.ReactNode }) {
	const params = useParams()

	// Determine view mode and selected WFO directly from route params
	const isDetailView = params.WFOofficeId !== undefined
	const view = isDetailView ? 'detail' : 'overview'
	const selectedWFOId = params.WFOofficeId ? (params.WFOofficeId as string) : null

	return (
		<div className={styles.wfoLayout}>
			<WFOAnimator selectedWFOId={selectedWFOId} view={view} />
			{/* Children can be used for overlays, sidebars, etc. */}
			{children}
		</div>
	)
}
