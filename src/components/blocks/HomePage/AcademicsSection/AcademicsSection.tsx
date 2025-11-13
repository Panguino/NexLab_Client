'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './AcademicsSection.module.scss'

export const AcademicsSection = () => {
	return (
		<section className={styles.academics}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Academics at COD Meteorology</h2>
					<p>Concept-first courses, forecasting labs each week, and a proven transfer runway to four-year programs.</p>
				</div>
				<div className={styles.featureSplit}>
					<div className={styles.featureBody}>
						<p>
							Begin real meteorology from day one. Our two-year sequence covers severe weather, aviation meteorology, climate, and
							forecasting practice — using the same professional tools you’ll rely on in the field.
						</p>
						<ul className={styles.checklist}>
							<li>Hands-on labs with live data</li>
							<li>Qualitative foundations that ramp into quantitative skills</li>
							<li>Clear pathways to transfer and career readiness</li>
						</ul>
						<div className={styles.buttonRow}>
							<Button label="Explore Academics" link="/academics" target="_self" />
							<Button label="View Classes & Notes" link="/academics/courses" target="_self" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
