'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './DonateSection.module.scss'

export const DonateSection = () => {
	return (
		<section className={styles.donate}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Keep Weather Data Free</h2>
					<p>Your support powers open tools, reliable hosting, and ongoing innovation for millions of users.</p>
				</div>
				<div className={styles.panel}> 
					<p>
						NexLab Weather is community-supported. Donations sustain our infrastructure, compensate our small development team, and
						accelerate new features — while keeping data and tools freely available.
					</p>
					<div className={styles.buttonRow}>
						<Button label="Donate Now" link="/donate" target="_self" />
						<Button label="Become a Sponsor" link="/donate#sponsorships" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
