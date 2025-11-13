'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './StormChasingSection.module.scss'

export const StormChasingSection = () => {
	return (
		<section className={styles.stormChasing}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Field Studies: Storm Chasing</h2>
					<p>An immersive, education-first experience with 35+ years of history.</p>
				</div>

				<div className={styles.highlightCard}>
					<p className={styles.cardIntro}>
						Our storm chasing program offers an experience unlike any other. With over 35 years of experience, we aim to bring you
						directly to the phenomena we study. You'll prepare in the classroom, participate in daily forecast discussions, and apply your
						learning in the field under faculty guidance.
					</p>

					<div className={styles.cardGrid}>
						<div className={styles.cardSection}>
							<h3>Course Options</h3>
							<ul>
								<li>
									<strong>ESAS 1112 — Storm Chasing / Thunderstorm Lab (Intro):</strong> open to the general public for participants
									18+; no prerequisite.
								</li>
								<li>
									<strong>ESAS 2112 — Thunderstorm Lab (Advanced):</strong> for returning students; see prerequisites and instructor
									permission details.
								</li>
							</ul>
						</div>
						<div className={styles.cardSection}>
							<h3>Who It's For</h3>
							<p>
								<em>Students:</em> Gain invaluable insight that solidifies knowledge from coursework.
								<br />
								<em>Enthusiasts:</em> If you love weather, this is a powerful, memorable way to learn.
							</p>
						</div>
					</div>

					<p className={styles.note}>
						<strong>Note:</strong> Dates, fees, logistics, and eligibility are posted ahead of each season. Check the Storm Chasing info
						page for current details.
					</p>

					<div className={styles.buttonRow}>
						<Button label="Storm Chasing Details" link="/academics/storm-chasing" target="_self" />
						<Button label="Contact the Program" link="/contact" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
