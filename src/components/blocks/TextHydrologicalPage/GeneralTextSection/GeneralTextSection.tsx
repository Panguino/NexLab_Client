'use client'

import { HYDRO_TEXT_PRODUCTS } from '@/data/text/hydrological/products'
import styles from './GeneralTextSection.module.scss'

export const GeneralTextSection = () => {
	return (
		<section className={styles.generalTextSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>General Text Products</h1>
					<p className={styles.subtitle}>
						River Forecast Centers and Weather Forecast Offices issue a variety of hydrological text products including streamflow
						guidance, flash flood guidance, hydrometeorological discussions, and snow water equivalent reports. Use the sidebar to browse
						available products by category and location.
					</p>
				</div>
				<div className={styles.categories}>
					{Object.entries(HYDRO_TEXT_PRODUCTS).map(([id, product]) => (
						<div key={id} className={styles.categoryCard}>
							<h3>{product.label}</h3>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
