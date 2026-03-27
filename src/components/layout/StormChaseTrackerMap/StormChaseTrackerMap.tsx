'use client'

import { TrackerData } from '@/types/tracker'
import { getTrackerData } from '@/util/dataCalls/stormChasing/query-tracker'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import styles from './StormChaseTrackerMap.module.scss'

const TrackerMap = dynamic(() => import('@/components/elements/TrackerMap/TrackerMap'), {
	ssr: false,
})

const StormChaseTrackerMap = () => {
	const [trackerData, setTrackerData] = useState<TrackerData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchTrackerData = async () => {
			try {
				const data = await getTrackerData()
				setTrackerData(data)
			} catch (err) {
				console.error('Failed to fetch tracker data:', err)
				setError('Unable to load tracker data.')
			} finally {
				setLoading(false)
			}
		}

		fetchTrackerData()
	}, [])

	if (loading) {
		return <div className={styles.StormChaseTrackerMap}>Loading tracker...</div>
	}

	if (error || !trackerData) {
		return <div className={styles.StormChaseTrackerMap}>{error || 'No tracker data available.'}</div>
	}

	return (
		<div className={styles.StormChaseTrackerMap}>
			<TrackerMap data={trackerData} />
		</div>
	)
}

export default StormChaseTrackerMap
