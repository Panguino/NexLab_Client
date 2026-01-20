'use client'

import { Button } from '@/components/elements/Button/Button'
import { getHydroLatestGraphics } from '@/util/dataCalls/text/query-hydrological'
import { useEffect, useState } from 'react'
import styles from './EROSection.module.scss'

interface LatestGraphicsResponse {
	error?: boolean
	files?: {
		eroday1?: string
		eroday2?: string
		eroday3?: string
		qpfday1?: string
		mrms1hr?: string
		ffg1hr?: string
	}
}

export const EROSection = () => {
	const hydroBasePath = '/weather-data/text-hazards-outlooks/nws-rfc-hydrological'
	const [latestGraphics, setLatestGraphics] = useState<LatestGraphicsResponse | null>(null)

	useEffect(() => {
		const fetchLatestGraphics = async () => {
			const data = await getHydroLatestGraphics()
			if (data) {
				setLatestGraphics(data as LatestGraphicsResponse)
			}
		}
		fetchLatestGraphics()
	}, [])

	const eroProducts = [
		{
			id: 'eroday1',
			label: 'Day 1',
			graphicKey: 'eroday1' as const,
		},
		{
			id: 'eroday2',
			label: 'Day 2',
			graphicKey: 'eroday2' as const,
		},
		{
			id: 'eroday3',
			label: 'Day 3',
			graphicKey: 'eroday3' as const,
		},
	]

	return (
		<section className={styles.eroSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Excessive Rainfall Outlook</h1>
					<p className={styles.subtitle}>
						The Excessive Rainfall Outlook (ERO) highlights areas where significant flash flooding is possible over the next 3 days. These
						forecasts from the Weather Prediction Center identify regions with elevated risk of rainfall exceeding flash flood guidance,
						helping emergency managers and the public prepare for potential flooding events.
					</p>
				</div>
				<div className={styles.content}>
					{eroProducts.map(({ id, label, graphicKey }) => {
						const graphicUrl = latestGraphics?.files?.[graphicKey] || ''

						return (
							<div key={id} className={styles.graphicItem}>
								<span className={styles.graphicLabel}>{label}</span>
								{graphicUrl ? (
									<img src={graphicUrl} alt={`ERO ${label}`} className={styles.graphicImage} />
								) : (
									<div className={styles.graphicPlaceholder}>Loading...</div>
								)}
							</div>
						)
					})}
				</div>
				<div className={styles.buttonWrapper}>
					<Button label="View Excessive Rainfall Outlook" link={`${hydroBasePath}/ero/latest`} target="_self" />
				</div>
			</div>
		</section>
	)
}
