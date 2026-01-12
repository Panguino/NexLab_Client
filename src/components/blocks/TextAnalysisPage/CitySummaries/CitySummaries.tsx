'use client'

import { ANALYSIS_TEXT_SEL_CITY_PRODUCTS } from '@/data/text/analysis/products'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './CitySummaries.module.scss'

export const CitySummaries = () => {
	const router = useRouter()
	const analysisBasePath = '/weather-data/text-hazards-outlooks/analysis'

	const handleProductClick = (productId: string) => {
		router.push(`${analysisBasePath}/text/${productId}/latest`)
	}

	return (
		<section className={styles.citySummaries}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Selected City Summaries</h1>
				</div>
				<div className={styles.splitContent}>
					<div className={styles.descriptionSection}>
						<p>
							Selected City Summaries provide current weather conditions and short-term forecasts for major cities across the United
							States. These text products are divided into four parts covering different regions, offering a quick overview of
							temperatures, sky conditions, and precipitation chances for the next few days.
						</p>
					</div>
					<div className={styles.linksSection}>
						{Object.entries(ANALYSIS_TEXT_SEL_CITY_PRODUCTS).map(([productId, product]) => (
							<div key={productId} className={styles.linkItem} onClick={() => handleProductClick(productId)}>
								<FontAwesomeIcon icon={faFileLines} className={styles.linkIcon} />
								<span className={styles.linkText}>City Summary {product.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
