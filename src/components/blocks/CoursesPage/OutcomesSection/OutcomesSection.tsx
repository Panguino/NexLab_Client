'use client'

import styles from './OutcomesSection.module.scss'

export const OutcomesSection = () => {
	return (
		<section className={styles.outcomes}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h2>Our Goal</h2>
					<p>
						Students who complete our two-year sequence, alongside general education and calculus, are exceptionally well prepared to
						transfer as juniors. Our alumni consistently stand out for practical forecasting skill, lab experience, and fieldwork— giving
						them momentum through their 3rd and 4th years and beyond.
					</p>
				</div>
			</div>
		</section>
	)
}
