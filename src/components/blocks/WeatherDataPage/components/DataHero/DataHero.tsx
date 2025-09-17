'use client'

import styles from './DataHero.module.scss'

export const DataHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.container}>
					<div className={styles.heroContent}>
						<h1>Weather Data</h1>
						<p>
							Professional-grade analysis, satellite & radar, dual-pol NEXRAD, model guidance, and text products — free and fast for
							students, forecasters, and enthusiasts.
						</p>
					</div>
				</div>
				<div className={styles.heroImage}>
					<img src="/images/previews/analysis-overview.jpg" alt="Weather data hero" />
				</div>
			</div>
		</section>
	)
}
