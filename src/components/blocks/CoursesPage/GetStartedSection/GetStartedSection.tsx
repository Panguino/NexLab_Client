'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './GetStartedSection.module.scss'

export const GetStartedSection = () => {
	return (
		<section className={styles.getStarted}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h2>Ready to Get Started?</h2>
					<div className={styles.ctaGrid}>
						<div className={styles.ctaCard}>
							<h3>Browse Course Materials</h3>
							<p>Explore class notes, labs, and tutorials to get a feel for our curriculum and teaching approach.</p>
							<Button label="Browse Class Notes, Labs & Tutorials" link="/academics/classes-notes" target="_self" />
						</div>
						<div className={styles.ctaCard}>
							<h3>Explore Our Tools</h3>
							<p>Check out NEXLAB's weather analysis tools, models, satellite/radar data, and forecasting resources.</p>
							<Button label="Explore NEXLAB Tools" link="/tools" target="_self" />
						</div>
						<div className={styles.ctaCard}>
							<h3>Storm Chasing Program</h3>
							<p>Learn about our field studies program, registration details, and frequently asked questions.</p>
							<Button label="See Storm Chasing FAQs & Registration" link="/academics/storm-chasing" target="_self" />
						</div>
						<div className={styles.ctaCard}>
							<h3>Course Catalog</h3>
							<p>View the official COD catalog for detailed credit information, prerequisites, and course descriptions.</p>
							<Button label="View COD Catalog" link="/catalog" target="_self" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
