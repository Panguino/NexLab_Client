'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import { WatchSummaryCard } from '@/components/elements/WatchSummaryCard/WatchSummaryCard'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getConvectiveWatches } from '@/util/dataCalls/text/query-convective'
import { useEffect, useState } from 'react'
import styles from './ConvectiveWatchesPage.module.scss'

interface ConvectiveWatch {
	number: string
	watch_type: string
	not_active: boolean
	time_begin: string
	time_end: string
	states: string[]
	attributes: {
		'MAX HAIL /INCHES/'?: string
		'MAX TOPS /X 100 FEET/'?: string
		'MAX WIND GUSTS SURFACE /KNOTS/'?: string
		'MEAN STORM MOTION VECTOR /DEGREES AND KNOTS/'?: string
		'PARTICULARLY DANGEROUS SITUATION'?: string
	}
	probabilities: {
		'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES'?: string
		'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES'?: string
		'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS'?: string
		'PROB OF 10 OR MORE SEVERE HAIL EVENTS'?: string
		'PROB OF 10 OR MORE SEVERE WIND EVENTS'?: string
		'PROB OF 2 OR MORE TORNADOES'?: string
		'PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS'?: string
	}
	graphic: string
}

export const ConvectiveWatchesPage = () => {
	const [watches, setWatches] = useState<ConvectiveWatch[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchWatches = async () => {
			try {
				const data = await getConvectiveWatches()
				if (data && Array.isArray(data)) {
					setWatches(data)
				}
			} catch (error) {
				console.error('Failed to fetch convective watches:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchWatches()
	}, [])

	return (
		<ScrollArea>
			<div className={styles.convectiveWatchesPage}>
				<div className={styles.header}>
					<h1>Severe Weather Watches</h1>
					<p className={styles.description}>Active and recent severe weather watches issued by the Storm Prediction Center</p>
				</div>

				<div className={styles.contentSection}>
					{loading ? (
						<div className={styles.loading}>Loading severe weather watches...</div>
					) : watches.length > 0 ? (
						<div className={styles.watchesGrid}>
							{watches.map((watch) => (
								<WatchSummaryCard
									key={watch.number}
									number={watch.number}
									watchType={watch.watch_type}
									notActive={watch.not_active}
									timeBegin={watch.time_begin}
									timeEnd={watch.time_end}
									states={watch.states}
									attributes={watch.attributes}
									probabilities={watch.probabilities}
									graphic={watch.graphic}
								/>
							))}
						</div>
					) : (
						<div className={styles.noData}>No severe weather watches available</div>
					)}
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
