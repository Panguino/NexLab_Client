'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import { FORECAST_TEXT_WPC_FRONT_PRODUCTS } from '@/data/text/forecast/products'
import styles from './WPCFrontsSection.module.scss'

export const WPCFrontsSection = () => {
	const forecastBasePath = '/weather-data/text-hazards-outlooks/forecast'

	const wpcFrontsProducts = Object.entries(FORECAST_TEXT_WPC_FRONT_PRODUCTS)

	return (
		<section className={styles.wpcFrontsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>WPC Surface Fronts Analysis</h1>
					<p className={styles.subtitle}>
						Weather Prediction Center surface fronts analysis products provide detailed depictions of frontal boundaries, pressure
						systems, and other synoptic-scale features. These products are essential for understanding current and forecast surface
						weather patterns across the United States.
					</p>
				</div>
				<div className={styles.content}>
					{wpcFrontsProducts.map(([productId, product]) => (
						<GraphicLink
							key={productId}
							imageUrl={product.latest}
							label={`View ${product.label} Fronts`}
							linkUrl={`${forecastBasePath}/wpcfronts/${productId}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
