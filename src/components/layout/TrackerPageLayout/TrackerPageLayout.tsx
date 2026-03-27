'use client'

import ChasingFeed from '@/components/layout/ChasingFeed/ChasingFeed'
import StormChaseTrackerMap from '@/components/layout/StormChaseTrackerMap/StormChaseTrackerMap'
import styles from './TrackerPageLayout.module.scss'

const TrackerPageLayout = () => {
	return (
		<div className={styles.TrackerPageLayout}>
			<div className={styles.mapPanel}>
				<StormChaseTrackerMap />
			</div>
			<div className={styles.feedPanel}>
				<ChasingFeed />
			</div>
		</div>
	)
}

export default TrackerPageLayout
