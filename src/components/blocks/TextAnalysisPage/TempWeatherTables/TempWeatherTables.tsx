'use client'

import { ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS } from '@/data/text/analysis/products'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './TempWeatherTables.module.scss'

export const TempWeatherTables = () => {
	const router = useRouter()
	const analysisBasePath = '/weather-data/text-hazards-outlooks/analysis'

	const handleProductClick = (productId: string) => {
		router.push(`${analysisBasePath}/text/${productId}/latest`)
	}

	return (
		<section className={styles.tempWeatherTables}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Temperature & Weather Tables</h1>
				</div>
				<div className={styles.splitContent}>
					<div className={styles.descriptionSection}>
						<p>
							Temperature and Weather Tables provide tabular summaries of current conditions and forecasts for cities across various
							regions. These products include high/low temperatures, precipitation chances, and general weather conditions, making them
							ideal for quick comparisons across multiple locations.
						</p>
					</div>
					<div className={styles.linksSection}>
						{Object.entries(ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS).map(([productId, product]) => (
							<div key={productId} className={styles.linkItem} onClick={() => handleProductClick(productId)}>
								<FontAwesomeIcon icon={faFileLines} className={styles.linkIcon} />
								<span className={styles.linkText}>{product.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
