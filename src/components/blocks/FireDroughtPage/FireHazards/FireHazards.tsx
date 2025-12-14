'use client'

import { useRouter } from 'next/navigation'
import styles from './FireHazards.module.scss'

export const FireHazards = () => {
	const router = useRouter()
	const fireBasePath = '/weather-data/text-hazards-outlooks/spc-usdm-fire-weather-drought'

	const handleViewHazards = () => {
		router.push(`${fireBasePath}/hazards`)
	}

	return (
		<section className={styles.fireHazards}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Active Fire & Drought Hazards</h1>
				</div>
				<div className={styles.splitContent}>
					<div className={styles.descriptionSection}>
						<p>
							View current fire weather watches, red flag warnings, and drought-related hazards across the United States. The
							interactive hazards map displays active alerts issued by the National Weather Service, allowing you to explore affected
							areas and access detailed warning information.
						</p>
						<p>
							Use the map tool to identify regions under elevated fire risk conditions, track drought severity levels, and stay informed
							about conditions that may impact fire behavior and drought recovery.
						</p>
					</div>
					<div className={styles.actionSection}>
						<button className={styles.viewButton} onClick={handleViewHazards}>
							View Fire Hazards Map
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
