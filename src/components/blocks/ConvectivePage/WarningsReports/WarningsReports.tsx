'use client'

import styles from './WarningsReports.module.scss'

export const WarningsReports = () => {
	return (
		<section className={styles.warningsReports}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Warnings and Reports</h1>
					<p className={styles.subtitle}>
						Real-time severe weather warnings and local storm reports provide critical information about active severe weather events.
						This section displays current warnings across the country and documented reports of tornadoes, large hail, and damaging winds.
					</p>
				</div>
				<div className={styles.content}>
					<div className={styles.graphicPlaceholder}>
						<p>Active Warnings Map</p>
					</div>
					<div className={styles.graphicPlaceholder}>
						<p>Storm Reports Table</p>
					</div>
				</div>
			</div>
		</section>
	)
}
