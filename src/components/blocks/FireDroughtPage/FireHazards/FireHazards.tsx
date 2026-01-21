'use client'

import { ConvectiveProductCard } from '@/components/elements/ConvectiveProductCard/ConvectiveProductCard'
import { getFireHazardsCount } from '@/util/dataCalls/text/query-fire'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import styles from './FireHazards.module.scss'

export const FireHazards = () => {
	const fireBasePath = '/weather-data/text-hazards-outlooks/fire-drought'
	const [hazardCount, setHazardCount] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const count = await getFireHazardsCount()
				setHazardCount(count)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching fire hazards count:', error)
				setHazardCount(0)
				setIsLoading(false)
			}
		}

		fetchCount()
	}, [])

	return (
		<section className={styles.fireHazards}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Active Fire & Drought Hazards</h1>
				</div>
				<div className={styles.splitLayout}>
					<div className={styles.descriptionColumn}>
						<p className={styles.description}>
							View current fire weather watches, red flag warnings, and drought-related hazards across the United States. The
							interactive hazards map displays active alerts issued by the National Weather Service, allowing you to explore affected
							areas and access detailed warning information.
						</p>
					</div>
					<div className={styles.cardColumn}>
						<ConvectiveProductCard
							icon={faFire}
							title="Fire Hazards Map & Table"
							description="View current fire weather warnings"
							stat={`${hazardCount} currently active`}
							isLoading={isLoading}
							linkUrl={`${fireBasePath}/hazards`}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
