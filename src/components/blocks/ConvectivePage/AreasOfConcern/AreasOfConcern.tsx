'use client'

import styles from './AreasOfConcern.module.scss'

export const AreasOfConcern = () => {
	return (
		<section className={styles.areasOfConcern}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Areas of Concern</h1>
					<p className={styles.subtitle}>
						SPC issues watches when severe weather is expected within the next several hours, and mesoscale discussions analyze evolving
						weather situations. These products provide advance notice of potential severe weather development and detailed meteorological
						analysis of current conditions.
					</p>
				</div>
				<div className={styles.content}>
					<div className={styles.graphicPlaceholder}>
						<p>Active Watches Map</p>
					</div>
					<div className={styles.graphicPlaceholder}>
						<p>Mesoscale Discussions</p>
					</div>
				</div>
			</div>
		</section>
	)
}
