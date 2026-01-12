'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import { ANALYSIS_TEXT_MRMS_QPE_PRODUCTS } from '@/data/text/analysis/products'
import styles from './MRMSSection.module.scss'

export const MRMSSection = () => {
	const analysisBasePath = '/weather-data/text-hazards-outlooks/analysis'

	// For now, use placeholders until endpoint is built
	const mrmsProducts = Object.entries(ANALYSIS_TEXT_MRMS_QPE_PRODUCTS)

	return (
		<section className={styles.mrmsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>MRMS Quantitative Precipitation Estimates</h1>
					<p className={styles.subtitle}>
						Multi-Radar Multi-Sensor (MRMS) QPE products provide high-resolution precipitation analysis by integrating data from multiple
						radar networks, rain gauges, and satellite observations. These products are essential for flash flood monitoring, hydrological
						forecasting, and precipitation climatology.
					</p>
				</div>
				<div className={styles.content}>
					{mrmsProducts.map(([productId, product]) => (
						<GraphicLink
							key={productId}
							imageUrl="/img/placeholder-mrms.png"
							label={`View ${product.label} QPE`}
							linkUrl={`${analysisBasePath}/MRMS/${productId}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
