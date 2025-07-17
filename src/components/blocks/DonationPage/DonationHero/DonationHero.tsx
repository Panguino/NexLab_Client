'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './DonationHero.module.scss'

export const DonationHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.heroContent}>
					<h1>Support the Future of Free Weather Data and Analysis</h1>
					<p>
						By contributing today, you keep vital datasets and forecasting tools freely available to millions of learners, educators, and
						storm chasers. Help us empower the next generation of meteorologists with open access to research-grade weather data.
					</p>
					<div className={styles.heroActions}>
						<Button label="Donate Now" link="/donate#tiers" target="_self" />
						<Button label="Become a Sponsor" link="/sponsors" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
