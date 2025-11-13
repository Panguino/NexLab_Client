'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './AnalysisHero.module.scss'

export const AnalysisHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.container}>
					<div className={styles.heroContent}>
						<h1>Weather Analysis</h1>
						<p>
							Diagnose the current state of the atmosphere with surface and upper-air maps, observed soundings, RAP mesoanalysis fields,
							and isentropic tools. Use these products together to understand synoptic and mesoscale patterns, moisture/thermal
							structure, and vertical motion before you forecast.
						</p>
						<div className={styles.heroActions}>
							<Button label="Back to Weather Data" link="/weather-data" target="_self" />
							<Button label="Keep It Free" link="/donate" target="_self" />
						</div>
					</div>
				</div>
				<div className={styles.heroImage}>
					<img src="/images/previews/analysis-overview.jpg" alt="Surface and upper-air analysis preview" />
				</div>
			</div>
		</section>
	)
}
