'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import { MDSummaryCard } from '@/components/elements/MDSummaryCard/MDSummaryCard'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getMesoscaleDiscussions } from '@/util/dataCalls/text/query-convective'
import { useEffect, useState } from 'react'
import styles from './MesoscaleDiscussionsPage.module.scss'

interface MesoscaleDiscussion {
	areas_affected: string
	concerning: string
	files: string[]
	graphic: string
	id: string
	not_active: boolean
	number: string
	time_begin: string
	time_end: string
	type: string
	watch_prob: string
}

export const MesoscaleDiscussionsPage = () => {
	const [discussions, setDiscussions] = useState<MesoscaleDiscussion[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchDiscussions = async () => {
			try {
				const data = await getMesoscaleDiscussions()
				if (data && Array.isArray(data)) {
					setDiscussions(data)
				}
			} catch (error) {
				console.error('Failed to fetch mesoscale discussions:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchDiscussions()
	}, [])

	return (
		<ScrollArea>
			<div className={styles.mesoscaleDiscussionsPage}>
				<div className={styles.header}>
					<h1>Mesoscale Discussions</h1>
					<p className={styles.description}>Convective and Precipitation Mesoscale Discussions issued by the Storm Prediction Center</p>
				</div>

				<div className={styles.contentSection}>
					{loading ? (
						<div className={styles.loading}>Loading mesoscale discussions...</div>
					) : discussions.length > 0 ? (
						<div className={styles.discussionsGrid}>
							{discussions.map((md) => (
								<MDSummaryCard
									key={md.id}
									type={md.type}
									number={md.number}
									notActive={md.not_active}
									timeBegin={md.time_begin}
									timeEnd={md.time_end}
									areasAffected={md.areas_affected}
									concerning={md.concerning}
									watchProb={md.watch_prob}
									graphic={md.graphic}
								/>
							))}
						</div>
					) : (
						<div className={styles.noData}>No mesoscale discussions available</div>
					)}
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
