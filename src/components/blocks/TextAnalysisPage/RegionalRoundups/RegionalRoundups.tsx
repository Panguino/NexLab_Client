'use client'

import { ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS } from '@/data/text/analysis/products'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './RegionalRoundups.module.scss'

export const RegionalRoundups = () => {
	const router = useRouter()
	const analysisBasePath = '/weather-data/text-hazards-outlooks/analysis'

	const handleProductClick = (productId: string) => {
		router.push(`${analysisBasePath}/text/${productId}/latest`)
	}

	return (
		<section className={styles.regionalRoundups}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Regional Weather Roundups</h1>
				</div>
				<div className={styles.splitContent}>
					<div className={styles.descriptionSection}>
						<p>
							Regional Weather Roundups provide comprehensive weather summaries for international regions including Mexico, Latin
							America, and the Caribbean. These products offer current conditions, significant weather events, and extended forecasts
							for areas outside the continental United States.
						</p>
					</div>
					<div className={styles.linksSection}>
						{Object.entries(ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS).map(([productId, product]) => (
							<div key={productId} className={styles.linkItem} onClick={() => handleProductClick(productId)}>
								<FontAwesomeIcon icon={faFileLines} className={styles.linkIcon} />
								<span className={styles.linkText}>{product.label} Weather Roundup</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
