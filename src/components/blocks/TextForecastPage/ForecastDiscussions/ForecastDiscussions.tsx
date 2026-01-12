'use client'

import { FORECAST_TEXT_PRODUCTS } from '@/data/text/forecast/products'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './ForecastDiscussions.module.scss'

export const ForecastDiscussions = () => {
	const router = useRouter()
	const forecastBasePath = '/weather-data/text-hazards-outlooks/forecast'

	const handleProductClick = (productId: string) => {
		router.push(`${forecastBasePath}/text/${productId}/latest`)
	}

	return (
		<section className={styles.forecastDiscussions}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Forecast Discussions</h1>
				</div>
				<div className={styles.splitContent}>
					<div className={styles.descriptionSection}>
						<p>
							Weather Prediction Center (WPC) Forecast Discussions provide detailed narrative descriptions of current and expected
							weather patterns. These products cover short-range (Days 1-3), extended (Days 4-7), and long-range (Days 6-14) outlooks,
							offering insights into synoptic-scale features, precipitation patterns, and significant weather events across the United
							States and beyond.
						</p>
					</div>
					<div className={styles.linksSection}>
						{Object.entries(FORECAST_TEXT_PRODUCTS).map(([productId, product]) => (
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
