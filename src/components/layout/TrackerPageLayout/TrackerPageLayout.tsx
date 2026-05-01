'use client'

import StormChaseTrackerMap from '@/components/layout/StormChaseTrackerMap/StormChaseTrackerMap'
import styles from './TrackerPageLayout.module.scss'

const TrackerPageLayout = () => {
	return (
		<div className={styles.TrackerPageLayout}>
			<div className={styles.mapPanel}>
				<StormChaseTrackerMap />
			</div>
		</div>
	)
}

export default TrackerPageLayout
