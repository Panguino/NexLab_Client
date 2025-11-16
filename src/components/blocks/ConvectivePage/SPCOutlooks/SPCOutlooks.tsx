'use client'

import { getAllConvectiveOutlookGraphics } from '@/util/dataCalls/text/query-convective'
import { useEffect, useMemo, useState } from 'react'
import styles from './SPCOutlooks.module.scss'

interface OutlookData {
	img: {
		height: number | null
		width: number | null
	}
	outlooks: Array<Record<string, string>>
}

const OUTLOOK_LABELS = {
	day1: 'Day 1',
	day2: 'Day 2',
	day3: 'Day 3',
	day4: 'Day 4-8',
}

export const SPCOutlooks = () => {
	const [outlookData, setOutlookData] = useState<OutlookData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchOutlooks = async () => {
			try {
				const data = await getAllConvectiveOutlookGraphics()
				if (data) {
					setOutlookData(data)
				}
			} catch (error) {
				console.error('Failed to fetch outlook graphics:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchOutlooks()
	}, [])

	const displayOutlooks = useMemo(() => {
		if (!outlookData?.outlooks) return []
		return outlookData.outlooks.slice(0, 4)
	}, [outlookData])

	return (
		<section className={styles.spcOutlooks}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>SPC Convective Outlooks</h1>
					<p className={styles.subtitle}>
						The Storm Prediction Center issues convective outlooks for severe thunderstorm threats across the continental United States.
						Day 1, 2, and 3 outlooks provide categorical risk areas and specific hazard probabilities for tornadoes, hail, and damaging
						winds.
					</p>
				</div>
				<div className={styles.content}>
					{isLoading ? (
						<>
							{[1, 2, 3, 4].map((num) => (
								<div key={num} className={styles.graphicPlaceholder}>
									<p>Loading...</p>
								</div>
							))}
						</>
					) : (
						displayOutlooks.map((outlook) => {
							const dayKey = Object.keys(outlook)[0]
							const imageUrl = outlook[dayKey]
							const label = OUTLOOK_LABELS[dayKey as keyof typeof OUTLOOK_LABELS] || dayKey

							return (
								<div key={dayKey} className={styles.outlookCard}>
									<div className={styles.imageContainer}>
										<img src={imageUrl} alt={`${label} Outlook`} className={styles.outlookImage} />
									</div>
									<div className={styles.banner}>
										<span>View {label} Outlook</span>
									</div>
								</div>
							)
						})
					)}
				</div>
			</div>
		</section>
	)
}
