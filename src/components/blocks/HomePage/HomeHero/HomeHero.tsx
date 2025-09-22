'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './HomeHero.module.scss'

export const HomeHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.container}>
					<div className={styles.heroContent}>
						<h1>NexLab Weather at College of DuPage</h1>
						<p>
							Free, research-grade weather data and hands-on meteorology education — built by educators, powered by community support,
							and trusted by students, forecasters, and weather enthusiasts worldwide.
						</p>
						<div className={styles.heroActions}>
							<Button label="Explore Weather Data" link="/weather-data" target="_self" />
							<Button label="Explore Academics" link="/academics" target="_self" />
						</div>
					</div>
				</div>
				<div className={styles.heroImage}>
					<img
						src="https://s3.amazonaws.com/screenshotsandvideos/ShareX/2025/07/opera_2025-07-30_13-08-01.png"
						alt="Homepage hero illustration"
					/>
				</div>
			</div>
		</section>
	)
}
