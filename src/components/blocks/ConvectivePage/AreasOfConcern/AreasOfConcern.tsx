'use client'

import { ConvectiveProductCard } from '@/components/elements/ConvectiveProductCard/ConvectiveProductCard'
import { getConvectiveWatches, getMesoscaleDiscussions } from '@/util/dataCalls/text/query-convective'
import { faCloudBolt, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import styles from './AreasOfConcern.module.scss'

interface ConvectiveWatch {
	number: string
	watch_type: string
	not_active: boolean
}

interface MesoscaleDiscussion {
	id: string
	type: string
	not_active: boolean
}

export const AreasOfConcern = () => {
	const [watchCount, setWatchCount] = useState<number | null>(null)
	const [mdCount, setMdCount] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const [watchData, mdData] = await Promise.all([getConvectiveWatches(), getMesoscaleDiscussions()])

				if (watchData && Array.isArray(watchData)) {
					const activeWatches = watchData.filter((watch: ConvectiveWatch) => !watch.not_active)
					setWatchCount(activeWatches.length)
				} else {
					setWatchCount(0)
				}

				if (mdData && Array.isArray(mdData)) {
					const activeMDs = mdData.filter((md: MesoscaleDiscussion) => !md.not_active)
					setMdCount(activeMDs.length)
				} else {
					setMdCount(0)
				}
			} catch (error) {
				console.error('Error fetching areas of concern data:', error)
				setWatchCount(0)
				setMdCount(0)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCounts()
	}, [])

	return (
		<section className={styles.areasOfConcern}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Areas of Concern</h1>
					<p className={styles.subtitle}>
						SPC issues watches when severe weather is expected within the next several hours, and mesoscale discussions analyze evolving
						weather situations. These products provide advance notice of potential severe weather development and detailed meteorological
						analysis of current conditions.
					</p>
				</div>
				<div className={styles.content}>
					<ConvectiveProductCard
						icon={faCloudBolt}
						title="Convective Watches"
						description="View recent convective watches"
						stat={`${watchCount} currently active`}
						isLoading={isLoading}
						linkUrl="/weather-data/text-hazards-outlooks/spc-convective-weather/watches"
					/>
					<ConvectiveProductCard
						icon={faCommentDots}
						title="Mesoscale Discussions"
						description="View recent mesoscale discussions"
						stat={`${mdCount} currently active`}
						isLoading={isLoading}
						linkUrl="/weather-data/text-hazards-outlooks/spc-convective-weather/mesoscale-discussions"
					/>
				</div>
			</div>
		</section>
	)
}
