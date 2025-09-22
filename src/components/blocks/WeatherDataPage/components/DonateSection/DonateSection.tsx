'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './DonateSection.module.scss'

export const DonateSection = () => {
	return (
		<section className={styles.donate}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Help Keep Data Free</h2>
					<p>Your donation powers hosting, development, and new features for the community.</p>
				</div>
				<div className={styles.panel}>
					<p>
						NexLab Weather runs on community support. Contributions sustain our infrastructure and ensure students and weather lovers
						everywhere have free access to high-quality tools.
					</p>
					<div className={styles.buttonRow}>
						<Button label="Donate Now" link="/donate" target="_self" />
						<Button label="Sponsorships" link="/donate#sponsorships" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
