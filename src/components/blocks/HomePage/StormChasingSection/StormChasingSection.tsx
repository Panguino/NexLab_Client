'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './StormChasingSection.module.scss'

export const StormChasingSection = () => {
	return (
		<section className={styles.storm}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Field Studies: Storm Chasing</h2>
					<p>Since 1989 — immersive science in motion across the Great Plains.</p>
				</div>

				<div className={styles.card}> 
					<p>
						Experience severe weather up close while learning to analyze radar, satellite, soundings, and mesoscale environments in
						real time. Our academic storm-chasing program pairs classroom prep with multi-day fieldwork led by COD faculty.
					</p>
					<div className={styles.buttonRow}>
						<Button label="Storm Chasing Overview" link="/storm-chasing" target="_self" />
						<Button label="Trips & Registration" link="/storm-chasing/trips-and-registration" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
