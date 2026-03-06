'use client'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './GeneralTextSection.module.scss'

export const GeneralTextSection = () => {
	return (
		<section className={styles.generalTextSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>General Text Products</h1>
					<p className={styles.subtitle}>
						River Forecast Centers and Weather Forecast Offices issue a variety of hydrological text products including streamflow
						guidance, flash flood guidance, hydrometeorological discussions, and snow water equivalent reports.
					</p>
					<p className={styles.sidebarCallout}>
						<FontAwesomeIcon icon={faArrowLeft} className={styles.calloutIcon} />
						Use the sidebar to browse available products by category and location.
					</p>
				</div>
			</div>
		</section>
	)
}
