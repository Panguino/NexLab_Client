'use client'

import { ConvectiveProductCard } from '@/components/elements/ConvectiveProductCard/ConvectiveProductCard'
import { getHydrologicalHazardsCount } from '@/util/dataCalls/text/query-hydrological'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import styles from './HazardsSection.module.scss'

export const HazardsSection = () => {
	const [hazardCount, setHazardCount] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const count = await getHydrologicalHazardsCount()
				setHazardCount(count)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching hydrological hazards count:', error)
				setHazardCount(0)
				setIsLoading(false)
			}
		}

		fetchCount()
	}, [])

	return (
		<section className={styles.hazardsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Active Hydrological Hazards</h1>
					<p className={styles.subtitle}>
						Real-time hydrological hazard alerts including flash flood warnings, flood watches, and coastal flood advisories. This map and
						table display current active alerts across the country, helping you stay informed about ongoing and imminent flooding events.
					</p>
				</div>
				<div className={styles.content}>
					<ConvectiveProductCard
						icon={faWater}
						title="Hydrological Hazards Map & Table"
						description="View current hydrological warnings"
						stat={`${hazardCount} currently active`}
						isLoading={isLoading}
						linkUrl="/weather-data/text-hazards-outlooks/nws-rfc-hydrological/hazards"
					/>
				</div>
			</div>
		</section>
	)
}
