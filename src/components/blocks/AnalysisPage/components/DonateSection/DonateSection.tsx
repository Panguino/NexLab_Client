'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './DonateSection.module.scss'

export const DonateSection = () => {
	return (
		<section className={styles.donate}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Support Open Weather Tools</h2>
					<p>Your donation keeps analysis maps and education resources free for everyone.</p>
				</div>
				<div className={styles.panel}>
					<p>
						NexLab Weather is community-supported. Contributions fund hosting, development, and new features — helping students,
						forecasters, and weather fans access reliable tools at no cost.
					</p>
					<div className={styles.buttonRow}>
						<Button label="Donate Now" link="/donate" target="_self" />
						<Button label="See Sponsorships" link="/donate#sponsorships" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
