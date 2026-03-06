'use client'

import { CONVECTIVE_CATEGORIES, CONVECTIVE_CATEGORY_STATS_AND_MESSAGES, CONVECTIVE_PRODUCTS } from '@/data/text/convective/products'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './StatsMessages.module.scss'

export const StatsMessages = () => {
	const router = useRouter()
	const statsProducts = CONVECTIVE_CATEGORIES[CONVECTIVE_CATEGORY_STATS_AND_MESSAGES].products
	const convectiveBasePath = '/weather-data/text-hazards-outlooks/spc-convective-weather'

	const handleProductClick = (linkUrl: string) => {
		router.push(`${convectiveBasePath}${linkUrl}`)
	}

	return (
		<section className={styles.statsMessages}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Stats and Messages</h1>
				</div>
				<div className={styles.splitContent}>
					<div className={styles.descriptionSection}>
						<p>
							Statistical summaries and administrative messages from the Storm Prediction Center provide historical context and
							operational updates. This includes tornado totals, severe weather statistics, and important announcements affecting SPC
							operations and products.
						</p>
					</div>
					<div className={styles.linksSection}>
						{statsProducts.map((productId) => {
							const product = CONVECTIVE_PRODUCTS[productId]
							return (
								<div key={productId} className={styles.linkItem} onClick={() => handleProductClick(product.linkUrl)}>
									<FontAwesomeIcon icon={faFileLines} className={styles.linkIcon} />
									<span className={styles.linkText}>{product.title}</span>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
